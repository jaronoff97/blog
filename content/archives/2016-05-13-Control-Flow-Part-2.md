---
template: "archive"
title: Part 4, More Loops
date: 2016-05-13
description: "Part 4: I'll keep listing things for a while"
tags: [python, code, lists, for]
comments: true
draft: false
project: Python
category: Python Tutorial
---

And we're back (after a slight hiatus)! Let another day of Python begin!!
So let's back up for a second. We can make variables really easily:

~~~ python
x=5
y=6
z=7
a=8
b=9#and so forth
~~~

And right now if we wanted to print out all the numbers between 1 and 100 we could do this:

~~~ python
num=0
while num <= 100:
    print(num)
    num = num +1
~~~

This will print all the numbers between 0 and 100 (inclusive). Okay now for the new stuff. Let's say we were in a classroom, in that class we have a bunch of students.

~~~ python
student1 = "Jacob"
student2 = "Sam"
student3 = "Corey"
student4 = "Michael"

#If we wanted to print each student:
print(student1)
print(student2)
print(student3)
print(student4)
~~~

As you can tell this is a bit annoying, lets say (theoretically) our classroom had 100 kids, we would have to write 100 print statements! In order to make this easier we can have a list of students.

~~~ python
students = ["Jacob", "Sam", "Corey", "Michael"]
~~~

So now we have a list of four students. Right now the only way we can print out each student is like this:


~~~ python
num = 0
while num<len(students): #len is a built in function like print that tells us how long something is, it could be an array, a string, etc.
    print(students[num])
    num = num + 1
~~~

We access what's called an index in our array with [somenumber]. But be careful with this, because if the length of our array is 4 and we ask for the object at the fifth index: students[4] (keep in mind that programmers start counting at 0) we'll get an error! The easiest way to avoid this is by using a new kind of loop!

~~~ python
for student in students:
    print(student)
~~~

The magical **for** loop can do some awesome stuff. We can use it to iterate through a list, a string, and even a range of numbers!

~~~ python
for num in range(0,10):#range is another built in function in python
    print(num)#prints 0 through 9
~~~

With python, we can have lists of strings, and numbers together. Lists have some built in functions that are really useful:

~~~ python
list = ["string1",10,"string2",100]
if 10 in list:
    list.remove(list.index(10))
    list.insert(3,300)
    for thing in list:
        print(thing)

~~~

Here are some of the functions of array:

* list.**append(obj)** #add an object to the end of an array
* list.**count(obj)** #count the amount of times the object shows up in the array
* list.**index(obj)** #where's the first occurance of the object
* list.**insert(index, obj)** #put an object at a certain place
* list.**remove(obj)** #get rid of an object if it's there

Next time we're going to go over a different kind of list called a dictionary. In the meantime, I'd suggest to make a program that uses lists and some of the other things we've learned. 

{% gist 6c88c16f0e09bfc346c76b6bdd265af6 %}
