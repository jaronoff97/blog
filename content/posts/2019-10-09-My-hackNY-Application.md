---
template: "post"
title: My hackNY Application
date: 2019-10-09
description: "If you have any questions about the application or the fellowship, I'm very happy to help out!"
tags: [update, blog]
comments: true
draft: false
project: Updates
category: Updates
---

Hello! Hopefully my application from 2017 to hackNY will help in your application to hackNY!! The fellowship completely changed my life and I'm eternally grateful for the opportunity. If you have any questions about the application or the fellowship, I'm very happy to help out!!!!!

# Application

### Name
Jacob Aronoff

### School
Northeastern University

### Major
Computer Science

### Degree
Undergraduate

### Graduation Date
April 2021

### IRC Nickname
get_sw1fty

### Github Username
jaronoff97

### Twitter Handle
get_sw1fty

### LinkedIn Profile
https://www.linkedin.com/in/jaronoff97?trk=hp-identity-photo

### Personal Site
jaronoff.com

### Paste in a ~100 line sample of code you're proud of.
``` swift
//
// DataInstance.swift
// CoffeeForChange
//
// Created by Jacob Aronoff on 5/19/16.
// Copyright © 2016 Milton Academy. All rights reserved.
//

import Foundation
import Firebase

class DataInstance {

static let sharedInstance = DataInstance()
var user: User?
var rootRef = FIRDatabase.database().reference()
var menuRef: FIRDatabaseReference{
return rootRef.child("menu")
}
var userRef: FIRDatabaseReference{
return rootRef.child("users")
}
var orderRef: FIRDatabaseReference{
return rootRef.child("orders")
}
var configInstances:[ConfigureData] = [(MenuInstance.getInstance()),(UsersInstance.getInstance()),(OrdersInstance.getInstance())]

func getData(forInstance query:Instance)->(ConfigureData){
switch query{
case .menu:
return configInstances[0]
case .user:
return configInstances[1]
case .order:
return configInstances[2]
}
}


init(){
FIRAuth.auth()!.signInAnonymously() { (user, error) in
if let error = error {
print("Sign in failed:", error.localizedDescription)
} else {
print ("Signed in with uid:", user!.uid)
for (instance) in self.configInstances {
instance.config(instance.instanceType.getRef(), completion: {
print("Completed \(instance.instanceType)")
})
}
}
}
}
func setDelegate(_ delegate: FirebaseTableDelegate, instance: Instance) -> Void {
if configInstances[configInstances.index(where: {$0.instanceType == instance})!].tableDelegate == nil{
configInstances[configInstances.index(where: {$0.instanceType == instance})!].tableDelegate = delegate
configInstances[configInstances.index(where: {$0.instanceType == instance})!].reloadDelegateData()
}
}
}
//
// Protocols.swift
// CoffeeForChange
//
// Created by Jacob Aronoff on 5/19/16.
// Copyright © 2016 Milton Academy. All rights reserved.
//

import Foundation
import Firebase

protocol ConfigureData {
func config(_ database: FIRDatabaseReference, completion: @escaping () -> Void)
var instanceType: Instance { get }
func reloadDelegateData()
static func getInstance()->ConfigureData
var tableDelegate: FirebaseTableDelegate? { get set }
}
protocol FirebaseItem {
var id: String { get set }
var name: String { get set }
func toJSON()->[String:AnyObject]
}
protocol FirebaseItemDelegate {
var items: [FirebaseItem] { get set }
func itemFactory(_ rest: FIRDataSnapshot) -> FirebaseItem
}
protocol FirebaseTableDelegate {
func reloadData()
var items: [FirebaseItem] { get set }
}
```

### What language is the code written in?
Swift

### Tell us why you wrote this code and what it does.
I offered my services as an iOS programmer to an on campus non-profit coffee shop at my high school. They needed an app to track people who ordered and how much they paid because my school used their own version of credit cards. I didn't want to program my own backend because I had a limited window, so I decided to use Firebase for my application. The code I provided connects a view to a firebase datasource only once, so that whenever firebase updates, so does the view. Using Swift protocols and enumerations I was able to accomplish this easily and in a verbose way. Each instance adheres to the FirebaseItemDelegate protocol and the ConfigureData protocol. The code also checks whether or not a datasource has already been connected so that there is no duplicate references. Once each view is tied to a datasource, the application updates the view as soon as firebase is updated with no lag. If you want to see the rest of the code: https://github.com/jaronoff97/CoffeeForChange

