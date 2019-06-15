---
layout: post
title: Part 5, Dictionaries
date: 2016-05-14
excerpt: "Part 5: Every key has a value"
tags: [python, code, dictionary]
comments: true
hidden: false
project: Python
categories:
- Python Tutorial
---

Welcome back! Today is our last day of python and we're going to cover the last part of basic python: dictionaries. Dictionaries work just like you'd expect. For every 'key' in the dictionary there must be a corresponding value. Lets think about this like a literal dictionary:

~~~ python
mirriam_webster = {
    "Programming":"the action or process of writing computer programs.",
    "Python":"a high-level general-purpose programming language.",
    "Learning":"the acquisition of knowledge or skills through experience, study, or by being taught"
}
~~~

To make a dictionary we use {}, curly brackets. Each key has quotations around it, followed by a colon to denote the next thing is the key's value. Both the key and the value can be any kind of object (a number, a word, a character, etc.)

~~~ python
print(mirriam_webster["Python"])#Print a value
mirriam_webster["Ugh"] = "The sound a programmer makes when stuck" #add a value
print(mirriam_webster["Ugh"])
print(mirriam_webster["GRR"])#ERROR


~~~

We can easily add a value just by adding a new key and value to our pre-existing dictionary. Similarly to how we can iterate through a list, we can also use a for loop to iterate through our dictionary.

~~~ python
for key, value in mirriam_webster.iteritems():
    print("{0}:{1}".format(key,value))
~~~

Now I know this looks a bit weird, lets break down what's happening here:

~~~ python
x, y = 5, 10 #we're making two variables x and y equal to 5 and 10 respectively
print(x)
print(y)

print(mirriam_webster.iteritems())#returns each key and value as basically a point (x,y) so we can set variables equal to it.

~~~

The next post is a continuation of this one, which will describe a simple todolist app. 