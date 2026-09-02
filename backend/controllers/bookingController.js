const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Listing = require("../models/Listing");

const createBooking = async (req, res) => {
  try {
    const {
      listingId,
      checkIn,
      checkOut,
      guests,
    } = req.body;

    // Check required fields
    if (!listingId || !checkIn || !checkOut || !guests) {
      return res.status(400).json({
        success: false,
        error: "listingId, checkIn, checkOut and guests are required",
      });
    }

    // Check whether listingId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(listingId)) {
      return res.status(400).json({
        success: false,
        error: "Invalid listingId",
      });
    }

    // Find the listing
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res.status(404).json({
        success: false,
        error: "Listing not found",
      });
    }

    // Validate guests
    if (guests > listing.maxGuests) {
      return res.status(400).json({
        success: false,
        error: `This listing allows a maximum of ${listing.maxGuests} guests`,
      });
    }

    // Convert dates
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    // Validate dates
    if (isNaN(startDate) || isNaN(endDate)) {
      return res.status(400).json({
        success: false,
        error: "Invalid check-in or check-out date",
      });
    }

    if (endDate <= startDate) {
      return res.status(400).json({
        success: false,
        error: "Check-out date must be after check-in date",
      });
    }

    // Calculate number of nights
    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const nights = Math.ceil(
      (endDate - startDate) / millisecondsPerDay
    );

    // Calculate total price
    const totalPrice =
      listing.pricePerNight * nights;

    // Create booking
    const booking = await Booking.create({
      listingId: listing._id,
      checkIn: startDate,
      checkOut: endDate,
      guests,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("Error creating booking:", error);

    res.status(500).json({
      success: false,
      error: "Unable to create booking",
    });
  }
};

module.exports = {
  createBooking,
};

