---
layout: post
title: Part 3, Cool, Difficult Swift
date: 2016-05-18
excerpt: "Closures are shorthand functions"
tags: [swift, code, closures]
comments: true
hidden: false
project: Swift
---

Today is gonna be our toughest day yet, but by the end of it, you're gonna know everything you have to about Swift.

Lets look back to our Student and Homework classes: 

~~~ swift
enum Subject {
  case English
  case Programming
  case Language
  case Science
  case History
}
struct Homework {
  var subject: Subject
  var due_date: String
  var name: String
}
class Student {
  var name: String
  var age: Int
  var grade: String
  static let uniform_needed = false
  private var _homework: [Homework] = []
  public var homework:[Homework]{
    get {
      return _homework
    }
  }

  init(name:String, age:Int, grade:String) {
    self.name=name
    self.age=age
    self.grade=grade
  }
  func new_assignment(new_homework: Homework){
    self._homework.append(new_homework)
  }
}
~~~

Lets say we want to sort our homeworks by their priority (lets add in that trait) first:

~~~ swift
struct Homework {
  var subject: Subject
  var due_date: String
  var name: String
  var priority: Int
}
~~~

Lets say our student has a bunch of homework assignments. Lets add a way for our student class that'll help our student stay organized. Now one way of doing this would be a swift implementation of the classic sorting algorithms. But let's do this the **swift** way. Let's sort our array everytime someone calls our getter for our **_homework** variable. 

~~~ swift
public var homework: [Homework]{
  get {
    self._homework = self._homework.sort({(homework1, homework2) in
        return (homework1.priority < homework2.priority)
    })
    return self._homework
  }
}
~~~

So let's go over what's happening here. The sort method of the array class takes what's called a closure as a parameter. Think of a closure as a function. It's a function without a name. When we give it a name this closure is a variable. Here's what that looks like with full verbosity:

~~~ swift
var cool_closure: (String)->String = { (param1) in
  return "hello \(param1)"
}
cool_closure("world")
~~~

So let's go over what's happening here. The type of this variable is **(String)->String**. This means that this function takes a string as a parameter and returns a string. We can use that parameter similar to the syntax of a for loop: **variable** __in__ (our function).

If we looked at the type of our function **new_assignnment** in our **student** class it would be **(Homework)->Void** because it takes a **Homework** as a parameter and returns nothing or **Void**. Here are some more examples of closure types:

* ()->Void takes no params and returns nothing
* ()->Int takes no params and returns an Int
* (name:String)->String takes a named parameter and returns a String

So lets look at a method that takes a closure as a parameter:

~~~ swift
func apply_operator(op: (lhs: Int, rhs: Int)->Int){
  print(op(lhs: 3,rhs: 10))
}
apply_operator({ (lhs, rhs) in
  return lhs * rhs
})
apply_operator({ (lhs, rhs) in
  return lhs + rhs
})
~~~

> Notice how because our parameters are named in our function **apply_operator** we have to name them when we call our closure. 

So now back to our original use of closures. If we peered inside the Array's Sort method we'd see that it would look something like this:

~~~ swift
func sort(method:(Element, Element)->Bool)->Array{
  //after a bunch of code it would call:
  method(arr1, arr2)
}
~~~

So in order to use this we have to pass in a closure that takes two elements as parameters and returns a boolean.  Which is why if we want to sort by the homework's priorities, we can pass in the following closure:

~~~ swift
{(homework1, homework2) in
  return (homework1.priority < homework2.priority)
}
~~~

> The method takes two params and returns a boolean. Because the **sort** method takes a closure that returns a boolean, we don't have to explicitly specify our closure will return a boolean. 

Let's say there are a bunch of ways to sort our homework assignments. Let's make an enum which will represent the sorting methods

~~~ swift
enum SortMethod {
  case AscendingPriority
  case DescendingPriority
  case AscendingDueDate
  case DescendingDueDate

  func sort_function()->(Homework, Homework)->Bool{
    switch self {
    case AscendingPriority:
      return { (h1, h2) in
        return h1.priority>h2.priority
      }
    case DescendingPriority:
      return { (h1, h2) in
        return h1.priority<h2.priority
      }
    case AscendingDueDate:
      return { (h1, h2) in
        return h1.due_date>h2.due_date
      }
    case DescendingDueDate:
      return { (h1, h2) in
        return h1.due_date<h2.due_date
      }
    }
  }
}
~~~

So our enum has four cases: AscendingPriority, DescendingPriority, AscendingDueDate, DescendingDueDate. The next part is a bit weird. Our enum has a function that will return a function that takes two Homeworks and returns a boolean. Now we know that our Array's sort function takes a closure which has two Homeworks as params and returns a boolean. So what our enum's function is doing is returning a function which will be passed in to our **Student's Array's Sort** function. 

~~~ swift
 var sortMethod: SortMethod = .AscendingPriority
  private var _homework: [Homework] = []
  public var homework:[Homework]{
    get {
      self._homework = self._homework.sort(self.sortMethod.sort_function())
      return self._homework
    }
  }
~~~

To test this out, change the sort method and print out the homework array.

~~~ swift
jacob.sortMethod = .AscendingPriority
print("-----AscendingPriority-----")
print(jacob.homework)
print("-----AscendingPriority-----")
jacob.sortMethod = .DescendingPriority
print("-----DescendingPriority-----")
print(jacob.homework)
print("-----DescendingPriority-----")
jacob.sortMethod = .AscendingDueDate
print("-----AscendingDueDate-----")
print(jacob.homework)
print("-----AscendingDueDate-----")
jacob.sortMethod = .DescendingDueDate
print("-----DescendingDueDate-----")
print(jacob.homework)
print("-----DescendingDueDate-----")
~~~

Well that's all for now, I know this was a tough one, but hopefully you understood it. Next time we're going to start iOS application building by learning three final swift concepts. I also think I'm going to make a video to show the iOS stuff.

{% gist a6e7e5566745593fcbaa7e5a29169c2e %}
