const express = require("express");
const dotenv = require("dotenv");
const logger = require("./logger");
const app = express();
const asyncHandler = require("./helpers/asyncHandler");

const cors = require("cors");
dotenv.config();
app.use(cors());

app.use(express.json());
const rabbitMq = require("./rabbitMqHandler");

app.post("/publish", function (req, res) {
  try {
    rabbitMq.sendMessage(req.body.name, req.body.data, req.body.type);
    res.status(200);
  } catch (e) {
    logger.info(e);
    logger.error(e);
  }
});

app.listen(5555, () => {
  console.log("rabbitmq server 5555");
});
