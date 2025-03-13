const { Booking } = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, time, date } = req.body;

    // Ensure all fields are provided
    if (!name || !email || !phone || !service || !time || !date) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }

    // Create new booking
    const booking = await Booking.create({
      name,
      email,
      phone,
      service,
      time,
      date,
      userId: req.user._id, // Attach user ID from auth middleware
    });

    return res.status(201).json({ status: true, message: "Booking created successfully", data: booking });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

// const createBooking = async (req, res) => {
//     try {
//       const { name, email, phone, service, time, date } = req.body;
//       const userId = req.user.userId; // Assuming authentication middleware adds `req.user`
  
//       const newBooking = await Booking.create({ name, email, phone, service, time, date, userId });
  
//       const userBookings = await Booking.find({ userId });
  
//       res.status(201).json({ status: true, message: "Booking created successfully", bookings: userBookings });
//     } catch (error) {
//       res.status(500).json({ status: false, message: error.message });
//     }
//   };

const getUserBookings = async (req, res) => {
  try {
    // Fetch bookings for the authenticated user
    const bookings = await Booking.find({ userId: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({ status: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { createBooking, getUserBookings };
