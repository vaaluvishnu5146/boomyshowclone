const express = require("express");
const ShowsRouter = require("../routers/Shows.routes");
const BookingsRouter = require("../routers/Bookings.routes");

// Creating Api Server
const API_SERVER = express();

// Inject Routes
API_SERVER.use("/shows", ShowsRouter);
API_SERVER.use("/bookings", BookingsRouter);

module.exports = API_SERVER;
