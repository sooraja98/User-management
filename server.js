const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const index = require("./routers/index");
const app = express();
const path = require('path');
const morgan = require('morgan');
const ejs = require('ejs');


mongoose.connect("mongodb://localhost:27017/Register");
var db = mongoose.connection;
db.on("error", () => {
  "connection error";
});
db.once("open", () => {
  console.log("connection succeeded");
});

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/",index);

app.listen(3000);
