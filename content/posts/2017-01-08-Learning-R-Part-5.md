---
template: "post"
title: Learning R Part 5
date: 2017-01-08
description: "What is this language"
tags: [R, code, fifth]
comments: true
draft: false
project: R
category: R Tutorial
---

### Learning R Part 5

Part 5, modifying values in R. I'm betting this is going to be a contiuation of the same. It seems we're just going to combine setting values and indexing. 

~~~ R
> vec <- c(0, 0, 0, 0, 0, 0)
> vec
[1] 0 0 0 0 0 0
> vec[1]
[1] 0
> vec[1] <- 1000
> vec
[1] 1000    0    0    0    0    0
> vec[c(1, 3, 5)] <- c(1, 1, 1)
> vec
[1] 1 0 1 0 1 0
> vec[4:6] <- vec[4:6] + 1
> vec
[1] 1 0 1 1 2 1
> deck <- read.table("/Users/jea/Documents/Code/R-lang/deck.csv", header=TRUE, sep = ",")
> deck$new <- 1:52
> names(deck)
[1] "face"  "suit"  "value" "new"  
> deck$new <- NULL
> names(deck)
[1] "face"  "suit"  "value"
> deck$face == "ace"
 [1] FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
[13]  TRUE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
[25] FALSE  TRUE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
[37] FALSE FALSE  TRUE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
[49] FALSE FALSE FALSE  TRUE
> deck[deck$face == "ace"]
Error in `[.data.frame`(deck, deck$face == "ace") : 
  undefined columns selected
> deck[deck$face == "ace", ]
   face     suit value
13  ace   spades     1
26  ace    clubs     1
39  ace diamonds     1
52  ace   hearts     1
> deck[deck$face == "ace", ]$value <- c(14, 14, 14, 14)
> deck[deck$face == "ace", ]
   face     suit value
13  ace   spades    14
26  ace    clubs    14
39  ace diamonds    14
52  ace   hearts    14
>  
~~~

So the first part is pretty basic. We can access values, and put values in, given an index. the second half of this file was basically me just playing around with the idea of finding aces. I like how I can sort of make queries when I index. I like that I can get all the places where the face is **ace**. also, the values change in place, which means it's easy to requery the same values. It seems like the next part is more about logical operators.

~~~ R
> 5 > 6
[1] FALSE
> 6 > 5
[1] TRUE
> 5 >= 6
[1] FALSE
> 6 >= 5
[1] TRUE
> 5 == 5
[1] TRUE
> 6 == 5
[1] FALSE
> 5 != 6
[1] TRUE
> 5 %in% c(4, 5, 6)
[1] TRUE
> c(1, 2, 3, 4) %in% c(3, 4, 5)
[1] FALSE FALSE  TRUE  TRUE
> sum(deck$face == "ace")
[1] 4
> deck$value[deck$face == "ace"]
[1] 14 14 14 14
> T & F
[1] FALSE
> T && F
[1] FALSE
> xor(T, T)
[1] FALSE
> xor(T, F)
[1] TRUE
> !F
[1] TRUE
> any(T, F, T, F, T)
[1] TRUE
> all(T, T, T, T, F)
[1] FALSE
> deck[deck$face == "queen" & deck$suit == "spades", ]
   face   suit value
2 queen spades    12
~~~

So again, this is the usual stuff in programming languages. The %in% operator is interesting. I wish that the percents weren't put in the operator, because they just look kinda gross. It's cool that there's a built in **xor**, I mean it's easy to make one myself, but it's cool. Also, I like how I can just use these expressions to query these data frames. It seems the next part is all about missing information, that's not going to be good for all that I've experienced so far. 

~~~ R
> NA + 1
[1] NA
> NA == 1
[1] NA
> NA == NA
[1] NA
> NA <- 1
Error in NA <- 1 : invalid (do_set) left-hand side to assignment
> c(NA, 1:50)
 [1] NA  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
[26] 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49
[51] 50
> mean(c(NA, 1:50))
[1] NA
> mean(c(NA, 1:50), na.rm = T)
[1] 25.5
> is.na(NA)
[1] TRUE
> is.na(c(1, 2, 3, NA))
[1] FALSE FALSE FALSE  TRUE
> 
~~~

NA is so annoying and unneccesary. The fact I can't use **==** to check if something is NA is SOOOOOOOoooooo stupid. I'm not excited to be working with NA and NULL. The next chapter is all about enviroments, which looks like it just means working with folders and the rest of my computer.










