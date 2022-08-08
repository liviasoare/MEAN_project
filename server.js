// const http = require('http');
// const port = process.env.PORT || 3000;

// const app = require('./backend/app') //use the backend

// app.set('port', port) //setting the port
// const server = http.createServer(app); //creating the right server

// server.listen(port);

// * IMPORTS
const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
 

// * making sure the port we try to establish is a valid number
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};


// * checks what type of error occured 
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// * logging that we are listening to incoming requests
const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

// * setting up the port
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);


// * setting up the server, one for errors, one for listening
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
// * starting the server
server.listen(port);