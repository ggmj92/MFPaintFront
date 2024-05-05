import React, { useEffect } from 'react';

function CartPopup({ cart, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="cart-popup">
      <h2>Cart Preview</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <div>
              <strong>Title:</strong> {item.title}
            </div>
            <div>
              <strong>Artist:</strong> {item.artist}
            </div>
            <div>
              <strong>Price:</strong> ${item.price}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CartPopup;
