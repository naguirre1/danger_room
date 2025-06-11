// bookshop-react-app/src/components/ShoppingCart.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';

const mockCartItems = [
  { id: 1, title: 'Book Alpha', price: 10.00 },
  { id: 2, title: 'Book Beta', price: 15.00 },
];
const mockRemoveFromCart = jest.fn();
const mockClearCart = jest.fn();

describe('ShoppingCart Component', () => {
  test('renders "Your cart is empty." when no items are provided', () => {
    render(<ShoppingCart cartItems={[]} removeFromCart={mockRemoveFromCart} clearCart={mockClearCart} />);
    expect(screen.getByText(/Your cart is empty./i)).toBeInTheDocument();
  });

  test('renders cart items and total price', () => {
    render(<ShoppingCart cartItems={mockCartItems} removeFromCart={mockRemoveFromCart} clearCart={mockClearCart} />);
    expect(screen.getByText(mockCartItems[0].title)).toBeInTheDocument();
    expect(screen.getByText(mockCartItems[1].title)).toBeInTheDocument();
    const total = mockCartItems.reduce((sum, item) => sum + item.price, 0);
    expect(screen.getByText(`Total: $${total.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Remove/i }).length).toBe(mockCartItems.length);
    expect(screen.getByRole('button', { name: /Clear Cart/i })).toBeInTheDocument();
  });

  test('calls removeFromCart when a "Remove" button is clicked', () => {
    render(<ShoppingCart cartItems={mockCartItems} removeFromCart={mockRemoveFromCart} clearCart={mockClearCart} />);
    const removeButtons = screen.getAllByRole('button', { name: /Remove/i });
    fireEvent.click(removeButtons[0]); // Click the first remove button
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockCartItems[0].id);
  });

  test('calls clearCart when "Clear Cart" button is clicked', () => {
    render(<ShoppingCart cartItems={mockCartItems} removeFromCart={mockRemoveFromCart} clearCart={mockClearCart} />);
    fireEvent.click(screen.getByRole('button', { name: /Clear Cart/i }));
    expect(mockClearCart).toHaveBeenCalled();
  });

  test('does not render "Clear Cart" button when cart is empty', () => {
    render(<ShoppingCart cartItems={[]} removeFromCart={mockRemoveFromCart} clearCart={mockClearCart} />);
    expect(screen.queryByRole('button', { name: /Clear Cart/i })).not.toBeInTheDocument();
  });
});
