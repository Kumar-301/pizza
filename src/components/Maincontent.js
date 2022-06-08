import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
export default function Maincontent() {
  return (
      <div>
          <Header/>
          <div className='bg-container p-5'>
            <h1>Pizza Delivery</h1>
            <p>Welcome to Pizza delivery service. This is the place when you may choose  the most
                delicious pizza you like from wide variety of options!
            </p>
            <hr/>
            <p>We're performing delivery freeof charge in case if your order is higher than 20$</p>
            <Link to="/login" className="btn bg-secondary text-white text-center d-block">Sign in and Order</Link>
    </div>
      </div>
  )
}
