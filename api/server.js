const express = require("express");
const carsRouter = require("./cars/cars-router");
const server = express();

server.use(express.json());

server.use("/api/cars", carsRouter);

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
