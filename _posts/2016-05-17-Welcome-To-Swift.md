---
layout: post
title: Part 1, Welcome to Swift
date: 2016-05-17
excerpt: "Hello World – Swift."
tags: [swift, code, first]
comments: true
hidden: false
project: Swift
categories:
- Swift Tutorial
---

Welcome to Swift! Swift is my favorite programming language right now for a bunch of reasons. If you're familiar with a statically-typed language like Java, C, or C++, Swift will come as a breath of fresh air. Swift is a statically-typed, type-inferred language. This tutorial is meant for more experienced programmers, you should have a good understanding of either a statically-typed language like Java or a great understanding of a dynamically-typed language like Python. This first tutorial is going to go over the basics of Swift. 


Swift can be compiled and run in a numorous amount of places, there are a lot of web compilers, here are some web examples:

* http://swiftstub.com
* http://www.runswiftlang.com
* https://swiftlang.ng.bluemix.net/#/repl

Swift, however, is often used in Xcode. Once you download Xcode, open up a new Playground. 

### Swift example code

~~~ swift
var x: Int = 10 //statically typed variable
var y = 30.0 //dynamicly typed variable
var z: Double = Double(x)+y //Because x is an integer, we have to tell swift to add these numbers as doubles

var 國 = "美國"//We can use characters and emojis as variable names

let name="Jacob Aronoff"//let means the variable is immutable or final
print("My name is \(name)")//Print is just like in python

let students = ["Jacob","Sam","Corey","Michael"]//Swift array
//let students: [String] = ["Jacob","Sam","Corey","Michael"]//Without type inference

if students.isEmpty {//.isEmpty is a property of the collection type
  print("There are no students!")  
} else {
  print("There are \(students.count) students")//So is .count
}

let grades = ["Jacob":97,"Sam":98,"Corey":99,"Michael":100]//A dictionary of type [String:Int]
for (name, grade) in grades{//We're making a tuple equal to each (key, value) pair in the dictionary
  print("\(name) has a \(grade) in class")
}
for num in 1..<10{//Swift will no longer support C-style for loops (for(int i=0; i<10;i++)) in Swift 3
  print(num)
}

func print_something(something:String){//takes one parameter
  print(something)//print the parameter
}
print_something("WOW!")//call the function
func return_something(first: String, last:String)->String{//Takes two parameters, one named first, the other named last
  return "\(first) \(last)"//return the concatenation of the two strings
}
print(return_something("Jacob",last:"Aronoff"))//We can call the function with the named parameters

func power(base: Int, power:Int = 2)->Int{//default param
  var answer: Int = 1
  for _ in 1...power {
    answer *= base
  }
  return answer
}
print(power(3))
print(power(10,power: 3))
~~~

Okay well that's enough for now, next time we'll go over different kinds of datastructures, classes, and some more swifty behavior.

{% gist f8f64e9abbfd0197ee5690974e7cf86f %}