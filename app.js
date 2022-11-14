const express = require("express")
const bodyParser = require("body-parser")

const app = express()
var items = ["buy", "eat", "cook"]

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function (req, res) {

    var today = new Date()

    var options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    }

    var date = today.toLocaleDateString("hi-IN", options)

    res.render('index', {date: date, taskArr: items});
})

app.post("/", function(req, res){
    var item = req.body.newItem;
    items.push(item);

    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server up");
})