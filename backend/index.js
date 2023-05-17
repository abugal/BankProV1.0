//import express from "express"
//import cors from "cors"
//import mongoose from "mongoose"
const mongoose = require("mongoose");
const Router = require('./routes/routes')
//import Router from "./routes/routes.js"
const express = require("express");
const cors = require('cors');
const app = express()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/', Router)

//mongoose.connect("mongodb://localhost:27017/Forms-Practice")


//app.listen(8000, () => {
    //console.log("Server started on port 8000")
//})
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for a request in a certain port number.
    // through the use of the .env
    app.listen(process.env.PORT, () => {
      console.log("connect to MongoDB and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