### Please provide links and descriptions of two of your own best coding projects, in any language.
https://github.com/jaronoff97/mirrorpi
Mirrorpi was part of my senior project at Milton Academy. I wanted to make a smart mirror using a raspberry pi and coding it in python and openCV. Because of design concerns I had to make a smart table instead. That being said, I was able to program a couple features that I'm proud to show. For the project I made three separate main features. The first feature was a snapchat like augmented reality where it would overlay a dollar bill on a face it would see. I programmed the facial recognition using opencv and numpy, to make it work I had to research how facial recognition is done. I wanted to be able to switch between views using gesture recognition. Although there are libraries that do this already, I wanted to make it by myself. Like the facial recognition, I used opencv and numpy, however, this was a difficult task because I was doing this finger recognition with one 4 mp camera. After working for a couple weeks, I was able to get reliable finger recognition working. Finally, I made a random maze generator. This last part was the most fun because I had a lot of creative freedom to play around with my own random maze generation algorithm and the coloring of the maze. The final product was only the maze because the other two parts didn't work in the dark room where this was displayed. The maze was captivating nonetheless.

https://github.com/jaronoff97/Feedshare-Public
I was asked by another Northeastern member of NUHacks (a club I'm very active in) to make a new version of his successful app Feedshare. Feedshare is an app that allows college kids to find free food around campus. The previous creator's app was made with ionic as a concept. The app has grown to over 3000 users, and it was time for an end to end facelift. I decided to program the new version using React Native so that I wouldn't have to program two different versions. The app uses firebase as a backend to lighten my load. The project uses firebase, redux, flux, and native base to make a beautiful interface that works on both major OSes. (the app won't run because of multiple setup things I left out on purpose)

### Tell us about a time you built something awesome in code. How did you choose it? Why did you enjoy it?
In my junior year of high school, I took an advanced computer programming class. For my class’s exam, I chose to make a music player in Java. My teacher suggested I use Swing, however, I wanted to make a richer application so I used JavaFX. Despite having used Java for a couple of years, I felt as though this project was my real introduction to programming with it. Previously, I had been doing smaller assignments where I didn’t have to delve too deeply into the architecture; this project was the largest I had undertaken.
I pushed myself with this final project by breaking it into several sections: a music player, an equalizer, an importer, and playlists. I then made a schedule for each feature within each section. I decided it made the most sense to develop the music player first, then the importer, playlists, and equalizer last because I knew it was the most difficult part – I used Fast Fourier Transforms to get each signal to implement the equalizer. Finally, I added a method to adjust the given signal and thus change that level in the song. I loved diving into Java source code and applying the math I was learning in my pre-calculus class.
After I finished my first version, I was proud to show my work to my peers and discuss how different parts of my music player worked. A couple of months later for my final project in the class, I chose to optimize the entire project so it could run faster. Once I removed much of the lag from the first version, I added an Arduino LED matrix so that as you changed the equalizer, the matrix would show the changes. The application got faster at first, however, when I added in the new Arduino component, it got significantly slower. I loved running into roadblock after roadblock because after I finished an issue, I got an overwhelming sense of pride and accomplishment. That feeling still sticks with me whenever I program.

### Why is hackNY right for you?
HackNY excites me because I’ve always wanted to be a part of a community of programmers who have a mission to help the people around them. I created my high school’s programming club when I was a senior. I wanted this club to be a place where programmers could come together and bond. The club brought together people who had never programmed before as well as people who had been coding their whole life.

I’ve learned HackNY’s goal is to bring people together who share a love for programming and helping. HackNY interests me because I want to integrate community, social justice and computer science. This past semester I was an English tutor at the Burke high school in Dorchester, MA. I loved helping these students improve their English skills. While I’ve tutored programming in the past, I want to be able to use my programming skills to help others.
After reading about HackNY’s new social initiative, I thought more about the lack of social initiative taken by the biggest names in tech. This year, I saw many amazing projects announced - Jarvis by Mark Zuckerberg, Mars habitat by Elon Musk, and HoloLens by Microsoft. I kept thinking about how these innovators could use their skills to help others.

