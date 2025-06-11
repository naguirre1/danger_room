// bookshop-react-app/src/components/BookList.js
import React from 'react';
import { Link } from 'react-router-dom';
import './BookList.css'; // Create this for styling

function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <div className="book-list">
      <h2>Books</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} className="book-item">
            <Link to={`/books/${book.id}`} className="book-item-link-wrapper">
              <img src={book.imageUrl} alt={`Cover of ${book.title}`} className="book-item-image" />
              <div className="book-item-details">
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p>${book.price.toFixed(2)}</p>
              </div>
            </Link>
            {/* Add to cart button or other actions might go here, outside the main link */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
