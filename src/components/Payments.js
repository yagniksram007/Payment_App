import React, { useState } from 'react'
import axios from 'axios';

const Payments = () => {
    const [amount, setAmount] = useState(100);
    const handlePayment = async () =>{
        const orderUrl = 'http://localhost:5000/api/payment/order';

        try {
            const {data } = await axios.post(orderUrl, {
                amount, 
                currency:'INR',
                receipt: "receipt#1"
            })
            console.log(data)
            const options ={
                //key: '',
                amount: data.amount,
                currency: data.currency,
                name: "Your Company name",
                descripton: "Test Transaction",
                order_id : data.id,
                handler: function(response){
                    alert(response.razorpay_payment_id);
                    alert(response.razorpay_order_id);
                    alert(response.razorpay_signature);
                },
                prefill: {
                    name: 'Your Name',
                    email: 'youremail@example.com',
                    contact: '9876543219'
                },
                notes:{
                    address: 'Your address'
                },
                theme: {
                    color: '#F37254'
                }
            }

            const rzp1 = new Window.Razorpay(options);
            rzp1.open()
        } catch (err) {
            console.log(err)
        }
    } 

  return (
    <div>
      <h2>Make a payment</h2>
      <button onClick={handlePayment}>Pay {amount} INR</button>
    </div>
  )
}

export default Payments
