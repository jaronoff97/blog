---
template: "archive"
title: Part 1, Welcome to python
date: 2016-05-10
description: "Part1: Hello World – Python."
tags: [python, code, first]
comments: true
draft: false
project: Python
category: Python Tutorial
---

Welcome to Python! Python is a really great programming language, thats easy to learn and fun to use. In order to write python code, you have two options. You can use what's called interactive mode which is done by going to terminal and typing

{% highlight bash %}
  python
{% endhighlight %}

You should see the following pop up:

{% highlight bash %}
Python 2.7 (#1, Feb 28 2010, 00:02:06)
Type "help", "copyright", "credits" or "license" for more information.
>>>

{% endhighlight %}

Your other option is to use an editor like Sublime Text[^1], Atom[^2], or PyCharm[^3] to program


[^1]: <https://www.sublimetext.com/>
[^2]: <https://atom.io/>
[^3]: <https://www.jetbrains.com/pycharm/>

Either way, lets begin your first program. 

The basis of programming is variables. Think back (or look ahead) to algebra, when you first learned about the magic 'x'. x could be any number: 1, -10, 100, etc. Just like algebra, in Python when you want to make a variable all we have to say is:

{% highlight python %}
  x = 5 #Your first python variable!
{% endhighlight %}

The little hashtag, pound, number sign, etc. is what's called a comment, we can put it after any complete line of code (but not in the middle of one)
We can do all sorts of things to x, we can add to it

{% highlight python %}
  x = x + 5 #adding
  x = x - 3 #subtracting
  x = x * 6 #multiplaction
  x = x / 4 #dividing
{% endhighlight %}

Now you may be wondering, okay all of this stuff worked, whatever I was using didn't tell me anything went wrong. How do I know it worked though?
Well let me tell you about something great


{% highlight python %}
  print(x) # Lets see what x is!
{% endhighlight %}

Lets make another variable, call it y!


{% highlight python %}
  y = 4 #Your second python variable!
  print(x+y) #We can add, subtract, divide, multiply, etc. 
  z = y / x #We can make a new variable called z based on x and y
{% endhighlight %}

Ready for some more great magic?! Just like algebra, we have more than just variables, we have functions! 
Just like Algebra, we can apply a function to a variable.

{% highlight python %}
  def f(x):
    w = x * 10
    print(w)
{% endhighlight %}

So this function will multiply the number we pass in by 10 and then print it out.
Keep in mind, we actually have to tell python we want to use this function.


{% highlight python %}
  f(10) #call the method with some number
{% endhighlight %}

Something to note about python: spacing and indentation matters! A LOT!!!! Be sure that when you're writing python code, you indent the next line after you type a colon


{% highlight python %}
  def f(x): #THIS IS NO GOOD!!!
  w = x * 10
  print(w)

    ##########

  def f(x): #This works fine!
    w = x * 10
    print(w)
{% endhighlight %}

Okay, well that's enough for now, next time we'll go over different kinds of variables, built-in-functions, and functions with multiple parameters.