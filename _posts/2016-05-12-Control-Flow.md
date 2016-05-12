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
We know how to make variables (Strings and Numbers) and we know how to make functions that do stuff to those variables. But what if we want to do something different for each kind of variable we get? Well, the answer lies within one of the words in the previous sentence.

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
hello(foo="goodbye") #prints 'goodbye world'
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
guessing_game(50)
guessing_game(30)
guessing_game(20)
guessing_game(27)

~~~

> Something to note: In my code I used a function called format. This function allows us to print strings and numbers together. Format looks inside of a string for curly brackets with numbers (starting at 0). It then takes the first parameter in the function and puts it in the right place (more on this later)

Lets make this a bit cooler though, it's kinda of annoying that in order to play the game you have to program, lets add some user input! We're going to use a simple built-in function called **input**

~~~ python
secret_number = 27
lower_bound = 0
upper_bound = 100
their_number = -100


def guessing_game(number):
    if number <= lower_bound or number >= upper_bound:
        print("Out of bounds!")
        return  # stops the method, we could also just say return, but break is a really useful control flow statement
    if number > secret_number:
        print("TOO HIGH!")
    elif number < secret_number:
        print("TOO LOW!")
    elif number == secret_number:
        print("You got it! My number was {0}".format(secret_number))
    else:
        print("This should never happen!")


while their_number is not secret_number:
    their_number = input("Guess a number: ")
    guessing_game(their_number)
~~~

So this is the whole program. Lets go over what the new stuff does:

* We make a number called **their_number** equal to -100 which really doesn't matter because we're gonna set it equal to something else immediately
* Our **guessing_game** function is the exact same as before
* We have a new control flow statement **while**, which is pretty self explanatory, basically while the condition is true, do the following block of code
* Inside of there we set **their_number** equal to the **input** of the user
* **input** takes a parameter equal to the text it'll print out
* We then call the **guessing_game** method with **their_number**

Well that's all for now, next time we're gonna go over lists and some more powerful python syntax.

{% gist b01a73f3368f4b0cf0b0575f5c80d184 %}
