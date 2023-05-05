import './App.css';
import Item from './Components/Item';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import { useState } from 'react';


function App() {

  let initialItems = [
      {name: "Soda", quantity: 25, incart: 0, price: 0.90},
      {name: "Candy Bar", quantity: 25, incart: 0, price: 0.60},
      {name: "Chips", quantity: 25, incart: 0, price:0.99},
  ];

  const [items, setItems] = useState(
    initialItems
  );

  const [showPayment, setShowPayment] = useState(false);

  function handleAddToCart(itemtype) {
    const newItems = items.map((item, i) => {
      if (item.name === itemtype) {
        console.log(item.quantity);
        // Increment the item quantity
        if(item.quantity > 0) {
          item.quantity-- ;
          item.incart++;
        }
        return item;
      } else {
        // The rest haven't changed
        return item;
      }
    });
    setItems(newItems);
  };

  function handleRemoveFromCart(itemtype) {
    const newItems = items.map((item, i) => {
      if (item.name === itemtype) {
        console.log(item.incart);
        // Decrement the item quantity
        if(item.incart > 0) {
          item.quantity++;
          item.incart--;
        }
        return item;
      } else {
        // The rest haven't changed
        return item;
      }
    });
    setItems(newItems);
  };

  function handleCheckout() {
    console.log(showPayment)
    setShowPayment(!showPayment);
  }

  function handlePayment() {
    setShowPayment(!showPayment);
    const newItems = items.map((item, i) => {
      item.incart = 0;
      return item;
    });
    setItems(newItems);

  }

  const menuItems = items.map(i =>
    <Item item={i} increment={handleAddToCart} decrement={handleRemoveFromCart}></Item>
  );

  return (
    <div className="App">
        <h2>Welcome to the Vending Machine</h2>
        <div className='items'>
        {menuItems}
        </div> 
        <div className ='cart'>
        <Cart items={items} checkout={handleCheckout}></Cart>
        </div>
        {showPayment ?   
          <div className ='payment'>
          <Payment processPayment={handlePayment}></Payment>
          </div> : null
        }
    </div>
  );
}

export default App;
