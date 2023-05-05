import '../css/cart.css';


export default function Cart({items, checkout}) {

    function calculateTotal() {
        var t = 0;
        items.map((item) => {
            t = t + (item.incart * item.price)});
        return (Math.round(t * 100)/100).toFixed(2);
    }

    const cartItems = items.map(i =>
        <ul>
        <span><b>{i.name}</b>  {i.incart} * {i.price} </span>
        </ul>
    );

    return (
        
        <div className='cart'>
            <h4>Your shopping cart:</h4>
            {cartItems}
            <h4>Total = {calculateTotal()}</h4>
            <button onClick={() => {checkout()}}>Checkout</button>
        </div>
    );

}