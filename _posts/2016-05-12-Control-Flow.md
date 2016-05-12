---
layout: post
title: Control Flow
date: 2016-05-11
excerpt: "I wonder IF this works FOR a lot of things"
tags: [python, code]
comments: true
hidden: false
project: Python
---

And we're back! Let another day of Python begin!! 
We know how to make variables (Strings and Numbers) and we know how to make functions that do stuff to those variables. But what if we want to do something different for each kind of variable we get? Well, the answer lies in one of the words in the previous sentence.

I wonder IF you'll get it...


{% highlight python %}
def hello(foo="hello",bar="world"):
  if bar is not "world":
    print("Who are you saying hello to? oh hi "+bar)
  else:
    print(foo+" "+bar)
{% endhighlight %}

Try this function out in the following ways:


{% highlight python %}
hello() #prints 'hello world' 
hello("someone") #prints 'someone world'
hello("hello","Jacob") #prints "Who are you saying hello to? oh hi Jacob"
hello(bar="worlds")
{% endhighlight %}