---
template: "archive"
title: DS 4100 Project Proposal
date: 2017-03-30
description: "Data Collection, Integration, and Analysis"
tags: [DS, R, review]
comments: true
draft: false
project: DS4100
category: DS 4100
---

### DS 4100 Project Proposal


For my project, I want to investigate Reddit. There's a lot of openly available data about reddit that I'll be able to scrape. Recently, there was a brief study posted on FiveThirtyEight doing what he called "Reddit Algebra", which was actually just a fancier way of explaining set operations.

[FiveThirtyEight Article](https://fivethirtyeight.com/features/dissecting-trumps-most-rabid-online-following/)



For the past couple of weeks in my weekly reviews, I've talked a lot about analyzing reddit data to generate predictions or statistics. What I want to do with this project, is take the basics of what the aformentioned person did, and go one step further. Here would be my process:

* Get large reddit data set (available on the web)
* Store it in MySQL (data is already in SQL format)
* Write GraphQL schema to connect code to DB
* Construct GQL queries given params
	* User inputs reddit username
	* GQL query gets the subreddits that user has commented on, and truncates it into a number for each subreddit
	* Get users who have commented the most on the places where the given user has also commented
	* Aggregate the subreddits the other users have also commented on, returning a list of suggested subreddits
	* I can also add in the ability to find subreddits like a given subreddit, listing other subreddits ordered by their %similarity


Stack:

* MySQL backend
* GraphQL middleware
* Node.js frontend


The end goal of my project will be the following: given a reddit username suggest other subreddits that user may like, or given a subreddit, give a list of subreddits similar. I would accomplish this using collaborative filtering.




