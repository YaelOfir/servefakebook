const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dsojektsp/image/upload/v1648045770/avatar/mzle7kkkumehtn9yiavp.webp",
    },
    groups: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    birthdate: { type: Date },
    city: {
      type: String,
      default: "",
    },
    from: {
      type: String,
      max: 50,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);
