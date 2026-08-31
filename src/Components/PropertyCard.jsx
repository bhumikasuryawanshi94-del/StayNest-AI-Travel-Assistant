import React, { useEffect, useState } from "react";

function PropertyCard({ listing }) {

  const [liked, setLiked] = useState(false);
  const [userRating, setUserRating] = useState(0);

  // Load saved data
  useEffect(() => {

    const savedLiked = localStorage.getItem(
      `liked_${listing._id}`
    );

    const savedRating = localStorage.getItem(
      `rating_${listing._id}`
    );

    if (savedLiked === "true") {
      setLiked(true);
    }

    if (savedRating) {
      setUserRating(Number(savedRating));
    }

  }, [listing._id]);


  // Heart
  const handleLike = () => {

    const newLiked = !liked;

    setLiked(newLiked);

    localStorage.setItem(
      `liked_${listing._id}`,
      newLiked
    );
  };


  // Rating
  const handleRating = (rating) => {

    setUserRating(rating);

    localStorage.setItem(
      `rating_${listing._id}`,
      rating
    );
  };


  return (
    <div className="property-card">

      {/* IMAGE */}

      <div className="property-image-container">

        <img
          src={`/${listing.image}`}
          alt={listing.title}
          className="property-image"
        />


        {/* Guest Favourite */}

        {listing.guestFavourite && (
          <span className="guest-favourite">
            Guest favourite
          </span>
        )}


        {/* HEART */}

        <button
          className={`heart-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {liked ? "♥" : "♡"}
        </button>

      </div>


      {/* INFORMATION */}

      <div className="property-info">

        <h3>
          {listing.title}
        </h3>

        <p className="property-location">
          {listing.city}
        </p>


        <p className="property-price">
          ₹{listing.pricePerNight.toLocaleString()} per night
        </p>


        {/* RATING */}

        <div className="rating-container">

          <div className="stars">

            {[1, 2, 3, 4, 5].map((star) => (

              <button
                key={star}
                className={
                  star <= userRating
                    ? "star active"
                    : "star"
                }
                onClick={() => handleRating(star)}
              >
                ★
              </button>

            ))}

          </div>


          <span className="rating-text">

            {userRating > 0
              ? `You rated ${userRating}/5`
              : "Rate this stay"}

          </span>

        </div>

      </div>

    </div>
  );
}

export default PropertyCard;

