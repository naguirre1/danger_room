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
            <Link to={`/books/${book.id}`}>
              <h3>{book.title}</h3>
            </Link>
            <p>by {book.author}</p>
            <p>${book.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
