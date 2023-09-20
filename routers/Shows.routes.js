// GET ALL THE SHOWS
// GET SPECIFIC SHOW MATCHING THE {id}
// CREATE A SHOW
// UPDATE THE SHOW {id}
// DELETE THE SHOW {id}
const express = require("express");
const {
  getAllShows,
  getAShow,
  createAShow,
} = require("../controllers/shows.controller");

const ShowsRouter = express.Router();

/**
 * PATH - http://localhost:5000/api/shows
 */

/**
 * Method - GET
 * Details - Route will help us to fetch all the shows
 */
ShowsRouter.get("/", getAllShows);

/**
 * Method - GET
 * Details - Route will help us to fetch {id} show
 * input - showId
 */
ShowsRouter.get("/:showId", getAShow);

/**
 * Method - POST
 * Details -  Route will create a new Show in database
 * Input - Show Data
 */
ShowsRouter.post("/create", createAShow);

module.exports = ShowsRouter;
