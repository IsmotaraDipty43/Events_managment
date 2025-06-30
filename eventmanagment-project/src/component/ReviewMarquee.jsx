import React, { useEffect, useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

const StarRating = ({ rating }) => (
  <div style={{ color: "#f5c518", fontSize: 14 }}>
    {"★".repeat(rating) + "☆".repeat(5 - rating)}
  </div>
);

const ReviewCard = ({ review }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      width: 220,
      height: 120,
      marginRight: 20,
      backgroundColor: "#f0f4f8",
      padding: 15,
      borderRadius: 8,
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      fontSize: 16,
      boxSizing: "border-box",
    }}
  >
    <img
      src={review.image}
      alt={review.name}
      style={{
        width: 50,
        height: 50,
        borderRadius: "50%",
        marginRight: 15,
        objectFit: "cover",
        flexShrink: 0,
      }}
    />
    <div style={{ overflow: "hidden" }}>
      <h4
        style={{
          margin: 0,
          fontSize: 14,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {review.name}
      </h4>
      <StarRating rating={review.rating} />
      <p
        style={{
          marginTop: 6,
          fontSize: 12,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          lineHeight: "1.2em",
        }}
      >
        {review.review}
      </p>
    </div>
  </div>
);

const ReviewMarquee = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://eventmanagment-flax.vercel.app/review")
      .then((res) => {
        setReviews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <div style={{ backgroundColor: "#fff", padding: "20px 10px", width: "100%" }}>
      {/* Title and Description */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 8, color: "#111827" }}>
          What Our Clients Say
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", maxWidth: 600, margin: "0 auto" }}>
          Discover how people experienced our event services. Their feedback helps us grow and deliver even better results every time.
        </p>
      </div>

      {/* Marquee Reviews */}
      <Marquee gradient={false} speed={50} pauseOnHover>
        {reviews.map((review) => (
          <ReviewCard review={review} key={review._id} />
        ))}
      </Marquee>
    </div>
  );
};

export default ReviewMarquee;
