---
layout: post
title: Welcome to python
date: 2016-05-10
excerpt: "Hello World – Python."
tags: [python, code, first]
comments: true
hidden: false
project: Python
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

