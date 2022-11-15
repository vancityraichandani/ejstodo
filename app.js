//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")
const dateMod = require(__dirname + "/date.js")

const app = express()
const items = ["buy", "eat", "cook"]

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

app.get("/", function (req, res) {

    const date = dateMod.getDate()

    res.render('index', { date: date, taskArr: items });
})

app.post("/", function (req, res) {
    const item = req.body.newItem;
    items.push(item);

    res.redirect("/");
})

app.listen(3000, function () {
    console.log("Server up");
})