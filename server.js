"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

//Database Connection
mongoose
  .connect(
    process.env.DB_URI || "mongodb://localhost:27017/exercise-track",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to Db...")
  )
  .catch((err) => console.log("Could not Connect to Db due to: " + err));

// Cors Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static Folder
app.use(express.static("public"));

// Set up View-render engine[pug]
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index");
});

// Handle Not found Middleware
app.use((req, res, next) => {
  return next({ status: 404, message: "Page not Found" });
});

app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || "Internal Server Error";
  }
  res.status(errCode).type("txt").send(errMessage);
});

app.listen(port, () => {
  console.log(`App Listening on port: ${port}`);
});
