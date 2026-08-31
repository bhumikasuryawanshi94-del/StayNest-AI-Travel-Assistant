import React, { useRef } from "react";
import PropertyCard from "./PropertyCard";

function PopularSection({ city, listings }) {

  const containerRef = useRef(null);

  const scrollRight = () => {

    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: 500,
        behavior: "smooth"
      });
    }

  };

  return (
    <section className="popular-section">

      <div className="popular-header">

        <h2>
          Popular homes in {city}
        </h2>

        <button
          className="section-arrow"
          onClick={scrollRight}
        >
          →
        </button>

      </div>

      <div
        className="properties-container"
        ref={containerRef}
      >

        {listings.map((listing) => (

          <PropertyCard
            key={listing._id}
            listing={listing}
          />

        ))}

      </div>

    </section>
  );
}

export default PopularSection;
