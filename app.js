import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';

import userRoutes from './routes/user.js';


import models, { connectDb } from './models/index.js';


// express app
const app = express();



  
connectDb().then(async () => {
    app.listen(3000, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });  

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/user", userRoutes);

app.get("/", (req, res, next)=>{
  return res.json({message : "hh"});

});

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

