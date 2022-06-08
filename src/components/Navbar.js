import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    let cartCount=useSelector(state=>state.cart.count)
    let userName=useSelector(state=>state.cart.userName)
    const navigate=useNavigate()
    const logoutUser=()=>{
        localStorage.removeItem("setuser")
        navigate('/login')
    }
  return (
    <nav className='navbar navbar-expand-md navbar-light navbar-bg-container'>
        <div className='container-fluid'>
        <a href='#' className='navbar-brand'>
            <img src='https://www.vegrecipesofindia.com/wp-content/uploads/2020/11/pizza-recipe-2-500x375.jpg' className='logo-image'/>
        </a>
        <h1>Welcome {userName}!</h1>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav ms-auto'>
                <li className='nav-item me-1'>
                    <Link to="/main" className='btn'>Menu</Link>
                </li>
                <li className='nav-item ms-1'>
                    <Link to="/cart" className='btn '>Cart {cartCount>0?<span className='badge bg-dark'>{cartCount}</span>:""}</Link>
                </li>
                <li className='nav-item me-1'>
                    <a className='btn'>Profile</a>
                </li>
                <li className='nav-item ms-1'>
                    <button className='btn btn-outline-secondary' onClick={logoutUser}>Logout</button>
                </li>
            </ul>
        </div>
        </div>
    </nav>
  )
}
