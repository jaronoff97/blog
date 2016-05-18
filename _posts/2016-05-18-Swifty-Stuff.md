---
layout: post
title: Swifty Stuff
date: 2016-05-18
excerpt: "Classes, structs, enums, etc."
tags: [swift, code, first]
comments: true
hidden: false
project: Swift
---

Welcome back to another glorious day of Swift! Today we're going to learn about differnt data structures to make efficient and effective **Object Oriented**(__OO__) Code. The first one we'll go over is the classic **OO** design: the class.

~~~ swift
class Student {
  var name: String
  var age: Int
  var grade: String
  static let uniform_needed = false
  private var _homework: [String] = []
  public var homework:[String]{
    get {
      return _homework
    }
  }

  init(name:String, age:Int, grade:String) {
    self.name=name
    self.age=age
    self.grade=grade
  }
  func new_assignment(new_homework: String){
    self._homework.append(new_homework)
  }
}
~~~

So let's go over what's happening here. First we're making a new **class** named **student**. This class has a bunch of properties:

* a Name
* an Age
* a Grade

Notice how we declare all the properties but we don't initiate them? We do the initialization in our **init** method. This **init** is synonymous to the one in any other **OO** language. In our init we take three params and we set our own (**self**) properties equal to those. **self** is just like Java's **this**, it describes the object's proerties. Now that we have the **init** method explained, lets go over the rest of the properties. 

Like many other languages we have static context's for our classes. We have a static boolean named **uniform_needed**. This boolean will be false for every student we make. Also, because it's a **let** it is __final__ for all of our students. 

Also like many other languages we have public and private scopes. We use the **public** and **private** keywords to denote these scopes. Because our homework list is **private** it'd be useful to have a variable that allows our main classes to access it. As you may have used in other languages when we have a **private** variable, often times we have **get** and **set** methods that change these variables. Rather than having seperate methods that do these, each variable has these built in. If a variable has only a getter and no setter, that means it is a **read-only** variable. Lets see more:

~~~ swift
private var something:String
var test: String{
  get {
    return something
  }
  set (newValue) {
    something = newValue
  }
}
~~~

Finally we have a function that adds a new element to our array, and that's just about it. Let's move on to our next data structure: **struct**. If you're familiar with **C++** then these'll be familiar. Structs are most useful when you have a smaller data structure that isn't quite a **class**. Here's the official difference as told by the swift language guide:

> You can use both classes and structures to define custom data types to use as the building blocks of your program’s code.

> However, structure instances are always passed by value, and class instances are always passed by reference. This means that they are suited to different kinds of tasks. As you consider the data constructs and functionality that you need for a project, decide whether each data construct should be defined as a class or as a structure.

> As a general guideline, consider creating a structure when one or more of these conditions apply:

> * The structure’s primary purpose is to encapsulate a few relatively simple data values.
> * It is reasonable to expect that the encapsulated values will be copied rather than referenced when you assign or pass around an instance of that structure.
> * Any properties stored by the structure are themselves value types, which would also be expected to be copied rather than referenced.
> * The structure does not need to inherit properties or behavior from another existing type.
> Examples of good candidates for structures include:

> * The size of a geometric shape, perhaps encapsulating a width property and a height property, both of type Double.
> * A way to refer to ranges within a series, perhaps encapsulating a start property and a length property, both of type Int.
> * A point in a 3D coordinate system, perhaps encapsulating x, y and z properties, each of type Double.
> In all other cases, define a class, and create instances of that class to be managed and passed by reference. In practice, this means that most custom data constructs should be classes, not structures.

Obviously, a homework assignment is more than a String. Lets make a **struct** that models homework. 

~~~ swift
struct Homework {
  var subject: String
  var due_date: String
  var name: String
}
~~~

So now if we change the array's in our **Student** class from [String] to [Homework] we can test this out.

~~~ swift

let new_homework = Homework(subject: "Programming", due_date:"Tuesday",name:"Finish Swift Tutorial")
let jacob = Student(name:"Jacob", age: 18, grade:"Senior")
jacob.new_assignment(new_homework)
print(jacob.homework)
~~~

As you see our constructor for classes and structs are the same. **NAME(param1: "value")** But let's make this more interesting. There are only a set amount of subjects in school that we can get homework from. For these kinds of structures we can use an **enumeration**

~~~ swift
enum Subject {
  case English
  case Programming
  case Language
  case Science
  case History
}
~~~

Our enumeration has one case for each of our subjects. We can then change our **Homework** struct to look like this: 

~~~ swift
struct Homework {
  var subject: Subject
  var due_date: String
  var name: String
}
~~~

Which would make our constructor look like this: 

~~~ swift
let new_homework = Homework(subject: .Science, due_date:"Tuesday",name:"Finish Swift Tutorial")
~~~

Notice how the subject in our constructor isn't **Subject.Science**. It's implied that it's a subject because that's what the constructor asks for.

