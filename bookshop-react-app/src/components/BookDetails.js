// bookshop-react-app/src/components/BookDetails.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './BookDetails.css'; // Create this for styling

function BookDetails({ books, addToCart }) {
  const { id } = useParams(); // Get book ID from URL
  const book = books.find(b => b.id === parseInt(id));

  if (!book) {
    return (
      <div>
        <p>Book not found.</p>
        <Link to="/">Go back to book list</Link>
      </div>
    );
  }

  return (
    <div className="book-details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <button onClick={() => addToCart(book)}>Add to Cart</button>
      <br />
      <Link to="/">Back to list</Link>
    </div>
  );
}

export default BookDetails;
