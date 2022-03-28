const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const { startConnection } = require("./mongoConfig/connection");
const Post = require("./models/post.js");
const User = require("./models/user.js");
const app = express();
app.use(bodyParser.json());
app.use(cors());
startConnection();

const posts = {};

const handleEvent = (type, data) => {
  if (type === "profileByName") {
    // try {
    //   const user = User.findOne({ username: req.params.username });
    //   const posts = Post.find({ userId: user._id });
    //   data.status(200).json(posts);
    // } catch (err) {
    //   data.status(500).json(err);
    // }
  }

  if (type === "getTimeline") {
    // try {
    //   const currentUser = User.findById(req.params.userId);
    //   const userPosts = Post.find({ userId: currentUser._id });
    //   const friendPosts = Promise.all(
    //     currentUser.followings.map((friendId) => {
    //       return Post.find({ userId: friendId });
    //     })
    //   );
    //   res.status(200).json(userPosts.concat(...friendPosts));
    // } catch (err) {
    //   res.status(500).json(err);
    //}
  }

  if (type === "PostCreated") {
    // const { id, title } = data;
    // posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

const server = app.listen(4002, async () => {
  console.log("query server 4002");
  try {
    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data) {
      console.log("Processing event: ", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});

// const io = require("socket.io");
// const jwt = require("jwt-then");

// io.use((socket, next) => {
//   const token = socket.handshake.query.token;

//   try {

//   } catch (err) {
//     res.status(401).json({ message: "Forbidden" });
//   }
// });
