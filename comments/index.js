const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const Comment = require("./model/comment");
const app = express();
const mongoose = require("mongoose");
const { startConnection } = require("./mongoConfig/connection");

app.use(bodyParser.json());
app.use(cors());
startConnection();

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  var comment = {
    postId: mongoose.Types.ObjectId(req.body.postId),
    content: req.body.content,
    status: "pending",
  };

  const comments = new Comment(comment);
  await comments.save().then(() => {
    axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        newComment: comment,
      },
    });
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  console.log("Event Received:", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("comments server 4001");
});
