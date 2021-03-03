---
template: "post"
title: Running Phoenix (elixir) Apps on Kubernetes
date: 2021-03-02
description: "A guide on how to get an elixir app up and running on Kubernetes."
tags: [update, kubernetes]
comments: true
draft: false
project: kubernetes
category: kubernetes
---

I'm currently working on a side project for a friend (on the hush hush right now), and I've had the pleasure of writing it in elixir using Phoenix. Having avoided touching react for a while, being able to write some pretty simple HTML on top of an elixir backend is a wonderful experience. Local development is simple, but how one goes about preparing and deploying their Phoenix app for Kubernetes is a whole other process. I'll walk you through what I did to get it done on GKE. 

*Assumption!* You have a working phoenix application running locally generated from the most `mix phx.new`

## Preparing your application 

The first thing you'll need to make is a Dockerfile to containerize your application. Below is a Dockerfile I hodge-podged from other online tutorials:

```
# ---- Build Stage ----
FROM hexpm/elixir:1.11.2-erlang-23.1.2-alpine-3.12.1 as build

# install build dependencies
RUN apk add --no-cache build-base npm git python3

# prepare build dir
WORKDIR /app

# install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# set build ENV
ENV MIX_ENV=prod

# install mix dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV
RUN mkdir config
# Dependencies sometimes use compile-time configuration. Copying
# these compile-time config files before we compile dependencies
# ensures that any relevant config changes will trigger the dependencies
# to be re-compiled.
COPY config/config.exs config/$MIX_ENV.exs config/
RUN mix deps.compile

# build assets
COPY assets/package.json assets/package-lock.json ./assets/
# install all npm dependencies from scratch
RUN npm --prefix ./assets ci --progress=false --no-audit --loglevel=error

# Copy migrations
COPY priv priv

# Note: if your project uses a tool like https://purgecss.com/,
# which customizes asset compilation based on what it finds in
# your Elixir templates, you will need to move the asset compilation step
# down so that `lib` is available.
COPY assets assets
# use webpack to compile npm dependencies - https://www.npmjs.com/package/webpack-deploy
RUN npm run --prefix ./assets deploy
RUN mix phx.digest

# compile and build the release
COPY lib lib
RUN mix compile
# changes to config/runtime.exs don't require recompiling the code
COPY config/runtime.exs config/
# uncomment COPY if rel/ exists
COPY rel rel
RUN mix release

# Start a new build stage so that the final image will only contain
# the compiled release and other runtime necessities
FROM alpine:3.12.1 AS app
RUN apk add --no-cache openssl ncurses-libs

WORKDIR /app

RUN chown nobody:nobody /app

USER nobody:nobody

COPY --from=build --chown=nobody:nobody /app/_build/prod/rel/YOUR_APP_NAME_HERE ./

ENV HOME=/app

ENTRYPOINT ["bin/YOUR_APP_NAME_HERE"]
CMD ["start"]
```


This dockerfile uses mix releases to generate a built image, and copies it on to an alpine container using the docker builder pattern. There are two gotchas here that are easy to miss. I initially forgot to copy over the rel directory which meant that my app wasn't getting started with the correct release name (more on why this is problematic later.) The second is to be sure and copy your runtime config over, if you don't do this your apps configuration won't be complete and your phoenix server will fail to startup.

You can test this works by building and running the image locally:
```
docker build -t YOUR_APP_NAME_HERE .
docker run -p 4000:4000 --rm -it  --network=host --env SECRET_KEY_BASE=TEST --env DATABASE_URL=ecto://postgres:postgres@localhost:5432/YOUR_APP_NAME_HERE_dev YOUR_APP_NAME_HERE:latest
```

If all of that is working, you are ready to deploy your app!

## Kube-ifying your application!

I'm going to make the major assumption that you have a running kubernetes cluster somewhere before you began this process. If you do not, I highly recommend reading through [this guide](https://github.com/kelseyhightower/kubernetes-the-hard-way) or using a hosted provider like GKE or EKS to create your cluster.

