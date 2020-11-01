---
template: "post"
title: Recursive Argo Page Crawlers
date: 2020-10-31
description: "How to recursively crawl a website in Argo"
tags: [update, argo, kubernetes]
comments: true
draft: false
project: Kubernetes
category: Kubernetes
---

Recently, I've been doing some work in kubernetes using [Argo Workflows.](https://argoproj.github.io/argo/) Argo is a hyper powerful tool for running complex jobs, and allows you to run easily parallelized and templated code. One great use case for Argo are for running jobs of unknown length to parallelize data uploads and transformations. Unfortunately very little documentation / examples exist in order to help you do that, so I figured I'd share that here in case there's anyone grepping around the internet like I was.

I'll break it down here in the components to build it up. The example I'll go through is paging through an API and doing some work with the data we get back.

## The building blocks

We have a few base components required to make this happen: the thing that gets data from an API (and the next page) and the thing to do some work on the data.

### Data getter

Let's assume we're going to be making calls to api X @ `test.X.com/api/block`, and the response will look something like this:

``` json
{
    "data": {...},
    "next": {
        "next_page": "https://test.X.com/api/block?page_token=example_token_123_abc"
    }
}
```

We'll assume we have a docker container (or maybe a python script) that can take a page to get data (input args as `--page _page_`) and outputs the data it got at `/tmp/result.json`. 

