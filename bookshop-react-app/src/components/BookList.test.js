// bookshop-react-app/src/components/BookList.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BookList from './BookList';

const mockBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10.99 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.50 },
];

describe('BookList Component', () => {
  test('renders a list of books', () => {
    render(<Router><BookList books={mockBooks} /></Router>);
    const bookItems = screen.getAllByRole('listitem');
    expect(bookItems.length).toBe(mockBooks.length);
    expect(screen.getByText(mockBooks[0].title)).toBeInTheDocument();
    expect(screen.getByText(`by ${mockBooks[1].author}`)).toBeInTheDocument();
  });

  test('renders "No books available." message when no books are provided', () => {
    render(<Router><BookList books={[]} /></Router>);
    expect(screen.getByText(/No books available./i)).toBeInTheDocument();
  });

  test('renders "No books available." message when books prop is undefined', () => {
    render(<Router><BookList /></Router>);
    expect(screen.getByText(/No books available./i)).toBeInTheDocument();
  });
});
