import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { increaseCart, increaseTotal } from '../redux/counter'
import Navbar from './Navbar'

export default function Cart() {
  let dispatch=useDispatch()
  const [details,setDetails]=useState([])

  useEffect(()=>{
    if(localStorage.getItem('delivery')!=undefined){
      const arr=JSON.parse(localStorage.getItem('delivery'))
      setDetails(arr)
    }
  },[])

  const deleteCart=(id)=>{
    if(localStorage.getItem('delivery')!=undefined){
      const arr=JSON.parse(localStorage.getItem('delivery'))
      let newArray=arr.filter(item=>item.id!==id)
      localStorage.setItem('delivery',JSON.stringify(newArray))
      setDetails(newArray)
      dispatch(increaseCart())
    }
  }
  let total=0
  return (
    <div>
        <Navbar/>
        <h1 className='header-borders'>Shopping Cart</h1>
        <table className='w-100'>
          <tbody>
            {details.map(items=>(
              total+=items.price,
              dispatch(increaseTotal(total.toFixed(1))),
              <tr className='borders' key={items.id}>
                <td><img src={items.imgUrl} className="cart-images"/></td>
                <td><h3>{items.title}</h3></td>
                <td><p>${items.price}</p></td>
                <td><input type="number" className='w-10' value="1"/></td>
                <td><button className='btn bg-dark text-white' onClick={()=>deleteCart(items.id)}>Delete</button></td>
              </tr>
              ))}
              <tr>
              <td></td>
              <td></td>
              <td><h3>${total.toFixed(1)}</h3></td>
              <td></td>
              <td><Link to="/checkout" className='btn bg-dark text-white'>Checkout</Link></td>
              <td></td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}
