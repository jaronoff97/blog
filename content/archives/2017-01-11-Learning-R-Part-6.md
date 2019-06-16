---
template: "archive"
title: Learning R Part 6
date: 2017-01-11
description: "What is this language"
tags: [R, code, sixth]
comments: true
draft: false
project: R
category: R Tutorial
---

### Learning R Part 6




Part 6. Oh god. This language. Let it be over. Well this is working with enviroments which will be useful for my data science classes. I'm gonna dive right in.

~~~ R
> library(pryr)
> parenvs(all = True)
Error: object 'True' not found
> parenvs(all = T)
   label                            name               
1  <environment: R_GlobalEnv>       ""                 
2  <environment: package:pryr>      "package:pryr"     
3  <environment: package:stats>     "package:stats"    
4  <environment: package:graphics>  "package:graphics" 
5  <environment: package:grDevices> "package:grDevices"
6  <environment: package:utils>     "package:utils"    
7  <environment: package:datasets>  "package:datasets" 
8  <environment: package:methods>   "package:methods"  
9  <environment: 0x7f9a81097d78>    "Autoloads"        
10 <environment: base>              ""                 
11 <environment: R_EmptyEnv>        ""                 
> as.environment("package:stats")
<environment: package:stats>
attr(,"name")
[1] "package:stats"
attr(,"path")
[1] "/usr/local/Cellar/r/3.3.2/R.framework/Versions/3.3/Resources/library/stats"
> globalenv()
<environment: R_GlobalEnv>
> baseenv()
<environment: base>
> emptyenv()
<environment: R_EmptyEnv>
> parent.env(emptyenv())
Error in parent.env(emptyenv()) : the empty environment has no parent
> parent.env(globalenv())
<environment: package:pryr>
attr(,"name")
[1] "package:pryr"
attr(,"path")
[1] "/usr/local/lib/R/3.3/site-library/pryr"
> ls(globalenv())
character(0)
> ls(baseenv())
(A BUNCH O THINGS)
> environment()
<environment: R_GlobalEnv>
> 
~~~

Okay so basically all these different environments are what variables we have access to. The next part is about adding variables to different enviroments.

~~~ R
> assign("new", "Hello Global", envir = globalenv())
> globalenv()$new
[1] "Hello Global"
> globalenv()
<environment: R_GlobalEnv>
> ls(globalenv())
[1] "new"
> show_env <- function(){
	list(ran.in = environment(),
	parent = parent.env(environment()),
	objects = ls.str(environment()))
	}
> show_env()
$ran.in
<environment: 0x7f9a871564d8>

$parent
<environment: R_GlobalEnv>

$objects

> show_env()
$ran.in
<environment: 0x7f9a871611c8>

$parent
<environment: R_GlobalEnv>

$objects

> 
~~~

So we can add variables to an environment, which is kinda cool. What's really annoying is that the enviromnment changes every time the function is called. It looks like it's gonna get more annoying.

~~~ R
>  show_env <- function(x = "something"){
  	list(ran.in = environment(),
  	parent = parent.env(environment()),
  	objects = ls.str(environment()))
  	}
> show_env()
$ran.in
<environment: 0x7f9a8722adb8>

$parent
<environment: R_GlobalEnv>

$objects
x :  chr "something"

> show_env(x="something else")
$ran.in
<environment: 0x7f9a86047778>

$parent
<environment: R_GlobalEnv>

$objects
x :  chr "something else"

> setup <- function(deck) {
  	DECK <- deck

  	DEAL <- function() {
  		card <- deck[1, ]
  		assign("deck", deck[-1. ], envir=globalenv())
  		card
  	}

  	SHUFFLE <- function() {
  		random <- sample(1:52, size=52)
  		assign("deck", DECK[random, ], envir= globalenv())
  	}

  	list(deal = DEAL, shuffle = SHUFFLE)
  }
> deck <- read.table("/Users/jea/Documents/Code/R-lang/deck.csv", header=TRUE, sep = ",")
> cards <- setup(deck)
> deal <- cards$deal
> shuffle <- cards$shuffle
> deal
function() {
card <- deck[1, ]
assign("deck", deck[-1. ], envir=globalenv())
card
}
<environment: 0x7f9a813e0698>
> shuffle
function() {
random <- sample(1:52, size=52)
assign("deck", DECK[random, ], envir= globalenv())
}
<environment: 0x7f9a813e0698>
> 
~~~

This is some cool environment stuff. An environment captures it's parameters and everything above it. R also has closures which can capture their environment as well. From their we can assign things from inside the environment to objects outside, and when we use a function like **shuffle**, it will affect **deal**. Well that wraps up this chapter. Next part is a new project about slot machines. I'm glad the language has closures, even though a lot of parts about enviroments are stupid (namely constantly changing environments).









