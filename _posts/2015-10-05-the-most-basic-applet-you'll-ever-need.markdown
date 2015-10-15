---
layout: post
title:  "The Most Basic Applet you'll ever need"
date:   2015-10-15 9:58:52
categories: Java Applet
---
You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight java linenoms %}
import java.applet.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;
public class BasicApplet extends Applet implements Runnable, MouseListener, KeyListener, MouseMotionListener
{
   public int worldx;
   public int worldy;
   public Rectangle rect;
   
   Graphics bufferGraphics; //Set up double buffer
   Image offscreen;
   Thread thread;//Sets up a Thread called thread

   public void init()
   {
      worldx=1400;//Sets the world size
      worldy=1000;//Sets the world size

      offscreen = createImage(worldx,worldy); //create a new image that's the size of the applet DOUBLE BUFFER SET UP
      bufferGraphics = offscreen.getGraphics(); //set bufferGraphics to the graphics of the offscreen image. DOUBLE BUFFER SET UP
   
      addKeyListener(this);//setup all the listeners
      addMouseListener(this);//setup all the listeners
      addMouseMotionListener(this);//setup all the listeners
      thread = new Thread(this);  //constructs a new thread
      thread.start();             //starts the thread
   }//init()
   
   public void paint(Graphics g) 
   {// paint() is used to display things on the screen
      setSize(worldx,worldy);
      bufferGraphics.clearRect(0,0,worldx,worldy); //clear the offscreen image
      bufferGraphics.setColor(Color.black);
      
      g.drawImage(offscreen,0,0,worldx,worldy,this);//Draw the screen
   }// paint()
   public void mouseDragged(MouseEvent e) {
   	
   }
   public void mouseMoved(MouseEvent e){
   
   }
   public void mousePressed(MouseEvent e) 
   {
   
   }
   public void mouseReleased(MouseEvent e) 
   {
   
   }
   public void mouseEntered(MouseEvent e) 
   {
      System.out.println("Mouse entered");
   }
   public void mouseExited(MouseEvent e) 
   {
      System.out.println("Mouse exited");
   }
   public void mouseClicked(MouseEvent e) 
   {
      System.out.println("Mouse clicked (# of clicks: "+ e.getClickCount() + ")");
      
   }
   public void keyPressed( KeyEvent event ) 
   {
      String keyin; // define a non‐public variable to hold the string representing the key input
      keyin = ""+event.getKeyText( event.getKeyCode()); 
      System.out.println("Key pressed "+keyin);
   }//keyPressed()
   public void keyReleased( KeyEvent event ) 
   {
      String keyin;
      keyin = ""+event.getKeyText( event.getKeyCode()); 
      System.out.println ("Key released: "+ keyin);
   }//keyReleased()
   public void keyTyped( KeyEvent event ) 
   {
      char keyin;
      keyin = event.getKeyChar(); //getKeyChar() returns the character of the printable key pressed. 
      System.out.println ("Key Typed: "+ keyin);
   }//keyTyped()
  
   public void update (Graphics g) 
   {
      paint(g); 
   }//Update the graphics
   public void run() 
   {
      while(true) // this thread loop forever and runs the paint method and then sleeps.
      {
         
         repaint();
         try {
            thread.sleep(50);
         }
         catch (Exception e){ }
      }//while
   }// run()

}//Applet

{% endhighlight %}

Check out the [Jekyll docs][jekyll] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll’s dedicated Help repository][jekyll-help].

[jekyll]:      http://jekyllrb.com
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-help]: https://github.com/jekyll/jekyll-help
