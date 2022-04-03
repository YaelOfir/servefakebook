const awilix = require("awilix");
const mongoDb = require("./services/mongoPostService");
const rabbitMqHandler = require("./services/rabbitMqHandler");

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.CLASSIC,
});

container.register({
  mongoDb: awilix.asClass(mongoDb).singleton(),
  rabbitMqHandler: awilix.asClass(rabbitMqHandler).singleton(),
});

module.exports = container;
