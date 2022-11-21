//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
// const dateMod = require(__dirname + "/date.js")
const mongoose = require("mongoose");

const app = express()
//port change, node basics

const items = ["buy", "eat", "cook"]

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
    name: String
}

const Item = mongoose.model("Item", itemSchema);

const Item1 = new Item({
    name: "Welcome to todolist!"
})
const Item2 = new Item({
    name: "Click + to add item!"
})
const Item3 = new Item({
    name: "<-- Click here to toggle status!"
})

const defaultItems = [Item1, Item2, Item3];


app.get("/", function (req, res) {

    Item.find({}, (err, elements) => {
        if (elements.length === 0) {
            Item.insertMany(defaultItems, (err) => {
                if (err)
                    console.log("there's an error, " + err);
                else
                    console.log("Successfully logged to DB");
            })
            res.redirect("/")
        }else{
            res.render('index', { date: "Today", taskArr: elements });
        }
    })

})

app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const newItem = new Item({
        name: itemName
    })
    newItem.save()

    res.redirect("/");
})

app.listen(4000, function () {
    console.log("Server up");
})