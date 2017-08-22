---
layout: post
title: Firebase and Swift
date: 2017-08-22
excerpt: "Firebase and swift data modelling"
tags: [swift, code, firebase]
comments: true
hidden: false
project: Swift
categories:
- Swift Tutorial
---

Hello! Per request of a friendly reddit user, I'm going to be doing a quick tutorial on using firebase with swift and how to structure your data models. Before we do anything, just a quick disclaimer, this tutorial is in swift 3, which, even though my life would be made much easier had I used swift 4 (google codeable swift 4), is the current default.

Basic project setup:

* Single page application default in XCode
* Cocoapods to install Firebase

You'll be able to find the project's link at the end of this guide.

This app is going to be dumb simple:

* A list of items
* Click on item to view info or delete
* + button in the top corner to add one

The first piece of code for this pattern is a simple protocol:

~~~ swift
protocol FirebaseItem {
    var id: String { get set }
    var name: String { get set }
    func toJSON() -> [String: AnyObject]
    init(fromFirebaseItem: FIRDataSnapshot)
}
~~~

For the most part every firebase item we'll have will have an ID and a name. Very simply, every item we construct needs to be able to produce a JSON object, and must be able to be constructed from a firebase item.

Following Firebase's standards we're going to avoid nesting our data, and keep it very simple.

~~~ JSON
{
  "items" : {
    "first" : {
      "id" : "first",
      "name" : "Apple",
      "price" : 3
    },
    "second" : {
      "id" : "second",
      "name" : "Banana",
      "price" : 3
    }
  }
}
~~~

Now that that's working, let's setup the class that's going to get our data

~~~ swift
class FirebaseInitialization {
    private var childRef: FIRDatabaseReference!
    private var items: [FirebaseItem] = []
    
    init() {
        let ref = FIRDatabase.database().reference()
        childRef = ref.child("items")
        
        let addFunc = { (data:FIRDataSnapshot) in
            self.items.append(GroceryItem(fromFirebaseItem: data))
        }
        let removeFunc = { (data: FIRDataSnapshot) in
            let index = self.items.index(where: { (item) -> Bool in
                item.id == data.value(forKey: "id") as! String
            })
            self.items.remove(at: index!)
        }
        childRef.observe(FIRDataEventType.childAdded, with: addFunc)
        childRef.observe(FIRDataEventType.childRemoved, with: removeFunc)
    }
    
    func getItems() -> [FirebaseItem] {
        return items
    }
}
~~~

Again, very simple: we connect to the database and setup the things that will automatically add and remove from our internal list. Finally let's look at our UITableViewController

~~~ swift

class GroceryListTableViewController: UITableViewController {
    
    var firebase: FirebaseInitialization?
    var items: [FirebaseItem]?
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        firebase = FirebaseInitialization(delegate: self)
        items = firebase!.getItems()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return items!.count
    }

    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "groceryItem", for: indexPath)
        cell.textLabel?.text = items![indexPath.row].name
        return cell
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        print(self.items?[indexPath.row])
        tableView.deselectRow(at: indexPath, animated: true)
    }

}
~~~

Now we initialize our firebase class, and set the list of items. What's very important is that we reload our data when we get new data. With Async behavior this step is very important.

~~~ swift
protocol FirebaseTableDelegate {
    func reloadData()
}
~~~

It's very easy to do this with the delegate pattern.

~~~ swift
class FirebaseInitialization {
    private var childRef: FIRDatabaseReference!
    private var items: [FirebaseItem] = []
    private let delegate: FirebaseTableDelegate
    
    init(delegate: FirebaseTableDelegate) {
        self.delegate = delegate
        let ref = FIRDatabase.database().reference()
        childRef = ref.child("items")
        
        let addFunc = { (data:FIRDataSnapshot) in
            self.items.append(GroceryItem(fromFirebaseItem: data))
            delegate.reloadData()
        }
        let removeFunc = { (data: FIRDataSnapshot) in
            let index = self.items.index(where: { (item) -> Bool in
                item.id == data.value(forKey: "id") as! String
            })
            self.items.remove(at: index!)
            delegate.reloadData()
        }
        childRef.observe(FIRDataEventType.childAdded, with: addFunc)
        childRef.observe(FIRDataEventType.childRemoved, with: removeFunc)
    }
    
    func getItems() -> [FirebaseItem] {
        return items
    }
}
~~~


and finally:

~~~ swift
extension GroceryListTableViewController: FirebaseTableDelegate {
    func reloadData() {
        items = firebase?.getItems()
        self.tableView.reloadData()
    }
}
~~~

Now automatically, every time an item is added or removed from our database the tableview will automatically reload. For a small application like this, this pattern is perfect; very extendable and very easy to understand. Now let's see how easy it is to add a new item.

First, in our table view controller

~~~ swift
    @IBAction func addItem(_ sender: Any) {
        let alert = UIAlertController(title: "Add Item", message: "Add an item to grocery list", preferredStyle: .alert)
        
        alert.addTextField { (textField) in
            textField.placeholder = "Name"
        }
        
        alert.addTextField { (textField) in
            textField.placeholder = "Price"
            textField.keyboardType = .decimalPad
        }
        alert.addAction(UIAlertAction(title: "Add", style: .default, handler: { [weak alert] (_) in
            let nameTextField = alert?.textFields![0]
            let priceTextField = alert?.textFields![1]
            let price = Double((priceTextField?.text)!)
            let uuid = UUID().uuidString
            let item = GroceryItem(id: uuid, name: (nameTextField?.text)!, price: price!)
            self.firebase?.addItem(item: item)
            
        }))
        alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: { (action) in
            print("cancel")
        }))
        present(alert, animated: true) { 
            print("done")
        }
    }
~~~

And lastly in FirebaseInitialization

~~~ swift
    func addItem(item: FirebaseItem) {
        childRef.child(item.id).setValue(item.toJSON())
    }
~~~


As you can see it's incredibely easy to implement this if you wanted to create a new class. What's also useful is that there are no strong ties to firebase from the table view. Please let me know what you think on reddit!

UPDATE

code to remove items: 

In our FirebaseInitialization class

~~~ swift
let removeFunc = { (data: FIRDataSnapshot) in
            let index = self.items.index(where: { (item) -> Bool in
                let properties = data.value as? NSDictionary
                return item.id == properties!.value(forKey: "id") as! String
            })
            self.items.remove(at: index!)
            delegate.reloadData()
        }
~~~

~~~ swift
func removeItem(id: String) {
    childRef.child(id).removeValue()
}
~~~

And in our UITableViewController

~~~ swift

override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
    if editingStyle == .delete {
        let groceryItem = items?[indexPath.row]
        self.firebase?.removeItem(id: (groceryItem?.id)!)
    }
}
~~~

As you can see adding functionality is quite simple.



[github](https://github.com/jaronoff97/FirebasePlayground/tree/data_modeling)


















