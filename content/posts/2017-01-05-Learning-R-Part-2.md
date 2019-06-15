---
template: "post"
title: Learning R Part 2
date: 2017-01-05
description: "What is this language"
tags: [R, code, second]
comments: true
draft: false
project: R
category: R Tutorial
---

### Learning R Part 2

Part 2, here we go! This next part is about packages and help pages. This chapter is pretty short, and basically wraps up the dice 'project'. Now it's time to install the **qplot** function which is part of the **ggplot2** package. 


~~~ R
> install.packages("ggplot2")
(A BUNCH OF STUFF!!!!!)
> qplot
Error: object 'qplot' not found
> library("ggplot2")
> qplot
function (x, y = NULL, ..., data, facets = NULL, margins = FALSE, 
    geom = "auto", xlim = c(NA, NA), ylim = c(NA, NA), log = "", 
    main = NULL, xlab = deparse(substitute(x)), ylab = deparse(substitute(y)), 
    asp = NA, stat = NULL, position = NULL) 
{
    if (!missing(stat)) 
        warning("`stat` is deprecated", call. = FALSE)
    if (!missing(position)) 
        warning("`position` is deprecated", call. = FALSE)
    if (!is.character(geom)) 
        stop("`geom` must be a character vector", call. = FALSE)
    argnames <- names(as.list(match.call(expand.dots = FALSE)[-1]))
    arguments <- as.list(match.call()[-1])
    env <- parent.frame()
    aesthetics <- compact(arguments[.all_aesthetics])
    aesthetics <- aesthetics[!is.constant(aesthetics)]
    aes_names <- names(aesthetics)
    aesthetics <- rename_aes(aesthetics)
    class(aesthetics) <- "uneval"
    if (missing(data)) {
        data <- data.frame()
        facetvars <- all.vars(facets)
        facetvars <- facetvars[facetvars != "."]
        names(facetvars) <- facetvars
        facetsdf <- as.data.frame(mget(facetvars, envir = env))
        if (nrow(facetsdf)) 
            data <- facetsdf
    }
    if ("auto" %in% geom) {
        if ("sample" %in% aes_names) {
            geom[geom == "auto"] <- "qq"
        }
        else if (missing(y)) {
            x <- eval(aesthetics$x, data, env)
            if (is.discrete(x)) {
                geom[geom == "auto"] <- "bar"
            }
            else {
                geom[geom == "auto"] <- "histogram"
            }
            if (missing(ylab)) 
                ylab <- "count"
        }
        else {
            if (missing(x)) {
                aesthetics$x <- bquote(seq_along(.(y)), aesthetics)
            }
            geom[geom == "auto"] <- "point"
        }
    }
    p <- ggplot(data, aesthetics, environment = env)
    if (is.null(facets)) {
        p <- p + facet_null()
    }
    else if (is.formula(facets) && length(facets) == 2) {
        p <- p + facet_wrap(facets)
    }
    else {
        p <- p + facet_grid(facets = deparse(facets), margins = margins)
    }
    if (!is.null(main)) 
        p <- p + ggtitle(main)
    for (g in geom) {
        params <- arguments[setdiff(names(arguments), c(aes_names, 
            argnames))]
        params <- lapply(params, eval, parent.frame())
        p <- p + do.call(paste0("geom_", g), params)
    }
    logv <- function(var) var %in% strsplit(log, "")[[1]]
    if (logv("x")) 
        p <- p + scale_x_log10()
    if (logv("y")) 
        p <- p + scale_y_log10()
    if (!is.na(asp)) 
        p <- p + theme(aspect.ratio = asp)
    if (!missing(xlab)) 
        p <- p + xlab(xlab)
    if (!missing(ylab)) 
        p <- p + ylab(ylab)
    if (!missing(xlim)) 
        p <- p + xlim(xlim)
    if (!missing(ylim)) 
        p <- p + ylim(ylim)
    p
}
<environment: namespace:ggplot2>
> 
~~~


SO it takes a bunch of time to install **ggplot2**, but now that it's installed, let's see what it can do! 

~~~ R
> x <- c(-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1)
> x
 [1] -1.0 -0.8 -0.6 -0.4 -0.2  0.0  0.2  0.4  0.6  0.8  1.0
> y <- x^3
> qplot(x, y)
~~~

In this part, we make a basic array from -1 to 1, and then we cube the array. Now the last part is really cool, I qplot'ed **x** and **y**. After I ran that function, it opened up a new window and showed a plot. 


![qplot-1](http://jaronoff.com/assets/img/qplot/qplot-1.png)

That's pretty cool, I like the fact that you can easily make that. Now it looks like I'm going to be doing more qplot stuff.

~~~ R
> x <- c(1, 2, 2, 2, 3, 3)
> qplot(x, binwidth = 1)
> replicate(3, 1 + 1)
[1] 2 2 2
> roll <- function () {
+ die <- 1:6
+ dice <- sample(die, size=2, replace = TRUE)
+ sum(dice)
+ }
> replicate(10, roll())
 [1] 4 3 4 6 8 9 6 7 8 7
> rolls <- replicate(10000, roll())
> qplot(rolls, binwidth = 1)
> ?sqrt
~~~

This produced two images: 

![qplot-2](http://jaronoff.com/assets/img/qplot/qplot-2.png)
![qplot-3](http://jaronoff.com/assets/img/qplot/qplot-3.png)

I definetely see where this language is useful. The ability to make these pretty in depth images in a couple lines of code is pretty amazing. Also the line at the end is useful too, basically the **?** operator is a help function. Again, kinda cool that R is similar to bash with this sort of syntax.

~~~ R
> roll <- function() {
+ die <- 1:6
+ dice = sample(die, size = 2, replace = TRUE, prob = c(1/8, 1/8, 1/8, 1/8, 1/8, 3/8))
+ sum(dice)
+ }
> rolls <- replicate(10000, roll())
> qplot(rolls, binwidth = 1)
> 
~~~

![qplot-4](http://jaronoff.com/assets/img/qplot/qplot-4.png)

Finally, I learned a new part of the sample function, now I can assign probabilities. Okay so that completes chapter 2. Pretty uneventful, but I got to learn more about packages, probabilites, and graphs. Though I'm not enjoying R's type system, it's good that it has a bunch of useful built in features. In the next part I'm going to be designing a deck of cards that can be dealt, shuffled, and used.

