const mongoose = require("mongoose");
require("dotenv").config();

const Listing = require("../models/Listing");

const listings = [
  {
    "title": "Arabian Sea Luxury Retreat",
    "city": "Goa",
    "image": "Arabian Sea Luxury Retreat.jpg",
    "pricePerNight": 4500,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious stay in Goa, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Baga Beach Mid-Range Inn",
    "city": "Goa",
    "image": "Baga Beach Mid-Range Inn.jpg",
    "pricePerNight": 2200,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range stay in Goa, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Beachfront Luxury Villa",
    "city": "Goa",
    "image": "Beachfront Luxury Villa.jpg",
    "pricePerNight": 5500,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious villa in Goa, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 8,
    "type": "villa",
    "costTier": "premium"
  },
  {
    "title": "Budget Beach Hut",
    "city": "Goa",
    "image": "Budget Beach Hut.jpg",
    "pricePerNight": 1200,
    "rating": 4.6,
    "guestFavourite": false,
    "description": "A budget-friendly stay in Goa, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "budget"
  },
  {
    "title": "Candolim Boutique Resort",
    "city": "Goa",
    "image": "Candolim Boutique Resort.jpg",
    "pricePerNight": 3200,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A luxurious stay in Goa, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Cozy Riverside Cottage",
    "city": "Rishikesh",
    "image": "Cozy Riverside Cottage.jpg",
    "pricePerNight": 1200,
    "rating": 5.0,
    "guestFavourite": true,
    "description": "A budget-friendly cottage in Rishikesh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "cottage",
    "costTier": "budget"
  },
  {
    "title": "Ganga View Backpacker Hostel",
    "city": "Rishikesh",
    "image": "Ganga View Backpacker Hostel.jpg",
    "pricePerNight": 700,
    "rating": 4.8,
    "guestFavourite": false,
    "description": "A budget-friendly hostel in Rishikesh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking",
      "Common Lounge"
    ],
    "maxGuests": 1,
    "type": "hostel",
    "costTier": "budget"
  },
  {
    "title": "Heritage Haveli Suites",
    "city": "Jaipur",
    "image": "Heritage Haveli Suites.jpg",
    "pricePerNight": 2800,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Jaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Heritage Mall Road Suites",
    "city": "Manali",
    "image": "Heritage Mall Road Suites.jpg",
    "pricePerNight": 2600,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range stay in Manali, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Himalayan Grand Luxury Resort",
    "city": "Manali",
    "image": "Himalayan Grand Luxury Resort.jpg",
    "pricePerNight": 4200,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious stay in Manali, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Nubra Valley Desert Camp",
    "city": "Leh-Ladakh",
    "image": "Nubra Valley Desert Camp.jpg",
    "pricePerNight": 3000,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range camping experience in Leh-Ladakh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking",
      "Bonfire"
    ],
    "maxGuests": 4,
    "type": "camp",
    "costTier": "mid-range"
  },
  {
    "title": "Old Leh Budget Guesthouse",
    "city": "Leh-Ladakh",
    "image": "Old Leh Budget Guesthouse.jpg",
    "pricePerNight": 1100,
    "rating": 4.6,
    "guestFavourite": false,
    "description": "A budget-friendly guesthouse in Leh-Ladakh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking"
    ],
    "maxGuests": 3,
    "type": "guesthouse",
    "costTier": "budget"
  },
  {
    "title": "Palolem Budget Beach Rooms",
    "city": "Goa",
    "image": "Palolem Budget Beach Rooms.jpg",
    "pricePerNight": 1400,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A budget-friendly stay in Goa, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "budget"
  },
  {
    "title": "Panchgani Road Homestay",
    "city": "Panchgani",
    "image": "Panchgani Road Homestay.jpg",
    "pricePerNight": 1800,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range homestay in Panchgani, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "homestay",
    "costTier": "mid-range"
  },
  {
    "title": "Pangong Lake Luxury Camp",
    "city": "Leh-Ladakh",
    "image": "Pangong Lake Luxury Camp.jpg",
    "pricePerNight": 4800,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious camping experience in Leh-Ladakh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Swimming Pool",
      "Parking",
      "Bonfire"
    ],
    "maxGuests": 6,
    "type": "camp",
    "costTier": "premium"
  },
  {
    "title": "Pine Ridge Mountain Lodge",
    "city": "Manali",
    "image": "Pine Ridge Mountain Lodge.jpg",
    "pricePerNight": 2500,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Manali, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Pink City Palace Rooms",
    "city": "Jaipur",
    "image": "Pink City Palace Rooms.jpg",
    "pricePerNight": 2300,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Jaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Riverside Camping Pods",
    "city": "Rishikesh",
    "image": "Riverside Camping Pods.jpg",
    "pricePerNight": 900,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A budget-friendly camping experience in Rishikesh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking",
      "Bonfire"
    ],
    "maxGuests": 4,
    "type": "camp",
    "costTier": "budget"
  },
  {
    "title": "Royal Lake Palace Retreat",
    "city": "Udaipur",
    "image": "Royal Lake Palace Retreat.jpg",
    "pricePerNight": 5000,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious stay in Udaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Solang Valley Retreat",
    "city": "Manali",
    "image": "Solang Valley Retreat.jpg",
    "pricePerNight": 2200,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Manali, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Strawberry Hills Resort",
    "city": "Mahabaleshwar",
    "image": "Strawberry Hills Resort.jpg",
    "pricePerNight": 2800,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Mahabaleshwar, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Mountain Mist Retreat",
    "city": "Rishikesh",
    "image": "Mountain Mist Retreat.jpg",
    "pricePerNight": 1500,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Rishikesh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Little Ganga Homestay",
    "city": "Rishikesh",
    "image": "Little Ganga Homestay.jpg",
    "pricePerNight": 1100,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A budget-friendly homestay in Rishikesh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "homestay",
    "costTier": "budget"
  },
  {
    "title": "Sunset Valley Stay",
    "city": "Rishikesh",
    "image": "Sunset Valley Stay.jpg",
    "pricePerNight": 1800,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Rishikesh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Amber Fort Heritage Stay",
    "city": "Jaipur",
    "image": "Amber Fort Heritage Stay.jpg",
    "pricePerNight": 3200,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious stay in Jaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Jaipur Royal Garden Hotel",
    "city": "Jaipur",
    "image": "Jaipur Royal Garden Hotel.jpg",
    "pricePerNight": 2100,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range stay in Jaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Hawa Mahal Boutique Stay",
    "city": "Jaipur",
    "image": "Hawa Mahal Boutique Stay.jpg",
    "pricePerNight": 2600,
    "rating": 4.8,
    "guestFavourite": false,
    "description": "A comfortable mid-range stay in Jaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Snow Peak Valley Resort",
    "city": "Manali",
    "image": "Snow Peak Valley Resort.jpg",
    "pricePerNight": 3500,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A luxurious stay in Manali, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Beas River View Homestay",
    "city": "Manali",
    "image": "Beas River View Homestay.jpg",
    "pricePerNight": 1900,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range homestay in Manali, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "homestay",
    "costTier": "mid-range"
  },
  {
    "title": "Leh Palace View Retreat",
    "city": "Leh-Ladakh",
    "image": "Leh Palace View Retreat.jpg",
    "pricePerNight": 2600,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Leh-Ladakh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Khardungla Mountain Guesthouse",
    "city": "Leh-Ladakh",
    "image": "Khardungla Mountain Guesthouse.jpg",
    "pricePerNight": 1500,
    "rating": 4.6,
    "guestFavourite": false,
    "description": "A comfortable mid-range guesthouse in Leh-Ladakh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 3,
    "type": "guesthouse",
    "costTier": "mid-range"
  },
  {
    "title": "Himalayan Lake View Camp",
    "city": "Leh-Ladakh",
    "image": "Himalayan Lake View Camp.jpg",
    "pricePerNight": 3800,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious camping experience in Leh-Ladakh, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "Swimming Pool",
      "Parking",
      "Bonfire"
    ],
    "maxGuests": 6,
    "type": "camp",
    "costTier": "premium"
  },
  {
    "title": "Table Land Valley Retreat",
    "city": "Panchgani",
    "image": "Table Land Valley Retreat.jpg",
    "pricePerNight": 2400,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Panchgani, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Strawberry Valley Homestay",
    "city": "Panchgani",
    "image": "Strawberry Valley Homestay.jpg",
    "pricePerNight": 1600,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range homestay in Panchgani, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "homestay",
    "costTier": "mid-range"
  },
  {
    "title": "Hillside View Cottage",
    "city": "Panchgani",
    "image": "Hillside View Cottage.jpg",
    "pricePerNight": 2100,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range cottage in Panchgani, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "cottage",
    "costTier": "mid-range"
  },
  {
    "title": "Panchgani Sunset Villa",
    "city": "Panchgani",
    "image": "Panchgani Sunset Villa.jpg",
    "pricePerNight": 2700,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A comfortable mid-range villa in Panchgani, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 8,
    "type": "villa",
    "costTier": "mid-range"
  },
  {
    "title": "Lake Pichola Heritage Haveli",
    "city": "Udaipur",
    "image": "Lake Pichola Heritage Haveli.jpg",
    "pricePerNight": 3200,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious stay in Udaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "City Palace View Hotel",
    "city": "Udaipur",
    "image": "City Palace View Hotel.jpg",
    "pricePerNight": 2800,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range stay in Udaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Aravalli Hills Retreat",
    "city": "Udaipur",
    "image": "Aravalli Hills Retreat.jpg",
    "pricePerNight": 2400,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Udaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Fateh Sagar Lake Resort",
    "city": "Udaipur",
    "image": "Fateh Sagar Lake Resort.jpg",
    "pricePerNight": 3800,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious stay in Udaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Royal Garden Courtyard Stay",
    "city": "Udaipur",
    "image": "Royal Garden Courtyard Stay.jpg",
    "pricePerNight": 2100,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range stay in Udaipur, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Venna Lake View Resort",
    "city": "Mahabaleshwar",
    "image": "Venna Lake View Resort.jpg",
    "pricePerNight": 3200,
    "rating": 4.9,
    "guestFavourite": true,
    "description": "A luxurious stay in Mahabaleshwar, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Swimming Pool",
      "Parking"
    ],
    "maxGuests": 6,
    "type": "hotel",
    "costTier": "premium"
  },
  {
    "title": "Mapro Garden Homestay",
    "city": "Mahabaleshwar",
    "image": "Mapro Garden Homestay.jpg",
    "pricePerNight": 1900,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range homestay in Mahabaleshwar, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "homestay",
    "costTier": "mid-range"
  },
  {
    "title": "Arthur Hill Retreat",
    "city": "Mahabaleshwar",
    "image": "Arthur Hill Retreat.jpg",
    "pricePerNight": 2500,
    "rating": 4.8,
    "guestFavourite": true,
    "description": "A comfortable mid-range stay in Mahabaleshwar, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  },
  {
    "title": "Panchgani Road Mountain Stay",
    "city": "Mahabaleshwar",
    "image": "Panchgani Road Mountain Stay.jpg",
    "pricePerNight": 2200,
    "rating": 4.7,
    "guestFavourite": false,
    "description": "A comfortable mid-range stay in Mahabaleshwar, offering a memorable experience for travellers.",
    "amenities": [
      "WiFi",
      "AC",
      "Parking"
    ],
    "maxGuests": 4,
    "type": "hotel",
    "costTier": "mid-range"
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    // Remove existing listings
    await Listing.deleteMany();

    console.log("Old listings removed");

    // Insert new listings
    await Listing.insertMany(listings);

    console.log("Listings added successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding listings:", error.message);
    process.exit(1);
  }
};

seedDatabase();