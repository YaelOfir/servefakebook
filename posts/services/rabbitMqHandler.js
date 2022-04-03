const amqp = require("amqplib");
const mongoPostService = require("./mongoPostService");
class RabbitMqHandler {
  constructor(mongoDb) {
    this.mongoDb = mongoDb;
  }

  async init() {
    const connection = await amqp.connect();
    this._channel = await connection.createChannel(process.env.RABBITMQURL);
    await this._channel.assertQueue(process.env.QUEUENAME);
    this._channel.consume(process.env.QUEUENAME, (message) => {
      this.handleMessage(message);
    });
  }

  async handleMessage(message) {
    const input = JSON.parse(message.content.toString());
    console.log(input);
    switch (input.type) {
      case "add":
        this.mongoDb.addRequest(input.data);
      case "delete":
        this.mongoDb.deleteByIdRequest(input.data.id);
      case "put":
        this.mongoDb.updateByIdRequest(input.data.id, input.data);
      case "get":
        this.mongoDb.getIdRequest(input.data.id);
    }
    this._channel.ack(message);
  }
}

module.exports = RabbitMqHandler;
