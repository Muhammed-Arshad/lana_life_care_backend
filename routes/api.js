const { authRoutes } = require(".");
const bookingRoutes = require("./booking-route");

module.exports = function (app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/bookings", bookingRoutes);
};
