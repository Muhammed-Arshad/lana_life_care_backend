const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/book", authMiddleware, bookingController.createBooking);
router.get("/getbookings", authMiddleware, bookingController.getUserBookings);

module.exports = router;
