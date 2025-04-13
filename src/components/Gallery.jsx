import React, { useEffect, useState } from "react";
import BookCard from "./TourCard";

// BookList is responsible for fetching books and rendering the list
const BookList = ({ books, setBooks, onRemove }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to fetch books from the API
  const fetchBooks = async () => {
    try {
      const res = await fetch("https://course-api.com/react-tours-project");
      const data = await res.json();

      const trimmed = data.results.map((book) => ({
        id: book.id,
        name: book.name,
        author: book.authors[0]?.name || "Unknown",
      info : `Download count: ${book.download_count}. Subjects: ${book.subjects?.slice(0, 3).join(", ")}`,
      }));

      setBooks(trimmed);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  // Run fetchBooks once after component mounts
  useEffect(() => {
    fetchBooks();
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
  if (books.length === 0) {
    return (
      <>
        <h2>No Books Left. Try again later.</h2>
        <button onClick={fetchBooks}>Refresh</button>
      </>
    );
  }

  // Render the list of book cards
  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          {...book}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
};

export default BookList;