I’m excited to make social change as part of hackNY. By meeting different people in the program, I’ll get to learn more about the world beyond just my view. To make a real difference, it’s important to hear many different voices and HackNY will put me in a community with many different voices.

### Tell us about what you hope to learn this summer.
I’ve always been interested in how to make an effective backend that is extensible and this summer I hope to learn more about backend development. This year, I experimented with systems and principles to learn more about designing a backend. I architected a backend in Python using many flask microservices for different tasks. I ran into many problems with Docker to make each of the services work together. I hope to learn more from on the job experience how to orchestrate such systems. I’ve used Jira and Bitbucket before, but I have yet to do agile development or be in a sprint – and would like to find an opportunity to work on them this summer.
In addition to being exposed to technical skills, I want work at an innovative company to learn about their development practices and management strategies. I worked at Bitsight Technologies in Boston – a fast growing cyber security startup - for the past two summers and loved it. My work from last year was accepted into production and helped save many hours of other Bitsight employees time. This summer I would like to be part of a new environment so I can learn more about ways companies work efficiently and effectively. Bitsight is a mid-sized startup with about 50 engineers at their Cambridge headquarters. I want to experience something different, maybe being part of a 10 person team or a 100 person team. I’m not sure which size I would prefer, but I think It’s important to experience a wide range of environments. Eventually I want to start my own company, and I feel that to run my company well, I need to have a variety of experiences.

### Is there a particular technology or industry you're currently interested in? How come? Where do you see it heading in the future?
I’m very interested in the future of Swift Web Frameworks. Swift is an open source language developed by Apple - made to replace Apple’s previous development language: Objective C. Having come from the messy syntax and bad concurrency of Objective-C, Swift was a godsend. The language has an amazing type system, great extensibility, and fun syntactic sugar.

Recently, the Swift language maintainers have set goals to make the language more useful for backends. There are many Swift backend options already; Kitura (made by IBM), perfect, vapor, etc. For the past couple of months, I’ve been playing around with multiple of these frameworks. It’s really easy to make extendable systems with Swift, and the benchmarks were noticeably faster than some other frameworks. Given all this speed and potential, Swift Web Frameworks still lack some important features.

Swift still lacks rich database APIs, making it difficult to do complex queries, proper database design, and overall reliability. SQLAlchemy, in Python, allows backend developers to do what Swift can’t. SQLAlchemy provides a way to construct databases using objects to models tables in SQL. While language maintainers work to make Swift faster for the web, I foresee that third party developers will be working hard to make rich APIs so that Swift can be as useful as Python. I see Swift eventually becoming one of the most popular languages. Apple has made a really big effort to teach the language to kids through applications on iOS. I’m glad to see that such an influential company is actually attempting to make programming part of a child’s literacy. Apple has also partnered with IBM to help make Swift an enterprise language. Combining the efforts being made in education and enterprise, Swift has a lot of potential to become the main language used in a company’s stack.

### Discuss your technical skills/proficiencies/languages and experience
In 7th grade, I took a summer class where I learned C++. Although the class was extremely rudimentary, I began to understand the basics of programming. I tried to teach myself Javascript and HTML in middle school, however, I couldn’t find any good resources to help me. When I got to high school, I wanted to be immersed in programming, the issue was, there wasn’t a vast number of resources to learn from. I was able to start taking Java programming classes sophomore year, however, there was no follow up; no way of getting help or helping others. When I started taking programming during my sophomore year, I immediately wanted to help others around me. Throughout junior year, I sharpened my Java skills and learned how to use JavaFX.
In the summer after my junior year, I took a job a software engineering intern at Bitsight Technologies in Cambridge, MA. While there, I was tasked with automating different services, collecting better analytics, and data mining for the product team. Working at Bitsight made me proficient in Python and Javascript. I also gained a much deeper knowledge of software engineering principles and better development practices. I took a quick break from Bitsight during which I learned Objective C and Swift at a Columbia University summer program.
In my senior year, I took what I had learned over the summer back to high school where I began my schools programming club. I started programming club with the hope that I would start a community of programmers where everyone could share their passions. That year, I took two programming classes where I learned about artificial intelligence, working in a team, and app development.
After graduating from high school, I went back to work at Bitsight where I was trusted to take on a more advanced role. I was tasked with making and maintaining multiple microservices for automating different customer service jobs and front-facing user experiences. By the end of the summer I was very proficient in microservice architecture, advanced REST APIs, Python, and testing suites.
During my first semester of college, I worked on an app called “Feedshare”, the original creator had written the app in ionic, and wanted to publish a new version. I began writing a new, cross-platform version in React Native. I handled all facets of the app, and then I brought on one of my friends to work on the app’s design. By the end of the project, I felt comfortable with Promises, React Native, NodeJS and Firebase.

