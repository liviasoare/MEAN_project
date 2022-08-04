const express = require("express");

const app = express();

app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "gi2gi1bikboxw",
      title: "First server-side post",
      content: "This is coming from the server",
    },
  ];
  res.json();
});

module.exports = app;
