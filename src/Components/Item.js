
import '../css/item.css';

//Inventory Item Component
export default function Item({item, increment, decrement}) {


    return (
        <div className='item'>
            <div className='category'>
                <span>{item.name}</span>
            </div>
            <h4>Quantity Remaining - {item.quantity}</h4>
            <h4>Price - ${item.price}</h4>
            <div className='item-bottom'>
                <button onClick={() => {decrement(item.name)}}>Remove from Cart</button>
                <button onClick={() => {increment(item.name)}}>Add to Cart</button>
            </div>
        </div>
    );
}