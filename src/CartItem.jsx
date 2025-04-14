import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    //reduce sirve para obtener un solo numero de una lista
    return cart.reduce( (total, item) => {
      const itemCost = parseFloat(item.cost.replace('$', '').trim());
      const itemQuantity = Number(item.quantity);
      if (!isNaN(itemCost) && !isNaN(itemQuantity)) {
        return total + (itemCost*itemQuantity)
      }
      return total;
    },0)
  };

  const handleContinueShopping = (onContinueShopping) => {
   if (onContinueShopping) {
    onContinueShopping();
   }else{
    console.log('Continuar comprando clickeado');
    
   }
  };


  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity -1 === 0) {
      dispatch(removeItem( {name:item.name}));
      
    }else{
      dispatch(updateQuantity( {name:item.name, quantity: item.quantity -1 }));
    }
  };

  const handleRemove = (item) => {
    console.log(item);
    
    dispatch(removeItem({name: item.name}));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '').trim());
    const quantity = item.quantity;
    return cost*quantity;
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button onClick={handleCheckoutShopping} className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


