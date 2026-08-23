import React, { useState } from "react";
import listings from "../api/listings.json";
import PopularSection from "../Components/PopularSection";

function Stays() {
  const [search, setSearch] = useState("");

  // Filter listings by city, hotel name or price
  const filteredListings = listings.filter((listing) => {
    const searchText = search.toLowerCase();

    return (
      listing.city.toLowerCase().includes(searchText) ||
      listing.title.toLowerCase().includes(searchText) ||
      listing.pricePerNight.toString().includes(searchText)
    );
  });

  // Get unique cities from filtered listings
  const cities = [
    ...new Set(filteredListings.map((listing) => listing.city)),
  ];

  return (
    <div className="stays-page">

      {/* Search Bar */}
      <div className="stays-heading">
        <h1>Explore Stays</h1>

        <div className="stay-search">
          <input
          type="text"
          placeholder="Search city, hotel or price..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Results */}
      {cities.length > 0 ? (
        cities.map((city) => {
          const cityListings = filteredListings.filter(
            (listing) => listing.city === city
          );

          return (
            <PopularSection
              key={city}
              city={city}
              listings={cityListings}
            />
          );
        })
      ) : (
        <p className="no-results">No stays found.</p>
      )}

    </div>
  );
}

export default Stays;