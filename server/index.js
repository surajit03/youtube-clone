const connectToMongo = require('./db');
const express = require ('express');
const dotenv = require("dotenv");
const userRoutes = require("./router/user.js");
const videoRoutes = require("./router/videos.js");
const commentRoutes = require("./router/comment.js");
const authRoutes = require("./router/auth.js");
const cookieParser = require('cookie-parser');
const { request } = require('express');

connectToMongo();
const app = express();
const port =5000

// middelwer
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth',require('./router/auth.js'))
app.use('/api/user',require('./router/user.js'))
app.use('/api/videos',require('./router/videos'))
app.use('/api/comment',require('./router/comment.js'))
app.use('/api/gpt',require('./router/gpt.js'))

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });
  
  app.listen(port,()=>{
    console.log(`app listening at http://localhost:3000`);
   })