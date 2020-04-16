const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home");
});

let port = process.env.PORT;
if (port == "" || port == null) {
    port = 3000;

}

app.listen(port, function () {
    console.log("Server running on port 3000");

});