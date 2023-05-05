import './App.css';
import Item from './Components/Item';
import Cart from './Components/Cart';
import Payment from './Components/Payment';
import { useEffect, useState } from 'react';


function App() {

  const [items, setItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [total, setTotal] = useState(0);

  //Retreive Inventory using the backend api
  useEffect (() => {
    fetch('http://localhost:8080/inventory')
      .then((response) => response.json())
      .then((data) =>{  
        //Add the items returned to the state of the app along with the 'incart' quantity initialized to 0
        const newItems = data.map((item, i) => {
          item.incart = 0;
          return item;
        });
        setItems(newItems);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  //Function to Post the sale transaction to the backend
  const addSale = async (saleItems) => {
    await fetch('http://localhost:8080/transactions', {
      method: 'POST',
      body: JSON.stringify({
        items: saleItems,
        amount: total
      }),
      headers: {
       'Content-type': 'application/json;',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      //Empty the cart on successful response
      const newItems = items.map((item, i) => {
        item.incart = 0;
        return item;
      });
      setItems(newItems);
      setTotal(0);
    })
    .catch((err) => {
       console.log(err.message);
    });
  };
    
  //Handler when the user clicks on the Add to Cart button of any of the items
  function handleAddToCart(itemtype) {
    const newItems = items.map((item, i) => {
      if (item.name === itemtype) {
        // Increment the incart  value and decrement quantity
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

  //Handler when the user clicks on the Remove from Cart button of any of the items
  function handleRemoveFromCart(itemtype) {
    const newItems = items.map((item, i) => {
      if (item.name === itemtype) {
        console.log(item.incart);
        // Decrement the incart value and increment quantity
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

  //Calculate the total price of the items in the cart
  function calculateTotal() {
    var t = 0;
    items.map((item) => {
        t = t + (item.incart * item.price)});
    setTotal((Math.round(t * 100)/100).toFixed(2));
  }

  //Show the Payment component on clicking Checkout
  function handleCheckout() {
    if(total > 0) {
      setShowPayment(!showPayment);
    }
  }

  //Handler when the user clicks Complete Purchase in the Payment component
  function handlePayment() {
    setShowPayment(!showPayment);
    const saleItems = items.map((item, i) => {
      const s = {"name": item.name, "quantity": item.incart, "price": item.price}
      return s;
    });
    addSale(saleItems);
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
