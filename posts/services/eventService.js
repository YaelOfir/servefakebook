const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

class EventService {
  async AddEventPost(type, data) {
    await axios.post("http://localhost:4005/events/", {
      type: type,
      data: {
        newpost: data,
      },
    });
  }
};

module.exports = new EventService();
