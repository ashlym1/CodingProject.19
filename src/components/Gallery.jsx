
//Importing from app and tourcard.jsx
import React, { useEffect, useState } from 'react';
import TourCard from './TourCard';

//retriving the API from the url 
// * NOTE to self if the  url breaks come back to this,(currently: used an  proxy to avoid issues with permissions)
const url = 'https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project';

const Gallery = ({ tours, setTours, onRemove }) => { // fetched  and displayed all tours
  // Message will show "Loading..." while the data is being fetched
  const [loading, setLoading] = useState(true);

  // State variable, will show an error message if something goes wrong/breaks 
  const [error, setError] = useState(false);

  const fetchTours = async () => {
    try {
      setLoading(true);  // loading screen
      const response = await fetch(url); 

      //If the response is not successful and error message will show 
      if (!response.ok) {
        throw new Error("ERROR: Was not able to fetch tours");
      }

      //Convert the response to json
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.log('Fetch error:', error);

      // ERROR MESSAGE AGAIN 
      setError(true);
    } finally {
      // Loading screen will go away 
      setLoading(false);
    }
  };

  // Fetchtour  function will be run once when the everythign is first loaded
  useEffect(() => {
    fetchTours();
  }, []);

 // render loading state 
  if (loading) {
    return <h2>Loading...</h2>;
  }

  // render error state 
  if (error) {
    return <h2>Something went wrong.</h2>;
  }
 
  if (tours.length === 0) {
    return (
      <div className="no-tours">
        <h2>No tours left</h2>
        <button onClick={fetchTours}>
          Refresh
        </button>
      </div>
    );
  }

  // Render the list of tour cards 
  return (
    <section className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} {...tour} onRemove={onRemove} />
      ))}
    </section>
  );
};

//Exporting the compenent 
export default Gallery;
