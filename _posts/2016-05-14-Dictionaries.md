---
layout: post
title: Dictionaries
date: 2016-05-14
excerpt: "Every key has a value"
tags: [python, code, dictionary]
comments: true
hidden: false
project: Python
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

So lets make a program that uses everything we've learned. Let's make a todolist!

~~~ python
todos=[] #Make an empty list of our todos
~~~
Now to introduce a new way of programming in python
~~~ python
todos=[]

def main():
    #something will go here

if __name__ == '__main__':
    main()
~~~

We've seen the first part before, we're just making a method called main that takes no parameters. The second part is a bit weird, though. What it's saying is if some variable built-in to python is equal to **__main__** call the **main()** method. Great so now lets add some input

~~~ python
todos=[]

def main():
    print("Welcome to your todolist!")
    print("When you're done entering your todos type 'Done!'")
    while(True):
        add_todo = raw_input("Name a thing you have to do: ")
        if "Done!" in add_todo:
            break


if __name__ == '__main__':
    main()
~~~

> We use **raw_input()** for strings and **input()** for numbers

Okay so we've seen the first part before, were printing out some stuff to notify our user. We've seen a while loop before, but what's in the parenthesis? We call that a boolean, the most simple variable in any programming language. A boolean is either **True** or **False**. We've actually been using booleans a lot, when we ask a question **if** it is **True** then it'll do the next block of code **else** if it's false it will do another thing. Next, we ask the user to input the name of their todo item. We then ask if the phrase "Done!" is in the user's input. If it is, then **break** the while loop. Break is used to stop a while loop, if we didn't have this, our program would go on forever! Now let's make a todo item:

~~~ python
todos=[]

def main():
    print("Welcome to your todolist!")
    print("When you're done entering your todos type 'Done!'")
    while(True):
        add_todo = raw_input("Name a thing you have to do: ")
        if "Done!" in add_todo:
            break
        todos.append(make_todo(add_todo))


def make_todo(todo):
    due_date = raw_input("When is this due? ")
    category = raw_input("What category is this? ")
    return {
        "due_date": due_date,
        "category": category,
        "item": todo,
        "number": len(todos) + 1
    }


if __name__ == '__main__':
    main()
~~~


Great, so now we call the method **make_todo** to construct our item. Inside that method we ask the user for a due date and a category. We then return a dictionary with the corresponding keys and values for our items. We also give our item the key **number** so that we can keep track of which item is which. Every time we add an item to our todos, that number gets incremented. The dictionary returned by the method is then added as an item of the list. Now that we've made our todolist, lets print it out!


~~~ python
todos = []


def main():
    print("Welcome to your todolist!")
    print("When you're done entering your todos type 'Done!'")
    while(True):
        add_todo = raw_input("Name a thing you have to do: ")
        if "Done!" in add_todo:
            break
        todos.append(make_todo(add_todo))
    for todo in todos:
        print("Here is your {0} todo".format(todo["number"]))
        for key, value in todo.iteritems():
            print("The {0} is {1}".format(key, value))


def make_todo(todo):
    due_date = raw_input("When is this due? ")
    category = raw_input("What category is this? ")
    return {
        "due_date": due_date,
        "category": category,
        "item": todo,
        "number": len(todos) + 1
    }


if __name__ == '__main__':
    main()
~~~
In here we get each item in our todolist and print out which number todo it is. We then print out the keys and values for that todo item. If you want to add to this program, try making it so that after the items have been printed, the user can add or delete from this list. The final code for that will be posted at the bottom. 

{% gist c3e7dcd97af0a9e6265c39b5cd04257a %}

