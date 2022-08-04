const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// ! AVOID CORS =>set these 2 headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");

  next();
});


app.post('/api/posts', (req,res,next) => {
  const post = req.body;
  console.log(post)
  res.status(201).json({
    message: 'Post added!'
  });
})

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "gi2gi1bikboxw",
      title: "First server-side post",
      content: "This is coming from the server!",
    },
    {
      id: "aekjvnaodlvnald33",
      title: "Second server-side post",
      content: "This is coming from the server!!",
    },
    {
      id: "akjb35rbfso8",
      title: "Third server-side post",
      content: "This is coming from the server!!!",
    },
    {
      id: "sdjvno48tghn",
      title: "Fourth server-side post",
      content: "This is coming from the server!!!!",
    },
  ];

  // returning message + post
  res.status(200).json({
    message: "Post fetched succesfully",
    posts: posts,
  });
});

module.exports = app;
