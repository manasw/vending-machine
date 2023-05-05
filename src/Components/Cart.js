import '../css/cart.css';

//Shopping Cart Component
export default function Cart({items, total, checkout}) {

    const cartItems = items.map(i =>
        <ul>
        <span><b>{i.name}</b>  {i.incart} * {i.price} </span>
        </ul>
    );

    return (
        
        <div className='cart'>
            <h4>Your shopping cart:</h4>
            {cartItems}
            <h4>Total = {total}</h4>
            <button onClick={() => {checkout()}}>Checkout</button>
        </div>
    );

}