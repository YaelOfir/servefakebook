const Post = require("../models/post");
const mongoose = require("mongoose");

class PostController {
  async getPostById(id) {
      const post = await Post.findById(id);
      return post
  }

  async addPost(post) {
    const newPostMongo = new Post({
      userId: mongoose.Types.ObjectId(req.body.userId),
      title: req.body.title,
      img: req.body.img,
      likes: req.body.likes,
      comments: req.body.comments,
    });
    console.log(post);
    await newPostMongo.save();

    return newPostMongo;
  }
}

module.exports = new PostController();
