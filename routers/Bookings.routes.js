const express = require("express");

// Create Bookings Router
const BookingsRouter = express.Router();

// GET ALL BOOKINGS
// GET PARTICULAR BOOKING {id}
// CREATE A NEW BOOKING
// MODIFY THE BOOKING {id}
// DELETE THE BOOKINGS {id}

//localhost:5000/api/showsPATH: http://localhost:5000/api/bookings

BookingsRouter.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Fetched All Bookings",
    data: [],
  });
});

BookingsRouter.get("/:id", (req, res, next) => {
  return res.status(200).json({
    message: "Fetched A Booking",
    data: [],
  });
});

BookingsRouter.post("/create", (req, res, next) => {
  return res.status(200).json({
    message: "Booking created successfully!!!",
  });
});

BookingsRouter.put("/update/:id", (req, res, next) => {
  return res.status(200).json({
    message: "Booking updated successfully!!!",
  });
});

BookingsRouter.patch("/update/:id", (req, res, next) => {
  return res.status(200).json({
    message: "Booking patched successfully!!!",
  });
});

BookingsRouter.delete("/delete/:id", (req, res, next) => {
  return res.status(200).json({
    message: "Booking deleted successfully!!!",
  });
});

module.exports = BookingsRouter;
