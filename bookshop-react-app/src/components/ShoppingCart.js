// bookshop-react-app/src/components/ShoppingCart.js
import React from 'react';
import './ShoppingCart.css';

// Added clearCart prop
function ShoppingCart({ cartItems, removeFromCart, clearCart }) {
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="shopping-cart">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={`${item.id}-${index}`} className="cart-item">
            <div>
              <h3>{item.title}</h3>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <button className="danger" onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total.toFixed(2)}</h3>
      {/* Add Clear Cart button if cart is not empty */}
      {cartItems.length > 0 && (
        <button className="danger" onClick={clearCart} style={{ marginTop: '20px', float: 'right' }}>
          Clear Cart
        </button>
      )}
    </div>
  );
}

export default ShoppingCart;
