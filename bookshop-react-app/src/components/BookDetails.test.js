// bookshop-react-app/src/components/BookDetails.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter, Routes, Route } from 'react-router-dom';
import BookDetails from './BookDetails';

const mockBooksData = [
  { id: 1, title: 'The Test Book', author: 'Test Author', price: 9.99, description: 'A book for testing.' },
];
const mockAddToCart = jest.fn();

// Helper function to render with router context for a specific path
const renderWithRouter = (ui, { route = '/', path = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe('BookDetails Component', () => {
  beforeEach(() => {
    // Clear mock call counts before each test
    mockAddToCart.mockClear();
  });

  test('renders book details when a valid book ID is provided', () => {
    renderWithRouter(
      <BookDetails books={mockBooksData} addToCart={mockAddToCart} />,
      { route: '/books/1', path: '/books/:id' }
    );
    expect(screen.getByText(mockBooksData[0].title)).toBeInTheDocument();
    // Using regex to be more flexible with spacing for Author and Description
    expect(screen.getByText(new RegExp(`Author:\\s*${mockBooksData[0].author}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(`Price: $${mockBooksData[0].price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Description:\\s*${mockBooksData[0].description}`, 'i'))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
  });

  test('calls addToCart when "Add to Cart" button is clicked', () => {
    renderWithRouter(
      <BookDetails books={mockBooksData} addToCart={mockAddToCart} />,
      { route: '/books/1', path: '/books/:id' }
    );
    fireEvent.click(screen.getByRole('button', { name: /Add to Cart/i }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockBooksData[0]);
  });

  test('renders "Book not found." when an invalid book ID is provided', () => {
     renderWithRouter(
      <BookDetails books={mockBooksData} addToCart={mockAddToCart} />,
      { route: '/books/99', path: '/books/:id' }
    );
    expect(screen.getByText(/Book not found./i)).toBeInTheDocument();
  });
});
