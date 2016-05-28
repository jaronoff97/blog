---
layout: post
title: Part 2, More on Functions
date: 2016-05-11
excerpt: "Part 2: More variables. More functions. More fun"
tags: [python, code]
comments: true
hidden: false
project: Python
---

And we're back! Let another day of Python begin!! 
Here's where we left off:

{% highlight python %}
  def f(x):
    w = x * 10
    print(w)
{% endhighlight %}

So we know how to make numbers, and we know how to make functions that do stuff to those numbers. But what about other kinds of variables, letters? words? sentences? paragraphs? In the programming world we call those Strings!

Here's how we make those:

{% highlight python %}
my_first_name = "Jacob"
my_last_name = "Aronoff"
print(my_first_name+' '+my_last_name)
{% endhighlight %}

Some important things to note about that code:

* We can make strings with single or double quotation marks " " or ''
* Variable names (and function names too!) can be as long as we want as long as they dont have spaces between them:
  * thisisavariable
  * this_is_a_variable
  * thisIsAVariable
* We have to be sure that when we print, we put a space between our variables so that it doesnt print out JacobAronoff

{% highlight python %}
my_first_name = "Jacob"
my_last_name = "Aronoff"

def print_full_name(first, last):
  print(first+' '+last)

print_full_name(my_first_name, my_last_name)
{% endhighlight %}

Notice how our function has two variables as 'parameters' or 'arguments' and we can name them whatever we want 

{% highlight python %}
my_first_name = "Jacob"
my_last_name = "Aronoff"

def print_full_name(blarg, blurb):
  print(blarg+' '+blurb)

print_full_name(my_first_name, my_last_name)
{% endhighlight %}

As you see we can name those parameters whatever

{% highlight python %}
def print_full_name(first, last, spacing=' '):
  print(first+spacing+last)

print_full_name(my_first_name, my_last_name)
{% endhighlight %}

Now this is a bit strange, we have a parameter which is equal to ' ', we can then use this variable inside our method. We call these default parameters. Just because they're default though, doesnt mean that we have to keep them the same everytime.

{% highlight python %}
def print_full_name(first, last, spacing=' '):
  print(first+spacing+last)

print_full_name(my_first_name, my_last_name, '      ')
{% endhighlight %}

Ok so now the last part of basic functions is the magic 'return' keyword. Just like in algebra if we plug something in to a function, we expect something back right?

{% highlight python %}
def full_name(first, last, spacing=' '):
  return(first+spacing+last)

print(full_name(my_first_name, my_last_name))
#Or we can do set a variable equal to the output
my_full_name = full_name(my_first_name, my_last_name)
{% endhighlight %}

Really cool and powerful. As we learn more, it'll be even better. Next time, we're gonna go over control flow and how we can do more based on our variables