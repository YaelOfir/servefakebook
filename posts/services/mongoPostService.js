//const dotenv = require("dotenv");
const axios = require("axios");
//dotenv.config();

class PostMongoService {

  async addRequest(post) {
    return await axios.post(`http://localhost:4002/`, post);
  }

  async getIdRequest(id) {
    return await axios.get(`http://localhost:4002/${id}`, {
    });
  }

  async deleteByIdRequest(id) {
    return await axios.delete(`http://localhost:4002/${id}`);
  }

  async updateByIdRequest(id, data) {
    return await axios.put(`http://localhost:4002/${id}`, data);
  }

  async updateLikeReqest(id, data) {
    return await axios.put(`http://localhost:4002/like/${id}`, data);
  }

  async timelineRequest(userId) {
    return await axios.put(`http://localhost:4002/timeline/${userId}`);
  }
}
module.exports = PostMongoService;
