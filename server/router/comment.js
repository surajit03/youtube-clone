const express = require ("express");
const verifyToken =require("../verifyToken.js");
const createError =require("../error.js");
const Comment =require( "../models/Comment.js");
const Video =require("../models/Video.js");

const router = express.Router();

// Add a comment
router.post('/',verifyToken, async (req, res, next) => {
    const newComment = new Comment({ ...req.body, userId: req.user.id });
    try {
      const savedComment = await newComment.save();
      res.status(200).send(savedComment);
    } catch (err) {
      next(err);
    }
  });

// Delete a comment
router.delete('/:id',verifyToken, async (req, res, next) => {

    try {
      const comment = await Comment.findById(res.params.id);
      const video = await Video.findById(res.params.id);
      if (req.user.id === comment.userId || req.user.id === video.userId) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json("The comment has been deleted.");
      } else {
        return next(createError(403, "You can delete ony your comment!"));
      }
    } catch (err) {
      next(err);
    }
  });

// get a comment
router.get('/:videoId',verifyToken, async (req, res, next) => {

    try {
      const comments = await Comment.find({ videoId: req.params.videoId });
      res.status(200).json(comments);
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
