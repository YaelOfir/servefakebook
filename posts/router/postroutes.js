const express = require("express");
const app = express.Router();
const dotenv = require("dotenv");
const multer = require("multer");
const cors = require("cors");
const asyncHandler = require("../helpers/asyncHandler");
const eventService = require("../services/eventService");
const postMongoService = require("../services/mongoPostService");
const logger = require("../logger");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const upload = require("../multer/multer");
dotenv.config();

app.use(cors());
app.use("/images", express.static(path.join(__dirname, "./public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.post("/api/upload/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

const posts = {};

// app.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const data = postMongoService.addRequest(req.body);
//     await res.status(200).send(data);

//     await eventService.AddEventPost("PostCreated", data);
//   })
// );

app.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const Id = req.params.id;
      const data = postMongoService.getIdRequest(Id);
      await res.status(200).send(data);
      await eventService.AddEventPost("FetchedPost", data);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      logger.error(err);
      logger.info(err);
    }
  })
);

app.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const Id = req.params.id;
      const data = postMongoService.deleteByIdRequest(Id);
      await res.status(200).send(data);
      await eventService.AddEventPost("PostDeleted", data);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      s;
      logger.error(err);
      logger.info(err);
    }
  })
);

app.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const Id = req.params.id;
      const updateData = req.body;

      const data = postMongoService.updateByIdRequest(Id, updateData);
      res.status(200).send(data);
      await eventService.AddEventPost("PostUpdated", data);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      logger.error(err);
      logger.info(err);
    }
  })
);

app.put(
  "/like/:id",
  asyncHandler(async (req, res) => {
    try {
      const Id = req.params.id;
      const user = req.body;

      const data = postMongoService.updateLikeReqest(Id, user);
      res.status(200).send(data);
      await eventService.AddEventPost("PostLiked", data);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      logger.error(err);
      logger.info(err);
    }
  })
);

app.get(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const Id = req.params.id;
      const name = req.params.name;

      const data = postMongoService.getIdRequest(Id);
      await res.status(200).send(data);
      await eventService.AddEventPost("FetchedPost", data);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      logger.error(err);
      logger.info(err);
    }
  })
);

app.get(
  "/timeline/:userId",
  asyncHandler(async (req, res) => {
    try {
      const userId = req.params.userId;

      const data = postMongoService.timelineRequest(userId);
      await res.status(200).send(data);
      await eventService.AddEventPost("timeline:", data);
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
      logger.error(err);
      logger.info(err);
    }
  })
);

module.exports = app;
