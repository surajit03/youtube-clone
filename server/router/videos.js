const express = require("express");
const verifyToken = require("../verifyToken.js");
const User = require("../models/User.js");
const Video = require("../models/Video.js");
const createError = require("../error.js");

const router = express.Router();

// add video

router.post('/', verifyToken, async (req, res, next) => {

    const newVideo = new Video({ userId: req.user.id, ...req.body });
    try {
        const savedVideo = await newVideo.save();
        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
});


// updet video
router.put('/:id', verifyToken, async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));
        if (req.user.id === video.userId) {
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedVideo);
        } else {
            return next(createError(403, "You can update only your video!"));
        }
    } catch (err) {
        next(err);
    }
});

// Delete Video
// export const deleteVideo = async (req, res, next) => {
router.put('/:id', verifyToken, async (req, res, next) => {

    try {
      const video = await Video.findById(req.params.id);
      if (!video) return next(createError(404, "Video not found!"));
      if (req.user.id === video.userId) {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("The video has been deleted.");
      } else {
        return next(createError(403, "You can delete only your video!"));
      }
    } catch (err) {
      next(err);
    }
  });


// get video
router.get('/find/:id',  async (req, res, next) => {
    try {
      const video = await Video.findById(req.params.id);
      res.status(200).json(video);
    } catch (err) {
      next(err);
    }
  });

// add view
router.put('/view/:id',  async (req, res, next) => {
    try {
      await Video.findByIdAndUpdate(req.params.id, {
        $inc: { views: 1 },
      });
      res.status(200).json("The view has been increased.");
    } catch (err) {
      next(err);
    }
  });

// random video
router.get('/random',  async (req, res, next) => {
    try {
      const videos = await Video.aggregate([{ $sample: { size: 6} }]);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  });

// trend video
router.get('/trend', async (req, res, next) => {
    try {
      const videos = await Video.find().sort({ views: -1 });
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  });

// get sub video
router.get('/sub', verifyToken, async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      const subscribedChannels = user.subscribedUsers;
  
      const list = await Promise.all(
        subscribedChannels.map(async (channelId) => {
          return await Video.find({ userId: channelId });
        })
      );
  
      res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
    } catch (err) {
      next(err);
    }
  });

// video get by tag
router.get('/tags', verifyToken, async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
      const videos = await Video.find({ tags: { $in: tags } }).limit(20);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  });

// search or get by query
router.get('/search', verifyToken, async (req, res, next) => {
    const query = req.query.q;
    try {
      const videos = await Video.find({
        title: { $regex: query, $options: "i" },
      }).limit(40);
      res.status(200).json(videos);
    } catch (err) {
      next(err);
    }
  });


module.exports = router;
