---
layout: post
title: Optionals, Extensions, and Protocols
date: 2016-05-19
excerpt: "Get ready for iOS"
tags: [swift, code, extensions, optional, protocol]
comments: true
hidden: false
project: Swift
---

Now that we've gotten over the hurdle of closures we can learn the last three things we need to know before we start iOS programming. Let's start with Optionals.

Let's make a class with a couple properties

~~~ swift
class Person {
  var name: String
  var age: Int
  var street: String
  init(name: String, age: Int) {
    self.name = name
    self.age = age
  }
}
let jacob = Person(name: "Jacob", age: 18)
print(jacob)
~~~

When you run this code, you'll get two errors:

* return from initializer without initializing all stored properties
* note: 'self.street' not initialized

This is because the Person class's **street** cannot be **nil**. In order to make this work we use what's called an optional. An optional allows our variables to be **nil**, so that we can work with variables whose contents we don't know. Our new code with optionals looks like this:

~~~ swift
class Person {
  var name: String
  var age: Int
  var street: String? //We use a question mark
  init(name: String, age: Int) {
    self.name = name
    self.age = age
  }
}
let jacob = Person(name: "Jacob", age: 18)
print(jacob)
~~~ 

Let's say we wanted to print out the persons street. First we would want to check if the street is nil, if it is, we should let the user know, if it isn't lets print it! Now you're probably thinking of doing it this way:

~~~ swift
if jacob.street != nil{
  print("Not nil!")
} else{
  print("Its nil!")
}
~~~

Now this totally works, but it's not the swifty way of doing this. Here's the swifty way:

~~~ swift
if let street = jacob.street {
  print(street)
} else{
  print("Its nil!")
}
~~~

This is using a new kind of operation named **if let**, basically, we set a variable equal to the optional, and use that variable if it can be __unwrapped__ safely, **else** do something. Unwrapping is forcing an optional variable to be its type. Let's look back at our first example:

~~~ swift
jacob.street = "170 Centre St"
if jacob.street != nil{
  print(jacob.street!)
} else{
  print("Its nil!")
}
~~~

In this case because **jacob.street** isn't nil we want to print it. However, if we don't have the **!**, the output of the print would be: "Optional("170 Centre St")" instead of "170 Centre St". The reason it's best to use **if let** is because it can be dangerous to your program to use **!** carelessly. Now on to our next topic: protocols.

Protocols are similar to interfaces in java. **Protocols** can require __variables__ or __functions__.

Let's say we want to mail something to either a person or a business. The two classes have very different properties, however, if they both follow the MailingAddress protocol, it can be made much easier.

~~~ swift
protocol MailingAddress {
  var address: String { get }
}

class Person: MailingAddress {
  var name: String
  var age: Int
  var street: String?

  var address: String {
    get {
      if let street = self.street{
        return "\(name), \(street)"
      }else {
        return "\(name), No address given"
      }
      
    }
  }
  init(name: String, age: Int) {
    self.name = name
    self.age = age
  }
}
struct Business: MailingAddress {
  var name: String
  var PObox: String?
  var street: String
  var address: String {
    get {
      if let PObox = self.PObox{
        return "\(name), \(street), \(PObox)"
      }
      return "\(name), \(street)"
    }
  }
  init(name: String, street: String) {
    self.name = name
    self.street = street
  }
}

let jacob = Person(name: "Jacob", age: 18)
jacob.street = "170 Centre St, Milton, Ma"
let apple = Business(name: "Apple, Inc.", street: "1 Infinite Loop, Cupertino, CA")
print(jacob.address)
print(apple.address)
~~~

So as you can see both **classes** and **structs** can conform to protocols. But lets make this a bit more interesting:

~~~ swift
func print_address(something_that_conforms: MailingAddress){
  print(something_that_conforms.address)
}
print_address(apple)
print_address(jacob)
~~~

So with this method, because it takes a MailingAddress as a parameter, we can pass in anything that conforms to the protocol. Let's say for some reason we wanted the **Int class** to conform to a protocol which returns a textual representation of itself. To do this you may think to make a new class which inherits from the **Int** class. Although that's a good idea, there's actually a much __swiftier__ way of doing so. We use what's called an **extension**

~~~ swift
protocol TextRepresentable {
  func represent() -> String
}
extension Int: TextRepresentable {
  func represent()->String{
    return "\(self)"
  }
}
let some_number = 10
print(some_number.represent())
~~~

We can do this for more than just Swift Classes though, let's say we want our Person and Business classes to conform to the TextRepresentable protocol as well. We can easily just make an extension to handle the conforming. 

~~~ swift
extension Person: TextRepresentable {
  func represent()->String{
    return "\(self.name), \(self.age) years old"
  }
}
extension Business: TextRepresentable {
  func represent()->String{
    return "\(self.name), \(self.address)"
  }
}
print(jacob.represent())
print(apple.represent())
~~~

Probably throughout the series so far you may have questioned why some of these more advanced concepts are useful. Well, in our next tutorial we go throw basic iOS development, and hopefully you'll see why things like closures, protocols, extensions, and optionals are so amazing.

{% gist 3fb41a10d7da9abb919b052cda2aa780 %}


