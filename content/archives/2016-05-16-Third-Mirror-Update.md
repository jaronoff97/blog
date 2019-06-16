---
template: "archive"
title: Third Mirror Update
date: 2016-05-16
description: "OpenCV installed."
tags: [post, update]
comments: true
draft: false
project: Mirror
category: Mirror
---
## Third Mirror Update

Hello! This is my third post involving my smart mirror project!


All the parts came in last week, and I spent the weekend setting up my raspberry pi with openCV, so that I could do facial recognition. 

Using a bunch of tutorials online, I succesfully installed openCV 3 on my Raspberry Pi 3 Model B+ for python 2.7 AND python 3 [^1]

[^1]: http://www.pyimagesearch.com/2016/04/18/install-guide-raspberry-pi-3-raspbian-jessie-opencv-3/

After openCV was done, I turned my raspberry pi into a git server so I could work on the code on my computer. 

First I made a new bash user named **'git'**

~~~ bash
sudo adduser git
~~~

I then gave git the neccesary **sudo** permissions to do a bunch of operations. Once complete I initialized a bare git repo and set it as the remote of my computer.

~~~ bash
mkdir mirror.git && cd mirror.git
git init --bare

~~~

~~~ bash
git remote add origin git@mirrorpi:/home/git/mirror.git
~~~

Once that was complete, I was set up and ready to go with git to make my mirror.