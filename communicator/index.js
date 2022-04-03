const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "LikedPost") {
  }

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
    const { id, title, likes } = data;
    posts[id] = { id, title, likes };
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

app.listen(4006, async () => {
  console.log("communicator server 4006");
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
