import React, { useState } from "react";

// BookCard renders individual book details
const BookCard = ({ id,name , price , info, onRemove }) => {
  // Local state to toggle "Read More" / "Show Less"
  const [readMore, setReadMore] = useState(false);

  // Fallback in case information is missing
  const safeSummary = info || "No information available.";

  return (
    <article className="book-card">
      <h3>{name}</h3>
      <h5>{price}</h5>
      <p>
        {readMore ? safeSummary : `${safeSummary.substring(0, 80)}...`}
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? "Show Less" : "Read More"}
        </button>
      </p>
      {/* Button to remove the book */}
      <button className="btn-remove" onClick={() => onRemove(id)}>
        Remove Book
      </button>
    </article>
  );
};

export default BookCard;
