const mongoose = require( "mongoose");
const express =require( "express");
const User = require( "../models/User.js");
const bcrypt = require("bcryptjs");
const createError = require( "../error.js");
const jwt = require( "jsonwebtoken");
JWT="haa@app"


const router = express.Router();

router.post('/signup', async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
  
      await newUser.save();
      res.status(200).send("User has been created!");
    } catch (err) {
      next(err);
    }
    
  })
  


  router.post('/signin', async (req, res, next) => {

    try {
            const user = await User.findOne({ name: req.body.name });
            if (!user) return next(createError(404, "User not found!"));
        
            const isCorrect = await bcrypt.compare(req.body.password, user.password);
        
            if (!isCorrect) return next(createError(400, "Wrong Credentials!"));
        
            const token = jwt.sign({ id: user._id }, JWT);
            const { password, ...others } = user._doc;
        
            res
              .cookie("access_token", token, {
                httpOnly: true,
              })
              .status(200)
              .json(others );
          } catch (err) {
            next(err);
          }
  })


  // google ath

  router.post('/google', async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(user._doc);
      } else {
        const newUser = new User({
          ...req.body,
          fromGoogle: true,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json(savedUser._doc);
      }
    } catch (err) {
      next(err);
    }
  });
  
  
  module.exports = router;
  
  