---
layout: post
title: Learning R Part 1
date: 2017-01-04
excerpt: "What is this language"
tags: [R, code, first]
comments: true
hidden: false
project: R
categories:
- R Tutorial
---

### Learning R Part 1


Okay so today I begin learning R for my data science class, I'm gonna try and make a post a day. From what a lot of my friends have told me R is a pretty crappy language, I'm excited to see what the language holds. 

I'm going to be following the [Hands-On Programming with R](https://www.amazon.com/Hands-Programming-Write-Functions-Simulations/dp/1449359019)

To follow these tutorials, I'm going to be using the R repl (I installed a package in Sublime Text to handle all of that).

## Chapter 1: The Very Basics

Okay, first page in, and they suggest to use RStudio, to them I say, sorry too bad, already made my decision. 

~~~ R
> 1 + 1
[1] 2
> 5^2
[1] 25
> 1:100
  [1]   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18
 [19]  19  20  21  22  23  24  25  26  27  28  29  30  31  32  33  34  35  36
 [37]  37  38  39  40  41  42  43  44  45  46  47  48  49  50  51  52  53  54
 [55]  55  56  57  58  59  60  61  62  63  64  65  66  67  68  69  70  71  72
 [73]  73  74  75  76  77  78  79  80  81  82  83  84  85  86  87  88  89  90
 [91]  91  92  93  94  95  96  97  98  99 100
> for (i in 1:100) {i*1}
> for(i in 1:5){ print(i) }
[1] 1
[1] 2
[1] 3
[1] 4
[1] 5
> 
> 5
[1] 5
> 5 -
+ 
+ 1
[1] 4
> 
~~~

Okay so we have the basics addition, exponentiation, etc. To make a sequence of numbers, we can just the **:** operator. I tried to do a for loop and failed, then realizing maybe I should try to say print. It also seems like programs don't complete until they have some sort of valid syntax. Next page:

~~~ R
> 3%5
Error: unexpected input in "3%5"
> 3*(5-4)
[1] 3
> 3*5-4
[1] 11
> 10/3
[1] 3.333333
> 10/3.
[1] 3.333333
> 1/3
[1] 0.3333333
> 10 mod 3
Error: unexpected symbol in "10 mod"
> 10 modulo 3
Error: unexpected symbol in "10 modulo"
> 1:6 * 3
[1]  3  6  9 12 15 18
> 
~~~


So it seems like modulus isnt a thing, I'll probs find it later in the book. No fractions, just decimal. Also sequences seem pretty cool.

~~~ R
> a <- 1
> a
[1] 1
> a
[1] 1
> a = 2
> a
[1] 2
> b = 3
> b
[1] 3
> a * B
Error: object 'B' not found
> a * b
[1] 6
> f1ve = 5
> f1ve
[1] 5
> 1one = 1
Error: unexpected symbol in "1one"
> die <- 1:6
> die
[1] 1 2 3 4 5 6

~~~

