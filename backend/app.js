const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const postRoutes = require('./routes/posts');

const app = express();

// ! MongoDB details
// ! username: admin
// ! password: B8JVST5j4WSta5LE
mongoose
  .connect(
    "mongodb+srv://admin:B8JVST5j4WSta5LE@atlascluster.ranwmtu.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(() => {
    console.log("Connection failed.");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ! AVOID CORS =>set these 2 headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
