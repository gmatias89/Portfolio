require("dotenv").config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD
    }
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("home");
});

/*-------------------------------------------------------------------------------------------------*/

app.post("/contacto", function (req, res) {



    var mailOptions = {
        from: process.env.EMAILUSER,
        to: 'gmatias89@hotmail.com',
        subject: "Mensaje de Portfolio",
        text: (req.body.email + "   " + req.body.mensaje)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.redirect("/");
        } else {
            console.log('Email sent: ' + info.response);
            console.log(mailOptions.text);
            res.redirect("/");
        }
    });
});

let port = process.env.PORT;
if (port == "" || port == null) {
    port = 3000;

}

app.listen(port, function () {
    console.log("Server running on port 3000");

});