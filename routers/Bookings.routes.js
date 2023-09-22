const express = require("express");
const Authentication = require("../middlewares/Authentication");

// Create Bookings Router
const BookingsRouter = express.Router();

// GET ALL BOOKINGS
// GET PARTICULAR BOOKING {id}
// CREATE A NEW BOOKING
// MODIFY THE BOOKING {id}
// DELETE THE BOOKINGS {id}

//localhost:5000/api/showsPATH: http://localhost:5000/api/bookings

BookingsRouter.get("/", Authentication, (req, res, next) => {
  return res.status(200).json({
    message: "Fetched All Bookings",
    data: [],
  });
});

BookingsRouter.get("/:id", Authentication, (req, res, next) => {
  return res.status(200).json({
    message: "Fetched A Booking",
    data: [],
  });
});

BookingsRouter.post("/create", Authentication, (req, res, next) => {
  return res.status(200).json({
    message: "Booking created successfully!!!",
  });
});

BookingsRouter.put("/update/:id", Authentication, (req, res, next) => {
  return res.status(200).json({
    message: "Booking updated successfully!!!",
  });
});

BookingsRouter.patch("/update/:id", Authentication, (req, res, next) => {
  return res.status(200).json({
    message: "Booking patched successfully!!!",
  });
});

BookingsRouter.delete("/delete/:id", Authentication, (req, res, next) => {
  return res.status(200).json({
    message: "Booking deleted successfully!!!",
  });
});

module.exports = BookingsRouter;
