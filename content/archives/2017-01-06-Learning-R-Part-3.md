---
template: "archive"
title: Learning R Part 3
date: 2017-01-06
description: "What is this language"
tags: [R, code, third]
comments: true
draft: false
project: R
category: R Tutorial
---

### Learning R Part 3

Part 3, this chapter is all about R objects and I'm not excited. R objects, from what I've gathered are barely objects. We start this chapter with a bunch of different data types. R has six basic atomic vector data types: doubles, integers, characters, logicals, complex, and raw.


~~~ R
> die <- c(1, 2, 3, 4, 5, 6)
> die
[1] 1 2 3 4 5 6
> is.vector(die)
[1] TRUE
> five <- 5
> five
[1] 5
> is.vector(five)
[1] TRUE
> length(five)
[1] 1
> length(die)
[1] 6
> int <- 1L
> text <- "ace"
> int <- c(1L, 5L)
> text <- c("ace", "hearts")
> sum(int)
[1] 6
> sum(text)
Error in sum(text) : invalid 'type' (character) of argument
> typeof(die)
[1] "double"
> typeof(int)
[1] "integer"
> sqrt(2)^2 - 2
[1] 4.440892e-16
> text <- c("hello", "world")
> text
[1] "hello" "world"
> typeof(text)
[1] "character"
> typeof("Hello")
[1] "character"
> 3 > 4
[1] FALSE
> logic <- c(TRUE, FALSE, TRUE)
> 
> logic
[1]  TRUE FALSE  TRUE
> typeof(logic)
[1] "logical"
> typeof(F)
[1] "logical"
> comp <- c(1 + 1i, 1 + 2i, 1 + 3i)
> comp
[1] 1+1i 1+2i 1+3i
> typeof(comp)
[1] "complex"
> raw(3)
[1] 00 00 00
> typeof(raw(3))
[1] "raw"
> hand <- c("ace", "king", "queen", "jack", "ten")
> hand
[1] "ace"   "king"  "queen" "jack"  "ten"  
> typeof(hand)
[1] "character"
> 
~~~

Pretty straightforward stuff here, nothing too out of the ordinary. I'm not sure if it's annoying that strings are not a basic class. On one hand it's probably easy to manipulate those vectors. On the other, it's probably annoying to do some operations. It looks like the next part is about attributes, names, and arrays.

~~~ R
> names(die)
NULL
> names(die) <- c("one", "two", "three", "four", "five", "six")
> names(die)
[1] "one"   "two"   "three" "four"  "five"  "six"  
> attributes(die)
$names
[1] "one"   "two"   "three" "four"  "five"  "six"  

> die$names
Error in die$names : $ operator is invalid for atomic vectors
> die
  one   two three  four  five   six 
    1     2     3     4     5     6 
> die + 1
  one   two three  four  five   six 
    2     3     4     5     6     7 
> names(die) <- NULL
> die
[1] 1 2 3 4 5 6
> dim(die)
NULL
> dim(die) <- c(2, 3)
> die
     [,1] [,2] [,3]
[1,]    1    3    5
[2,]    2    4    6
> dim(die) <- c(3, 2)
> die
     [,1] [,2]
[1,]    1    4
[2,]    2    5
[3,]    3    6
> dim(die) <- c(1, 2, 3)
> die
, , 1

     [,1] [,2]
[1,]    1    2

, , 2

     [,1] [,2]
[1,]    3    4

, , 3

     [,1] [,2]
[1,]    5    6

> 
~~~

Okay, so this is kinda weird metaclass stuff. Basically, names are a way to index vectors. Attributes are pretty cool, I guess. It's kind of like the help thing I learned earlier. Dimensions are weird, because it's like names but a little bit more advanced way to index. Next part is matrices, arrays, and classes.

~~~ R
> m <- matrix(die, nrow = 2)
> m
     [,1] [,2] [,3]
[1,]    1    3    5
[2,]    2    4    6
> m <- matrix(die, nrow = 2, byrow = T)
> m
     [,1] [,2] [,3]
[1,]    1    2    3
[2,]    4    5    6
> ar <- array(c(11:14, 21:24, 31:34), dim = c(2, 2, 3))
> ar
, , 1

     [,1] [,2]
[1,]   11   13
[2,]   12   14

, , 2

     [,1] [,2]
[1,]   21   23
[2,]   22   24

, , 3

     [,1] [,2]
[1,]   31   33
[2,]   32   34

> cards <- matrix(c("ace", "spades", "king", "spades", "queen", "spades", "jack", "spades", "ten", "spades"), ncol = 2)
> cards
     [,1]     [,2]    
[1,] "ace"    "spades"
[2,] "spades" "jack"  
[3,] "king"   "spades"
[4,] "spades" "ten"   
[5,] "queen"  "spades"
> cards <- matrix(c("ace", "spades", "king", "spades", "queen", "spades", "jack", "spades", "ten", "spades"), ncol = 2, byrow = T)
> cards
     [,1]    [,2]    
[1,] "ace"   "spades"
[2,] "king"  "spades"
[3,] "queen" "spades"
[4,] "jack"  "spades"
[5,] "ten"   "spades"
> hand1 <- c("ace", "king", "queen", "jack", "ten", "spades", "spades", "spades", "spades", "spades")
> length(hand1)
[1] 10
> matrix(hand1, nrow = 5)
     [,1]    [,2]    
