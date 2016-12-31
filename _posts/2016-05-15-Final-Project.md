---
layout: post
title: Part 6, Final Python Project
date: 2016-05-15
excerpt: "Part 6: Todolist application, using everything we've learned"
tags: [python, code, final]
comments: true
hidden: false
project: Python
categories:
- Python Tutorial
---

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

The first step I would take is breaking up the adding and printing parts of the program into methods so we the user can keep asking to use them. 

~~~ python
def add_todo():
    print("When you're done entering your todos type 'Done!'")
    while(True):
        add_todo = raw_input("Name a thing you have to do: ")
        if "Done!" in add_todo:
            break
        todos.append(make_todo(add_todo))


def print_todos():
    print("--------------------")
    for todo in todos:
        print("Here is your {0} todo".format(todo["number"]))
        for key, value in todo.iteritems():
            print("The {0} is {1}".format(key, value))
        print("--------------------")
~~~

The **add_todo()** is called at the beggining of our program and then inside of a **while** loop so we can keep doing it as long as we want. The **print_todos()** is the same as before, but I added in some lines to make it more visually appealing. 

~~~ python
def remove_todo():
    to_delete = input("Which todo have you completed? ") - 1
    todos.remove(to_delete)
~~~

Here's the **remove_todo()** method which asks the user to remove a todo from their list. The issue with this is that once the todo item is deleted, the rest of the todolist's numbers in the dictionary dont change. To fix that i made a method: 

~~~ python
def remove_todo():
    to_delete = input("Which todo have you completed? ") - 1
    todos.remove(to_delete)
    reassign_numbers()


def reassign_numbers():
    for num in range(0, len(todos)):
        todos[num]["number"] = num + 1
~~~

All it does is go through and change the numbers of each todo.

Finally we put all the method calls in a **while** loop where we ask the user for their input:

~~~ python
def main():
    print("Welcome to your todolist!")
    add_todo()
    print_todos()
    while(True):
        choice = raw_input(
            "If you want to add to your list say 'add', if you want to remove things say 'remove', if you want to see your todos say 'print', say anything else to exit ")
        if 'add' in choice:
            add_todo()
        elif 'remove' in choice:
            remove_todo()
        elif 'print' in choice:
            print_todos()
        else:
            print("Thanks!")
            break
~~~

That's it! Very simple all in all, hopefully you feel comfortable with basic python now. My next series is going to be with Swift, it'll be a more difficult tutorial, going through more advanced concepts, but feel free to take a look! The entire code for this project is posted at the bottom in the **gist**

{% gist c3e7dcd97af0a9e6265c39b5cd04257a %}