In Argo, we create a template that looks like this (assume you have the right env vars for whatever container you're running):

``` yaml
  - name: get-page-data
    inputs:
      parameters:
        - name: next_page
    container:
      image: example-image:latest
      command: ["python", "page_getter.py"]
      args:
        - --page
        - "{{inputs.parameters.next_page}}"
    outputs:
      artifacts:
      - name: output_data
        path: /tmp/result.json
```

### Data Processor

The data processor is a pretty simple container, all it does is take an input artifact and do something with that.

``` yaml
  - name: process-page-data
    inputs:
      artifacts:
      - name: input_data
        path: /tmp/input.json
    container:
      image: example-image:latest
      command: ["python", "data_processor.py"]
```


The processor gets some data from argo at the `/tmp/input.json` path


### Helper Functions (a dumb thing I wrote)

Something I found myself doing often in argo is getting some data from the output of a JSON object. At first I just had my containers write extra data to other paths to use as input parameters for other templates, but then I made a much repeatable way of doing this in Argo, without the need to make a container image.

``` yaml
  - name: json-getter
    inputs:
      parameters:
      - name: json_path
      artifacts:
      - name: data
        path: /tmp/input.json
    script:
      image: python:alpine3.6
      command: [python]
      source: |
        import json
        with open("/tmp/input.json", "r") as f:
          data = json.load(f)
          print(data{{inputs.parameters.json_path}})
```

This function, given a JSON path and some JSON data, will simply traverse the JSON object and output in the `[name].outputs.result`. I've used this template in a few workflows, and have found it very helpful! 

*note* a similar thing could be accomplished using `jq` in a small bash container, but my jq foo isn't too good

### The first steps

Let's build up a single flow of our workflow. We are going to 
1. Get data 
2. Get the next page
3. Do something with the data

So let's do that YAML in Argo:

``` yaml
  - name: page-dag
    inputs:
      parameters:
      - name: next_page
    dag:
      tasks:
      - name: get-next-page
        template: get-page-data
        arguments:
          parameters:
            - name: next_page
              value: "{{inputs.parameters.next_page}}"
      - name: consume-output-artifact
        template: process-page-data
        dependencies: [get-next-page]
        arguments:
          artifacts:
          - name: input_data
            from: "{{tasks.get-next-page.outputs.artifacts.output_data}}"
      - name: get-next-page-path
        template: json-getter
        dependencies: [get-next-page]
        arguments:
          parameters:
            - name: json_path
              value: '["next"]["next_page"]'
          artifacts:
          - name: data
            from: "{{tasks.get-next-page.outputs.artifacts.results}}"
```

If you're unfamiliar with Argo, we're going to be running this process in a dag (directed-acyclic-graph.) The tasks in this dag follow exactly what we set out to do: we get some data, and then simultaneously get the next page and do something with that data. The final step is, the recursive part...

### Recursion in Argo

At the end of our dag's task list, we need to get the data for the _next_ page and continue processing data and then get the _next_ page... and so on. But because we already have a task that does this, our dag! So we simply need to call it, by giving it the next page.


``` yaml
  - name: page-dag
    inputs:
      parameters:
      - name: next_page
    dag:
      tasks:
      - name: get-next-page
        template: get-page-data
        arguments:
          parameters:
            - name: next_page
              value: "{{inputs.parameters.next_page}}"
      - name: consume-output-artifact
        template: process-page-data
        dependencies: [get-next-page]
        arguments:
          artifacts:
          - name: input_data
            from: "{{tasks.get-next-page.outputs.artifacts.output_data}}"
      - name: get-next-page-path
        template: json-getter
        dependencies: [get-next-page]
        arguments:
          parameters:
            - name: json_path
              value: '["next"]["next_page"]'
          artifacts:
          - name: data
            from: "{{tasks.get-next-page.outputs.artifacts.results}}"
      - name: loop-it
        template: page-dag
        dependencies: [get-next-page-path]
        when: "\'{{tasks.get-next-page-path.outputs.results}}\' != end"
        arguments:
          parameters:
            - name: next_page
              value: "{{tasks.get-next-page-path.outputs.results}}"
```

You'll see that our recursive step's basecase is when the output result from our json-getter == "end", but basically you would just need to program for whenever you know your paging is over. 

And that's basically it! Now all we need to do is call it to kick it off! 

``` yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: solutions-intercom-loader-
spec:
  entrypoint: main
  templates:
  - name: main
    steps:
    - - name: begin-recursion
        template: page-dag
        arguments:
          parameters:
            - name: next_page
              value: "{{initial_page}}"
```

### The end

We now have a recursive page crawler that can run in argo, my recommendation though is not to check out the UI past a few dozen requests, it starts to lag because there are so many nodes. I recommend just using the argo commands to check the status, or create a dashboard with the metrics to know when the job is complete. Here's the full file if you want to use it as a starter:

### Full file

``` yaml
apiVersion: argoproj.io/v1alpha1
kind: Workflow
metadata:
  generateName: page-crawler-loader-
spec:
  entrypoint: main
  templates:
  - name: page-dag
    inputs:
      parameters:
      - name: next_page
    dag:
      tasks:
      - name: get-next-page
        template: get-page-data
        arguments:
          parameters:
            - name: next_page
              value: "{{inputs.parameters.next_page}}"
      - name: consume-output-artifact
        template: process-page-data
        dependencies: [get-next-page]
        arguments:
          artifacts:
          - name: input_data
            from: "{{tasks.get-next-page.outputs.artifacts.output_data}}"
      - name: get-next-page-path
        template: json-getter
        dependencies: [get-next-page]
        arguments:
          parameters:
            - name: json_path
              value: '["next"]["next_page"]'
          artifacts:
          - name: data
            from: "{{tasks.get-next-page.outputs.artifacts.results}}"
      - name: loop-it
        template: page-dag
        dependencies: [get-next-page-path]
        when: "\'{{tasks.get-next-page-path.outputs.results}}\' != end"
        arguments:
          parameters:
            - name: next_page
              value: "{{tasks.get-next-page-path.outputs.results}}"
  - name: json-getter
    inputs:
      parameters:
      - name: json_path
      artifacts:
      - name: data
        path: /tmp/input.json
    script:
      image: python:alpine3.6
      command: [python]
      source: |
        import json
        with open("/tmp/input.json", "r") as f:
          data = json.load(f)
          print(data{{inputs.parameters.json_path}})
  - name: get-page-data
    inputs:
      parameters:
        - name: next_page
    container:
      image: example-image:latest
      command: ["python", "page_getter.py"]
      args:
        - --page
        - "{{inputs.parameters.next_page}}"
    outputs:
      artifacts:
      - name: output_data
        path: /tmp/result.json
  - name: process-page-data
    inputs:
      artifacts:
      - name: input_data
        path: /tmp/input.json
    container:
      image: example-image:latest
      command: ["python", "data_processor.py"]
  - name: main
    steps:
    - - name: begin-recursion
        template: page-dag
        arguments:
          parameters:
            - name: next_page
              value: "{{initial_page}}"
```


### Questions?

Please reach out with questions @ jaronoff@drift.com
