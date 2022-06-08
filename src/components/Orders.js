import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

export default function Orders() {
  return (
    <div>
        <Navbar/>
        <h2>Order has been placed successfully!</h2>
        <p className='p-3 notify-para'>You will recieve notification by email with order details.</p>
        <Link to="/main" className='btn bg-dark text-white'>Go an order some more</Link>
    </div>
  )
}
