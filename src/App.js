import './App.css';
import Item from './Components/Item';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import { useEffect, useState } from 'react';


function App() {

  const [items, setItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect (() => {
    fetch('http://localhost:8080/inventory')
      .then((response) => response.json())
      .then((data) =>{  
        //console.log(data.items);
        const newItems = data.items.map((item, i) => {
          item.incart = 0;
          return item;
        });
        setItems(newItems);
        //console.log(newItems);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  const addSale = async () => {
    await fetch('http://localhost:8080/transactions', {
    method: 'POST',
    body: JSON.stringify({
       soda: 1,
       candy: 1,
       chips: 1,
       amount: total
    }),
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
       'Access-Control-Allow-Methods': ["POST","GET","OPTIONS","DELETE","PUT",],
       'Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Origin': '*',
    },
    })
    .then((response) => response.json())
    .then((data) => {
    })
    .catch((err) => {
       console.log(err.message);
    });
    };
    

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
    calculateTotal();
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
    calculateTotal();
  };

  function calculateTotal() {
    var t = 0;
    items.map((item) => {
        t = t + (item.incart * item.price)});
    setTotal((Math.round(t * 100)/100).toFixed(2));
  }


  function handleCheckout() {
    if(total > 0) {
      setShowPayment(!showPayment);
    }
  }

  function handlePayment() {
    setShowPayment(!showPayment);
    const newItems = items.map((item, i) => {
      item.incart = 0;
      return item;
    });
    setItems(newItems);
    addSale();
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
        <Cart items={items} total={total} checkout={handleCheckout}></Cart>
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
