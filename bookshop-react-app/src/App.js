// bookshop-react-app/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';
import ShoppingCart from './components/ShoppingCart';
import mockBooks from './data';

function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  const addToCart = (book) => {
    setCart(prevCart => {
      // Optional: Check if book already exists and update quantity instead
      // For this version, we'll allow adding multiple copies of the same book as distinct items
      console.log('Adding to cart:', book.title);
      return [...prevCart, book];
    });
  };

  const removeFromCart = (bookIdToRemove) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.id === bookIdToRemove);
      if (itemIndex > -1) {
        console.log('Removing from cart (one instance):', prevCart[itemIndex].title);
        const newCart = [...prevCart];
        newCart.splice(itemIndex, 1);
        return newCart;
      }
      return prevCart; // Should not happen if UI is correct
    });
  };

  // A new function to clear the entire cart could be useful too.
  const clearCart = () => {
    console.log('Clearing cart');
    setCart([]);
  };

  return (
    <Router>
      <div className="App">
        <Header cartItemCount={cart.length} />
        <main>
          <Routes>
            <Route
              path="/"
              element={<BookList books={books} />}
            />
            <Route
              path="/books/:id"
              element={<BookDetails books={books} addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<ShoppingCart cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />} // Pass clearCart
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