Okay, so now we dive right into variables, there's no variable decleration, or vartiable syntax like var/let and there's no type system (which peronsally I don't like.) It also seems like **<-** and **=** are the same thing, so ¯\_(ツ)_/¯. Maybe that's just a weird syntactic sugar thing. Variable names are also weird cause I can do f1ve but not 1one. The other ones the book say is alright is underscores, all caps, and starting with a period. Again, I really like sequences, really interesting array concept. I wonder what other operations I can apply to them?


~~~ R
> ls()
[1] "a"    "b"    "die"  "f1ve" "i"   
> six-die = 1:6
Error in six - die = 1:6 : object 'six' not found
> six_die = 1:6
> twelve_die = 1:12
> six_die
[1] 1 2 3 4 5 6
> twelve_die
 [1]  1  2  3  4  5  6  7  8  9 10 11 12
> six_die*twelve_die
 [1]  1  4  9 16 25 36  7 16 27 40 55 72
> c(4,6)
[1] 4 6
> six_die*c(4,6)
[1]  4 12 12 24 20 36
> c(1,3,6)
[1] 1 3 6
> 1:3 %*% 1:3
     [,1]
[1,]   14
> die %*% die
     [,1]
[1,]   91
> die %o% die
     [,1] [,2] [,3] [,4] [,5] [,6]
[1,]    1    2    3    4    5    6
[2,]    2    4    6    8   10   12
[3,]    3    6    9   12   15   18
[4,]    4    8   12   16   20   24
[5,]    5   10   15   20   25   30
[6,]    6   12   18   24   30   36
> 
~~~

Another interesting thing. Okay so we have **ls()** like in unix to see all the things. Did some multiplication between the two sequences to get some weird, yet, expected results. I learned how to make an **array?** apparently c() is used to __concatenate__. They have some weird operators though. __%*%__ to do inner multiplication and __%o%__ for outer multiplication. That's some weird operations, again, I like sequences, and this seems pretty interesting for matrix multiplication. This next part has more functions, so let's see how that turns out.


~~~ R
> round(pi)
[1] 3
> factorial(10)
[1] 3628800
> mean(1:6)
[1] 3.5
> round(mean(die))
[1] 4
> sample(x = die, size = 2)
[1] 5 3
> sample(x=die, size=1)
[1] 1
> sample(x=die, size=1)
[1] 3
> sample(x=die, size=1)
[1] 5
> sample(x=die, size=1)
[1] 5
> sample(x=die, size=1)
[1] 2
> 
> sample(x=die, size=1)
[1] 1
> args(sample)
function (x, size, replace = FALSE, prob = NULL) 
NULL
> args(round)
function (x, digits = 0) 
NULL
> 
~~~

So some more functions, we have **round**, **factorial**, **mean**, **sample**, and **args**. Most are self explanatory, but I wanna learn more about sample and args. Sample seems like, given a sequence, return some random number in the sample size. Args is also pretty cool, the ability to see what the possible arguments to a function is really useful. Also, from what I've heard about NULL, it's a slippery slope. Reading my book, apparently the replace param in sample, allows the sample to pick the same thing again. 


~~~ R
> dice <- sample(x=die, replace=TRUE)
> dice
[1] 2 1 1 2 2 6
> dice
[1] 2 1 1 2 2 6
> dice
[1] 2 1 1 2 2 6
> sum(dice)
[1] 14
> roll <- function () {
+ 
+ die <- 1:6
+ dice <- sample(die, size=2, replace = TRUE)
+ sum(dice)
+ }
> roll()
[1] 7
> roll()
[1] 11
> roll()
[1] 8
> roll
function () {

die <- 1:6
dice <- sample(die, size=2, replace = TRUE)
sum(dice)
}
> sum
function (..., na.rm = FALSE)  .Primitive("sum")
> 
~~~

So obiviously, after you assign the result of a function, it doesn't reevaluate. Now, though, I can make functions. What sucks is that I can't specify **return**, I wonder how that will play out with control flow. What's cool though is if I just type in the name of the function without the call it just prints the literal function. I wonder if R is functional or allows higher-order functinons. 

~~~ R
> roll2 <- function(bones=1:6) {
+ dice <- sample(bones, size=2, replace = TRUE)
+ sum(dice)
+ }
> roll2()
[1] 8
> roll2()
[1] 7
> roll2()
[1] 10
> roll2()
[1] 10
> roll2(bones=1:12)
[1] 8
> 
> roll2(bones=1:12)
[1] 11
> roll2(bones=1:12)
[1] 16
> roll2(bones=1:12)
[1] 19
> applicator <- function(f){
+ f(1, 6)
+ }
> add <- function(l,r){l+r}
> applicator(add)
[1] 7
> counter <- function(adder){
+ c = 0
+ inner_counter <- function(){
+ c = adder(c)
+ c}
+ inner_counter}
> add3 = function(num){
+ num+3}
> add3_counter = counter(add3)
> add3_counter()
[1] 3
> add3_counter()
[1] 3
> add3_counter()
[1] 3
> 
~~~

Woah, now this was really interesting. So, we have named params (we knew that already), but we also have default arguments, and higher order functions!!! I was able to make an applicator that takes a function and then applies 1 and 6 to those. I was surprised I was able to make the counter, but I knew it couldn't be perfect. Nevertheless, I was disappointed when my counter didn't work. Good to know there are higher order functions though! 


#Ending The Chapter

Okay, so the rest of the chapter is just saying that R is a scripting language, and you can do some other stuff in RStudio, but I wasn't using that so I didn't care at all. R is definetly an interesting language, not my favorite language so far, but interesting nonetheless. Excited to start Chapter 2 tomorrow! 



