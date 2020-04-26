const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const movieRoutes = require("./routes/movie");
const postsRoutes = require("./routes/posts");
 const userRoutes = require("./routes/users");
 const path=require('path');
//  const { secret } = require('./config');



const app = express();


 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false}));
 app.use(express.static(path.join(__dirname +'/../build/')));
 app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname+ '/../build/index.html'));
});

// mongoose
//   .connect("mongodb://localhost:27017/local")
//   .then(() => {
//     console.log("Connected to database!");
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
  }).catch(()=>{
    console.log("Connection failed!");
  });
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

  app.use("/api/posts", postsRoutes);
  app.use("/api/users", userRoutes);
  // app.use("/api/movies",movieRoutes);
  module.exports = app;