Starting this year, in an initiative led by our alumNY and reflecting their community values, all 2017 hackNY Fellows will participate in a project which promotes positive social impact, especially around increasing diversity and inclusivity in tech. Tell us about social good initiatives that you are excited about or problems you would like to see solved by social impact projects, why they are important to you, and what you would hope to accomplish with social good as a part of hackNY and beyond.
I’ve been a very active tutor for the past four years in several subjects. I think tutoring is an amazing way to help the community. When I was in high school, I was able to see the huge impact one tutor can have on a group of people. Tutoring became both an integral part of programming at my school and of my persona. My teacher covered more material and students felt more confident. Senior year, I went into eight programming classes to help students and teach different topics. It was my and my teacher’s goal to create an environment where students first instinct was to solve a problem by themselves and their second instinct was to ask for help. At the end of this cycle, we hoped a student would then pay it forward and help their peers.
During my first semester at Northeastern, I tutored high school students in Dorchester, MA. Many of these students came from foreign countries; others had only taken a couple of English classes. In each session, I got to connect with many students and learn about their life stories. At my second tutoring session, I met a kid named Alex. Alex was a lighthearted, intelligent student who dreamt of life after school. He was in the midst of writing his college essays, however, he was struggling. When I first met with him, I saw that he didn’t have much on his paper. Together we fleshed out a general outline for his essay. When tutoring Alex again, I noticed an immediate difference in his writing and I was happy to see that his essay was complete.

As a part of HackNY, I want to lead a new tutoring initiative in the programming community. I think it would be great if members of HackNY could dedicate time to tutoring high school students. As any programmer can tell you, programming is a really powerful tool of expression and creativity. As part of the NYC programming community, we should help our community around us.

### When you're not coding, what do you like to do?
When I’m not programming, I enjoy photography, skiing, and hiking. I’ve been taking photographs recreationally for eight years, and professionally for three. When I was young I would always take my dad’s camera on vacations and play around with different lighting wherever we went. When I was in Italy with my family, I took the camera from my dad, and as I walked around the city I took pictures of everything that looked interesting to me. I loved the architecture in Rome with beautiful facades outside, and famous art inside. When I returned from our trip I began learning how to use Photoshop so I could edit the photos I took. When I got to high school, I took more photography classes. My junior year, I offered my services professionally to seniors at my high school to be a portrait photographer. In addition to taking portraits, I also photographed events at my high school, and parties. Now, I spend most of my time photographing Boston, which is especially beautiful in the winter.

I’ve been skiing practically my whole life, and I try to go as often as possible. My father grew up in Vermont and we spend a lot of time there as a family. In high school I raced on the ski team and I really enjoy being out in the elements. I find skiing is a great way to spend quality time with friends and family.

I get the same enjoyment from hiking that I get from skiing. I went on many family hikes when I was young, and I would always be at the front of the pack. I still love that feeling and go on hikes year-round – and have taken friends and co-workers to my favorite spots around New England.

### Any free text you'd like us to add when describing you to proposed host startups?
I'm from Newton, Massachusetts and have been in the Boston area for most of my life. I went to Milton Academy where I helped grow the schools programming department from 40 people to 120 people (in a school of 800). I was instrumental in the founding of the schools programming club and tutoring system. I currently attend Northeastern University where I study Computer Science. I'm very interested in tutoring, entrepreneurship, and programming (of course!) I'm part of Northeastern's NUHacks club whose mission is to help student make cool things for the purpose of making cool things (a mission near and dear to my heart.) I was recently elected a NUHacks board member.
