const express = require("express");
const router = express.Router();
const controller = require("../controllers/postCtl");
const asyncHandler = require("../helpers/asyncHandler");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");
const logger = require("../logger");

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const Id = req.params.id;

    try {
      const data = await Post.findById(Id);
      res.send(data);
      console.log(data);
    } catch (err) {
      logger.error(err);
      logger.info(err.message);
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const Id = req.params.id;

    try {
      const data = await Post.findByIdAndDelete(Id);
      res.send(data);
      console.log(data);
    } catch (err) {
      logger.error(err);
      logger.info(err.message);
    }
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const Id = req.params.id;
      const update = req.body;
      const data = await Post.findByIdAndUpdate(Id, update, { new: true });

      console.log(Id);
      console.log(data);
    } catch (err) {
      res.status(500).json({ msg: err.message });
      logger.error(err);
      logger.info(err.message);
    }
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const data = new Post({
      userId: mongoose.Types.ObjectId(req.body.userId),
      title: req.body.title,
      img: req.body.img,
      likes: req.body.likes,
      comments: req.body.comments,
    });

    await data.save();
  })
);

router.put(
  "/like/:id",
  asyncHandler(async (req, res) => {
    try {
      const post = Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
        conole.log(post);
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
        console.log(post);
      }
    } catch (err) {
      res.status(500).json(err);
      logger.error(err);
      logger.info(err);
    }
  })
);

router.get("/profile/:name", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.params.name });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
  // await axios.post("http://localhost:4005/events", {
  //   type: "profileByName",
  // });
});

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
    console.log(currentUser);
    console.log(userPosts);
  } catch (err) {
    res.status(500).json(err);
  }
  // await axios.post("http://localhost:4005/events", {
  //   type: "getTimeline",
  // });
});

module.exports = router;
