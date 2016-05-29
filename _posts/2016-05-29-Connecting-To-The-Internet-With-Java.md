---
layout: post
title: Connecting to the internet with Java
date: 2016-05-29
excerpt: "We need three objects in order to properly connect."
tags: [post, java, URL]
comments: true
hidden: false
project: Java
---
## Connecting to the internet with Java

Hello and welcome to my first Java tutorial. This is going to be my only text-based Java tutorial, the others will be videos. In this tutorial we're going to go over how to make a URL request in Java. 



First we're going to make a class named FrameLayoutURLReader, this class will **extend** JFrame and __implement__ ActionListener. By inheriting from JFrame, we make this program an application whose layout will be swing/ frame based. By implementing actionlistener, we can attach listeners to buttons so that we can do something on a click. 

~~~ Java
public class FrameLayoutURLReader extends JFrame implements ActionListener {
	public static void main(String[] args){

}
public FrameLayoutURLReader(String title){
	super(title);	
}
public void actionPerformed(ActionEvent e){
	
}
}
~~~

In our **main** lets construct a new instance of a FrameLayoutURLReader.

~~~ Java
	public static void main(String[] args){
	FrameLayoutURLReader application = new FrameLayoutURLReader("Get URL");    // construct a new instance
      application.resize(600, 600);// resize the frame
      application.show();// show the frame
}
~~~

All we're doing here is making a new instance of itself, resizing it, and showing it. Now let's think about what we want this to look like. If we're thinking early 00's browser, it should just have a place to type a URL and a button to go to that URL. In the center we'll display whatever HTML that URL returns. It should look something like this:

----------------------------------
| Type a URL    |       GO       |
|--------------------------------|
|                                |
|                                |
|                                |
|                                |
|           HTML DATA            |
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
----------------------------------

So for our UI componenets we're going to need a JTextField so the user can input a URL, a JTextArea for us to display the response, a JButton for the user to press Go!, and for aesthetic purposes we're going to put our JTextArea inside of a JScrollPane, so that we can see all of the html. Here's what that looks like in code: 


~~~ Java
   public JTextField urlTextField = new JTextField("Enter a valid URL");//Text field for a URL
   public JTextArea urlTextArea = new JTextArea(400, 300);//Text area for our HTML Code
   public JScrollPane urlScrollTextArea = new JScrollPane(urlTextArea);//Make it so our text area can scroll
   public JButton go = new JButton("Go");//Make a button
~~~

So now we have to put these components in a layout, if we look back at our diagram: 

---------------------------------- <-- a BorderLayout with a North and Center
| Type a URL    |       GO       | <-- a (1,2) Gridlayout
|--------------------------------|
|                                |
|                                |
|                                |
|                                |
|           HTML DATA            | <-- a (1,1) Gridlayout
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
|                                |
----------------------------------

> The reason we have a (1,1) GridLayout for our center is so that our scrollpane takes up the entire space. 

We put the code for this in our constructor so that our layout is ready to go by the time we call **application.show**

~~~ Java
   public FrameLayoutURLReader( String title) {
      super(title);
      JPanel centerPanel = new JPanel();//Construct center panel
      JPanel northPanel = new JPanel();//Construct northern panel
      //START CENTER SETUP -------------
      centerPanel.setLayout(new GridLayout(1, 1));//Set layout of center pane to grid layout
      centerPanel.add(urlScrollTextArea);//add our scrollable panel to the center
      //END CENTER SETUP -------------
      //START NORTH SETUP -------------
      northPanel.setLayout(new GridLayout(1, 2));//Set layout for one column, two rows
      go.addActionListener(this);//add the action listener
      northPanel.add(urlTextField);//We want the text field to be on the left so we add it first
      northPanel.add(go);//add the go button
      //END NORTH SETUP -------------
      //Finaly put all the panels onto the Applet panel.
      this.setLayout(new BorderLayout());//We want it in a border layout
      this.add("Center", centerPanel);//Set centerpanel as the center
      this.add("North", northPanel);//Set northpanel as the north
   }
~~~

So now that we've made our layout and added our actionlistener to our button, we're ready to begin our URL parsing. First, let's make a method called **readURL** which will be called in our actionPerformed.

~~~ Java
public void  actionPerformed (ActionEvent e) {
      readURL();//This will be called when we press the go button
   }   // end of Action Performed

public void readURL(){
	
}
~~~

In order to connect to and read from a URL we need to construct three things. a __URL__, __InputStreamReader__, and __BufferedReader__. The URL's job is to point our program in the correct direction, the InputStreamReader's job is to open a connection to our URL, and finally our BufferedReader's job is to read from that connection. 

~~~ Java
public void readURL(){
	URL destinationURL = null;//Declare a new URL for our program to go
	InputStreamReader isr = null;//Declare a DataInputSteram which connects our program to the internet
	BufferedReader reader = null;//Make a reader which will read the HTML line by line
}
~~~

Now we do the real work of connecting and reading. First we initialize our three objects:

~~~ Java
try {
     destinationURL = new URL("http://" + urlTextField.getText());//Set the URL's location
     isr = new InputStreamReader(destinationURL.openStream());// open a stream to our URL and put the data in isr
     reader = new BufferedReader(isr);//Construct the reader to read from the input stream
  } catch (Exception e) {
     e.printStackTrace();//If any errors happen, print them out
  }
~~~

> It's important that this code is inside of a **try catch**, otherwise our code would not only not compile, but it would also crash if let's say the user has no internet connection

Now that we are ready to read data from our __**reader**__, we can make a String which will represent the line we're reading from. We want to read EVERYTHING from our reader, line by line. Because each URL will have a different amount of lines, it's best to use a while loop. Our condition is as long as line isn't null because once the reader is done, the method __readLine()__ will return **null**. Finally, inside our while loop, we want to add each line to the textarea which can be done using the method __urlTextArea.append__.

~~~ Java
public void readURL() {
   System.out.println("READURL");
   URL destinationURL = null;//Declare a new URL for our program to go
   InputStreamReader isr = null;//Declare a DataInputSteram which connects our program to the internet
   BufferedReader reader = null;//Make a reader which will read the HTML line by line
   try {
      destinationURL = new URL("http://" + urlTextField.getText());//Set the URL's location
      isr = new InputStreamReader(destinationURL.openStream());// open a stream to our URL and put the data in isr
      reader = new BufferedReader(isr);//Construct the reader to read from the input stream
      String line = "";//Make a blank string
      while (line != null) { //Read until line is null
         urlTextArea.append(line + "\n");//Add the line to our text area
         line = reader.readLine();//Read the next line
      }
   } catch (Exception e) {
      e.printStackTrace();//If any errors happen, print them out
   }
}
~~~

> the "\n" in our code means go to the next line, it's like our own version of System.out.println but instead of printing to the console, we're printing to the screen.

And that's it! Run the program and type in a test url, maybe __www.milton.edu__? For your homework, try showing only the lines that contain "href" so that what's displayed on the screen is a bunch of URLs. Next time we're going to go over parsing a different kind of text.



{% gist e588354aabb7a730933c3eb8bbf73886 %}