const express = require("express");
const dotenv = require("dotenv");

const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { startConnection } = require("./mongoConfig/connection");
const Post = require("./model/Post");
const User = require("./model/userModel");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const app = express();
dotenv.config();

app.use(cors());
startConnection();
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlewear
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/create", async (req, res) => {
  var post = {
    userId: mongoose.Types.ObjectId(req.body.userId),
    title: req.body.title,
    img: req.body.img,
    likes: req.body.likes,
    comments: req.body.comments,
  };
  const newPost = new Post(post);
  await newPost.save().then(() => {
    axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        newpost: newPost,
      },
    });
  });
});

app.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const foundPost = post.updateOne({ $set: req.body });
    if (post.userId === req.body.id) {
      await axios.post("http://localhost:4005/events", {
        type: "FoundPost",
        data: {
          foundPost: foundPost,
        },
      });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

app.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const deletedPost = post.deleteOne();

    if (post.userId === req.body.userId) {
      await axios.post("http://localhost:4005/events", {
        type: "PostDeleted",
        data: {
          deletedPost: deletedPost,
        },
      });
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("post/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const likedPost = post.updateOne({ $push: { likes: req.body.userId } });
    if (!post.likes.includes(req.body.id)) {
      await axios.post("http://localhost:4005/events", {
        type: "LikedPost",
        data: {
          likedPost: likedPost,
        },
      });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
  // await axios.post("http://localhost:4005/events", {
  //   type: "getTimeline",
  // });
});

app.get("/profile/:name", async (req, res) => {
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

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("v55");
  console.log("posts server 4000");
});
