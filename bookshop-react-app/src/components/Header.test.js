// bookshop-react-app/src/components/Header.test.js
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Needed for <Link>
import Header from './Header';

describe('Header Component', () => {
  test('renders the bookshop title', () => {
    render(<Router><Header cartItemCount={0} /></Router>);
    const titleElement = screen.getByText(/Bookshop/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(<Router><Header cartItemCount={0} /></Router>);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    const cartLink = screen.getByRole('link', { name: /Cart \(0\)/i }); // Check initial cart count
    expect(cartLink).toBeInTheDocument();
  });

  test('displays the correct cart item count', () => {
    render(<Router><Header cartItemCount={5} /></Router>);
    const cartLink = screen.getByRole('link', { name: /Cart \(5\)/i });
    expect(cartLink).toBeInTheDocument();
  });
});
