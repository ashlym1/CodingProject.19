import React, { useEffect, useState } from "react";
import BookCard from "./TourCard";

// Gallery fetched and renders all the tours 
const Gallery = ({ tours, setTours, onRemove }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch tours  from the API
  const fetchTours = async () => {
    try {
      const res = await fetch("https://course-api.com/react-tours-project");
      const data = await res.json(); // data is already in array 
      setTours(data); // save dirrectly to state  
          setLoading(false);
        } catch (err) {
          setError(true);
          setLoading(false);
        }
      };
      

  // Run fetchBooks once after component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // Render loading state
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // Render error state
  if (error) {
    return <h2>Error: Something went wrong...</h2>;
  }

  // Render if no books are found/remain
  if (tours.length === 0) {
    return (
      <>
        <h2>No More Tours  Left. Try again later.</h2>
        <button onClick={fetchBooks}>Refresh</button>
      </>
    );
  }

  // Render the list of book cards
  return (
    <section className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} onRemove={onRemove} />
      ))}
    </section>
  );
};

export default Gallery;
