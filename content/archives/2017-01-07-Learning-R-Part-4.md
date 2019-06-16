---
template: "archive"
title: Learning R Part 4
date: 2017-01-07
description: "What is this language"
tags: [R, code, fourth]
comments: true
draft: false
project: R
category: R Tutorial
---

### Learning R Part 4

Part 4, R notation. This part is about shuffling, dealing, and accesing cards. Okay so, the first part is selecting values. Before anything I need to load the deck again.

~~~ R
> deck[ , ]
(ALL THE CARDS)
> deck[1,1]
[1] king
Levels: ace eight five four jack king nine queen seven six ten three two
> deck[1, 1]
[1] king
Levels: ace eight five four jack king nine queen seven six ten three two
> deck[1, c(1, 2, 3)]
  face   suit value
1 king spades    13
> deck[1, 1:3]
  face   suit value
1 king spades    13
> deck[c(1, 1), 1:3]
    face   suit value
1   king spades    13
1.1 king spades    13
> deck [0, 1:3]
[1] face  suit  value
<0 rows> (or 0-length row.names)
> deck[1, 1:3, drop = F]
  face   suit value
1 king spades    13
> deck[1:2, 1:3, drop = F]
   face   suit value
1  king spades    13
2 queen spades    12
> deck[1:2, 1:3]
   face   suit value
1  king spades    13
2 queen spades    12
> deck[-(2:52), 1:3]
  face   suit value
1 king spades    13
> deck[1, ]
  face   suit value
1 king spades    13
> deck[1, c(T, T, F)]
  face   suit
1 king spades
> deck[1, c(T, T, T)]
  face   suit value
1 king spades    13
> deck[ , "value"]
 [1] 13 12 11 10  9  8  7  6  5  4  3  2  1 13 12 11 10  9  8  7  6  5  4  3  2
[26]  1 13 12 11 10  9  8  7  6  5  4  3  2  1 13 12 11 10  9  8  7  6  5  4  3
[51]  2  1
> 
~~~

So, indexing starts at 1. **NOOOOOOOOOOOoooooooooo**. So that's pretty annoying. As I've said multiple times, why are there a million ways to do one thing. I guess in this case that may be a good thing, because you can be pretty specific with your data frame accesing (in most of the other cases, it's just not that great.) The first value in the brackets represents the row, and the value(s) in the second represent the column(s). That selection methodology seems pretty useful.

~~~ R
> deal <- function(cards) {
+ cards[1, ]
+ }
> deal(deck)
  face   suit value
1 king spades    13
> random <- sample(1:52, size = 52)
> deck2 <- deck[random, ]
> deck2[1, ]
   face     suit value
30  ten diamonds    10
> shuffle <- function(cards){
+ random <- sample(1:52, size = 52)
+ cards[random, ]
+ }
> deal(shuffle(deck))
   face   suit value
49 four hearts     4
> deck$value
 [1] 13 12 11 10  9  8  7  6  5  4  3  2  1 13 12 11 10  9  8  7  6  5  4  3  2
[26]  1 13 12 11 10  9  8  7  6  5  4  3  2  1 13 12 11 10  9  8  7  6  5  4  3
[51]  2  1
> mean(deck$value)
[1] 7
> median(deck$value)
[1] 7
> lst = list(numbers = c(1, 2), logical = T, strings = c("a", "b", "c"))
> lst$numbers
[1] 1 2
> lst$strings
[1] "a" "b" "c"
> lst[1]
$numbers
[1] 1 2

> sum(lst[1])
Error in sum(lst[1]) : invalid 'type' (list) of argument
> sum(lst$numbers)
[1] 3
> lst[[1]]
[1] 1 2
> lst["numbers"]
$numbers
[1] 1 2

> 
~~~

Pretty easy to make a deal function, it said later I'm going to make a working one. Shuffling is kinda weird, doing the random sampling seems like a hacky way to accomplish random sequences. Maybe because I'm so used to having to make a switch function, and then running that through a list. Also, MORE WAYS to do the exact same thing. As I've said before, it's interesting to see how many syntactic sugar features develop but it'd be nice if there's one set way to do something. That's all for this chapter, the next one seems much of the same: basic operations; modifying values. 







