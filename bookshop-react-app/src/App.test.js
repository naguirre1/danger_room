import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Bookshop header title', () => {
  render(<App />);
  // Check for the main "Bookshop" title in the header, which is part of App's rendering
  const titleElements = screen.getAllByText(/Bookshop/i);
  // Ensure at least one "Bookshop" text is present (it appears in Header and Footer)
  expect(titleElements.length).toBeGreaterThan(0);
  // More specifically, check if one of them is an H1 (the main title in Header)
  const h1Title = titleElements.find(el => el.tagName === 'H1');
  expect(h1Title).toBeInTheDocument();
});
