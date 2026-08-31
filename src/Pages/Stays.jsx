import React, { useEffect, useState } from "react";
import PopularSection from "../Components/PopularSection";

function Stays() {
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch listings from StayNest backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/listings"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to fetch listings"
          );
        }

        setListings(data.listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setError("Unable to load stays.");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

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

  // Loading state
  if (loading) {
    return (
      <div className="stays-page">
        <h1>Explore Stays</h1>
        <p>Loading stays...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="stays-page">
        <h1>Explore Stays</h1>
        <p className="no-results">{error}</p>
      </div>
    );
  }

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

