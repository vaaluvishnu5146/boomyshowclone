const express = require("express");
const API_SERVER = require("./services/service");
const bodyParser = require("body-parser");
const configDotenv = require("dotenv");
const CORS = require("cors");

// Loading .env variables into Process.env
configDotenv.config();

const { init } = require("./dbConfig");
init();
// Create HTTP server
const HTTP_SERVER = express();

// ENABLING CROSS ORIGIN RESOURCE SHARING
// INJECTING CORS
HTTP_SERVER.use(
  CORS({
    origin: ["http://localhost:3000"],
    methods: ["PUT", "POST"],
  })
);

// COMMANDING SERVER TO BE AWARE OF INCOMING REQUEST TYPE
// PARSER THE REQUEST AS application/json
HTTP_SERVER.use(bodyParser.json());

// PARSER THE REQUEST AS application/x-www-form-urlencoded
HTTP_SERVER.use(bodyParser.urlencoded({ extended: true }));

// Open the port to accept the incomming connection
const PORT = 5000;

// Make HTTP_SERVER listen to a PORT
HTTP_SERVER.listen(PORT, process.env.NODE_HOSTNAME, () => {
  console.log(`Listening to request on the port ${PORT}`);
});

// Injecting API_SERVER into HTTP_SERVER
HTTP_SERVER.use("/api", API_SERVER);
