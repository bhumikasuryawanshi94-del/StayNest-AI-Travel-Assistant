const Listing = require("../models/Listing");

const getListings = async (req, res) => {
  try {
    const listings = await Listing.find();

    res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });
  } catch (error) {
    console.error("Error fetching listings:", error.message);

    res.status(500).json({
      success: false,
      error: "Unable to fetch listings",
    });
  }
};

module.exports = {
  getListings,
};