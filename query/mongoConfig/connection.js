const mongoConnect = require("mongoose");
const { connect } = mongoConnect;
require("dotenv").config();
global.mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const URI = process.env.MONGO_URI;

const logger = require("../logger");

module.exports.startConnection = async function startConnection() {
  await connect(URI)
    .then(() => {
      console.log("mongoDb connected");
    })
    .catch((err) => {
      logger.error("mongoDB disconnected", err);
      console.log(err);
    });
};