[1,] "ace"   "spades"
[2,] "king"  "spades"
[3,] "queen" "spades"
[4,] "jack"  "spades"
[5,] "ten"   "spades"
> matrix(hand1, ncol = 2)
     [,1]    [,2]    
[1,] "ace"   "spades"
[2,] "king"  "spades"
[3,] "queen" "spades"
[4,] "jack"  "spades"
[5,] "ten"   "spades"
> dim(hand1) <- c(5, 2)
> hand1
     [,1]    [,2]    
[1,] "ace"   "spades"
[2,] "king"  "spades"
[3,] "queen" "spades"
[4,] "jack"  "spades"
[5,] "ten"   "spades"
> dim(die) <- c(2, 3)
> typeof(die)
[1] "double"
> class(die)
[1] "matrix"
> attributes(die)
$dim
[1] 2 3

> class("Hello")
[1] "character"
> class(5)
[1] "numeric"
> 
~~~


So the matrices and arrays are very straightforward. Again, annoying that matrix is seperate from array. Matrix should really just be a multidimensional array, not a different namespace. Class is similar to typeof, however, classes describe the abstract behavior. I'd also say that it's both a blessing and a curse that you can accomplish one task in a bunch of different ways. The next part is more data types, and factors.

~~~ R
> now <- Sys.time()
> now
[1] "2017-01-06 22:36:38 EST"
> typeof(now)
[1] "double"
> class(now)
[1] "POSIXct" "POSIXt" 
> unclass(now)
[1] 1483760199
> mil <- 1000000
> mil
[1] 1e+06
> class(mil) <- class(now)
> mil
[1] "1970-01-12 08:46:40 EST"
> gender <- factor(c("male", "female", "female", "male"))
> gender
[1] male   female female male  
Levels: female male
> typeof(gender)
[1] "integer"
> attributes(gender)
$levels
[1] "female" "male"  

$class
[1] "factor"

> unclass(gender)
[1] 2 1 1 2
attr(,"levels")
[1] "female" "male"  
> as.character(gender)
[1] "male"   "female" "female" "male"  
> card <- c("ace", "hearts", 1)
> card
[1] "ace"    "hearts" "1"     
> sum(c(T, T, F, F))
[1] 2
> as.character(1)
[1] "1"
> as.logical(1)
[1] TRUE
> as.numeric(F)
[1] 0
> list1 <- list(100:130, "R", list(TRUE, FALSE))
> list1
[[1]]
 [1] 100 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118
[20] 119 120 121 122 123 124 125 126 127 128 129 130

[[2]]
[1] "R"

[[3]]
[[3]][[1]]
[1] TRUE

[[3]][[2]]
[1] FALSE


> list1[3]
[[1]]
[[1]][[1]]
[1] TRUE

[[1]][[2]]
[1] FALSE


> card <- list("ace", "hearts", 1)
> card
[[1]]
[1] "ace"

[[2]]
[1] "hearts"

[[3]]
[1] 1

> card[1][1]
[[1]]
[1] "ace"

> 
~~~

So date times are super easy, and it's really cool (but also VERY unsafe) that you can set the class for the time. I'm really not understanding the point of all these different constructors. I mean, why have arrays and lists AND matrices??? R's coercion makes sense which is good, because few other things do. T -> 1, F -> 0, and so forth. Let's see how many more unneccesary data types there are.


~~~ R
> df <- data.frame(face = c("ace", "two", "six"), suit = c("clubs", "clubs", "clubs"), value = c(1, 2, 3))
> df
  face  suit value
1  ace clubs     1
2  two clubs     2
3  six clubs     3
> typeof(df)
[1] "list"
> class(df)
[1] "data.frame"
> str(df)
'data.frame':	3 obs. of  3 variables:
 $ face : Factor w/ 3 levels "ace","six","two": 1 3 2
 $ suit : Factor w/ 1 level "clubs": 1 1 1
 $ value: num  1 2 3
> 
~~~

So the book says, **"data frames are the two-dimensional version of a list. They are far and away the most useful storage structure for data analysis."** THEN WHY THE HELL DO WE NEED ALL THESE OTHER THINGS?! I like data frames, the book says they're like a better version of Excel spreadsheets. By the looks of it, it takes all the great data types previously mentioned, and smashes them into one. I have a feeling I'm only going to be using these. Next part is all about loading CSVs, another super useful task.

~~~ R
> deck <- read.table("/Users/jea/Documents/Code/R-lang/deck.csv", header=TRUE, sep = ",")
> head(deck)
   face   suit value
1  king spades    13
2 queen spades    12
3  jack spades    11
4   ten spades    10
5  nine spades     9
6 eight spades     8
> write.csv(deck, file="cards.csv", row.names = FALSE)
> getwd()
[1] "/Users/jea/Library/Application Support/Sublime Text 3/Packages"
~~~

It's great how easy it is to import and work with CSVs, that'll definetly make life easier. At least R has great built in functions, otherwise I'd be dreading this so much more. Okay well that's all for this chapter, next chapter is "R Notation", whatever they mean by that.




