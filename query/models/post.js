const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      default: [],
    }],
    comments: [
      {
        type: Array,
        default: [],
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
