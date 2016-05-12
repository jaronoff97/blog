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
hello(bar="worlds") #prints "Who are you saying hello to? oh hi worlds"
{% endhighlight %}

So, in python we use the keyword **if** to begin a question and we use the following words to ask the question:

* **is** asks if two things are equal
* **is** not asks if two things aren't equal
* **and** allows us to have multiple conditions that must be true for our question
* **or** allows us to have multiple conditions that only need one to be true for our question
* **==**, **>**, **>**, **>=**, **<=** allow us to compare numbers

In addition to **if**, we also have:

* **elif** which is short for saying if the first condition isn't true, ask if this is true
* **else** which means if none of our previous statements were true, do this

Let's see this in practice:

~~~ python
secret_number = 27
lower_bound = 0
upper_bound = 100


def guessing_game(number):
    if number <= lower_bound or number >= upper_bound:
        print("Out of bounds!")
        return  # stops the method
    if number > secret_number:
        print("TOO HIGH!")
    elif number < secret_number:
        print("TOO LOW!")
    elif number == secret_number:
        print("You got it! My number was {0}".format(secret_number))
    else:
        print("This should never happen!")

guessing_game(101)
guessing_game(-1)
guessing_game(30)
guessing_game(20)
guessing_game(27)

~~~

> Something to note: In my code I used a function called format. This function allows us to print strings and numbers together. Format looks inside of a string for curly brackets with numbers (starting at 0). It then takes the first parameter in the function and puts it in the right place (more on this later)


