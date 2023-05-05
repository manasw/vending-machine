import '../css/payment.css';

//Payment Form Component
export default function Payment({processPayment}) {

    return (
        <div className='payment'>
            <h4>Enter your payment information</h4>
            
            <label>Cardholder's name: </label><br />
            <input type="text" className='input'></input><br />
            <label>Credit Card number: </label><br />
            <input type="text" className='input'></input><br />
            <label>CVV: </label><br />
            <input type="text" className='input'></input><br />
            <label>Expiry date: </label><br />
            <input type="text" className='input'></input><br />
            <label>Zipcode: </label><br />
            <input type="text" className='input'></input><br /><br />
            <button onClick={() => {processPayment()}}>Complete Purchase</button>
            
        </div>
    );
}
