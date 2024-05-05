import React from 'react';

function Cart({ cart }) {
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart && cart.map((item, index) => (
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

export default Cart;

