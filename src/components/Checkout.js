import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Checkout() {
    let check=useSelector(state=>state.cart.some)
  return (
    <div>
        <Navbar/>
        <h2>Checkout</h2>
        <label for="credit">Credit Card</label>
        <input type="text" id='credit' className='form-control' placeholder='Enter 16-digit card number'/>
        <p>Order Total: $ {check}</p>
        <Link to="/orderplaced" className='btn bg-dark text-white'>Checkout</Link>
    </div>
  )
}