We are going to use helm templating to package up our application and ArgoCD to ultimately deploy our application. You can view how to use ArgoCD in your cluster [here](https://argoproj.github.io/argo-cd/getting_started/), all we're using it for is applying our manifests and dependencies.

The basic structure for our helm app is the following:
```
kubernetes/
    templates/
        deployment.yaml
        service.yaml
    application.yaml << this is used for ArgoCD
    Chart.yaml
    values.yaml
```

The `Chart.yaml` looks like this:

```
apiVersion: v2
appVersion: "1.0.0"
description: YOUR_APP Deployment
name: your-app
version: 1.0.0
dependencies:
- name: postgresql
  version: "10.2.6"
  repository: "https://charts.bitnami.com/bitnami"
```

Above you see that we are installing the postgres chart from bitnami. This allows us to easily spin up a new database in our kubernetes with minimal setup. We then are going to use Kube service networking to connect our application to our database.

Our values.yaml file is very simple as well, it's simply configuring our database to use a storage class (in this case the one provided by GKE)

```
postgresql:
  global.storageClass: "standard-rwo"
```

The final piece here is our application's deployment:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: your-app_name
  labels:
    app: your-app_name
spec:
  replicas: 1
  selector:
    matchLabels:
      app: your-app_name
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 34%
      maxUnavailable: 0%
  template:
    metadata:
      name: your-app_name
      labels:
        app: your-app_name
    spec:
      containers:
      - name: your-app_name
        image: your-app_name:latest
        imagePullPolicy: Always
        env:
          - name: DATABASE_PASSWORD
            valueFrom:
              secretKeyRef:
                name: your-app_name-postgresql
                key: postgresql-password
          - name: DATABASE_USERNAME
            value: postgres
          - name: DATABASE_HOSTNAME
            value: your-app_name-postgresql.your-app_name.svc.cluster.local
          - name: DATABASE_NAME
            value: your-app_name_prod
          - name: PORT
            value: "4000"
          - name: RELEASE_COOKIE
            value: your-app_name-secret-cookie
          - name: SECRET_KEY_BASE
            value: XXXXXXXXXXX
        ports:
        - name: http
          containerPort: 4000
```

Our deployment is pretty straightforward. We define the labels for `app` as we would for any kube app. Our template's environment variables we mostly are just configuring the database access. This is done by using the secrets file for the database password from the helm chart. The hostname for the DB is also simple – we just use the service created from the helm chart.

Once you have that setup, all you need to do is configure ArgoCD to deploy your app in its `application.yaml`: 
```
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: your-app
  namespace: argocd
  finalizers:
  - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: gitURLFORYOURREPO
    targetRevision: HEAD
    path: k8s
    helm:
      valueFiles:
      - values.yaml
  destination:
    server: https://kubernetes.default.svc
    namespace: your-app
  ignoreDifferences:
  - group: ""
    kind: Secret
    jsonPointers:
    - /data/postgresql-password
    - /data/postgresql-postgres-password
  - group: "networking.k8s.io"
    kind: Ingress
    jsonPointers:
    - /metadata/annotations
```

One thing of note in there is that we're telling ArgoCD to ignore the diff for the postgres passwords so that when you go to sync your application it doesnt make a new database password as that should be static with your DB.

Once you apply and sync your application.yaml file your phoenix deployment should be up and running! You should be able to tail your application's logs and see that its running successfully.

## Going the next step

You have your application running, but right now it doesn't scale correctly. As soon as you go add another replica, the servers are working in isolation and you lose the big benefits of running Phoenix clusters! To remedy this, we need to make a few changes to our application and our Kubernetes configuration.

First thing you want to do is implement LibCluster for your application.

in `mix.exs`:
``` 
      {:libcluster, "~> 3.2.1"},
```

in your `config/runtime.exs`:
```
  app_name = System.get_env("APP_NAME")
  config :libcluster,
    topologies: [
      localorders: [
        strategy: Cluster.Strategy.Kubernetes.DNS,
        config: [
          service: System.fetch_env!("SERVICE_NAME"),
          application_name: app_name,
          kubernetes_namespace: System.get_env("NAMESPACE"),
          polling_interval: 3_000
        ]
      ]
    ]
```

in your `application.ex`:
```
    topologies = Application.get_env(:libcluster, :topologies) || []
...
      {Cluster.Supervisor, [topologies, [name: Yourapp.ClusterSupervisor]]},

```

Finally, we need to adjust our release configuration to our release to publish our address correctly for libcluster.

in `rel/vm.args.eex`:
```
...
-name your-app@${POD_IP}
```

And in your `rel/env.sh.eex`:
```
...
export RELEASE_DISTRIBUTION=name
export RELEASE_NODE=<%= @release.name %>@${POD_IP}
```

You can read more about libcluster [here](https://github.com/bitwalker/libcluster)

Now we need to make some kubernetes configuration changes, the first of which is creating what's called a headless service that we are going to use for service discovery in kubernetes. We'll add this to our templates folder in helm.

```
apiVersion: v1
kind: Service
metadata:
  name: your-app-private
  labels:
    app: your-app
spec:
  clusterIP: None
  ports:
  - name: epmd
    port: 4369
  selector:
    app: your-app
```

Finally we'll add the environment variables to our service to connect to our service.

```
...
    env:
      - name: NAMESPACE
        valueFrom:
          fieldRef:
            fieldPath: metadata.namespace
      - name: POD_IP
        valueFrom:
          fieldRef:
            fieldPath: status.podIP
      - name: SERVICE_NAME
       value: localorders-private
...
```

You also are going to create and attach a service account that grants your application permission to the kubernetes API to get the endpoints from your headless service:

in `deployment.yaml`
```
apiVersion: v1
kind: ServiceAccount
metadata:
  name: your-app-service-account
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: Role
metadata:
  name: endpoint-role
rules:
  - apiGroups:
      - ""
    resources:
      - endpoints
    verbs:
      - list
      - get
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: RoleBinding
metadata:
  name: rolebinding-name
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: endpoint-role
subjects:
  - kind: ServiceAccount
    name: your-app-service-account
---
```

And then attach it in your deployment:

```
...
      serviceAccountName: localorders-service-account
      serviceAccount: localorders-service-account
...
```

With that you should be able to keep scaling up your application and they will work in clustered mode!! You can verify it's working by kubectl exec'ing in to an instance, running iex and running `Node.list` and you should see the list of pod ips for your service.

## Next steps

The final thing you should do (because it's best practices for running any Kubernetes application) is defining memory requests and limit as well as healthchecks for liveness and readiness. There a bunch of guides out there on how to do this, and we've already covered a lot of ground here, so I'll leave that for follow ups :) 

One thing I didn't cover was how to actually access your application from the internet. That's a whole other blog post in itself IMO, so I think I'll save that for next time as well. 

Please reach out and let me know if you have any questions! I think I may create a template repo with all of this code as starter for anyone who runs in to this a few years down the road.