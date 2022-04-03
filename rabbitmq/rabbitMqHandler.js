const amqp = require("amqplib");
 class RabbitMqHandler {


    async sendMessage(queueName,data,type) {

        const connection = await amqp.connect(process.env.RABBITURL);
        this._channel = await connection.createChannel();
        await this._channel.assertQueue(queueName);

        const msgBuffer = Buffer.from(JSON.stringify({type:type, data:data }),);
        await this._channel.sendToQueue(queueName, msgBuffer);
    }
}

module.exports = new RabbitMqHandler();