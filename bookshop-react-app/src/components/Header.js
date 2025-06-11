// bookshop-react-app/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

// Added cartItemCount prop
function Header({ cartItemCount }) {
  return (
    <header>
      <h1>Bookshop</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/cart">Cart ({cartItemCount})</Link> {/* Display item count */}
      </nav>
    </header>
  );
}

// Add default prop for cartItemCount for when it might not be passed
Header.defaultProps = {
  cartItemCount: 0
};

export default Header;
