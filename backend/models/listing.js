const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },

    guestFavourite: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      enum: ["hotel", "lodge", "villa", "cottage", "hostel", "camp","guesthouse", "homestay"],
      required: true,
    },

    costTier: {
      type: String,
      enum: ["budget", "mid-range", "premium"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;