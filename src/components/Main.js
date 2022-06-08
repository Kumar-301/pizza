import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getProduct, getProductbyId } from '../config/services'
import { increaseCart } from '../redux/counter'
import Navbar from './Navbar'

export default function Main() {
  let dispatch=useDispatch()
  const[menu,setMenu]=useState([])
  useEffect(()=>{
    getProduct().then(res=>setMenu(res.data))
  },[])
  const addTocart=(id)=>{
    getProductbyId(id).then(res=>{
      if(localStorage.getItem('delivery')!=undefined){
        let arr=JSON.parse(localStorage.getItem('delivery'))
        let arrId=[]
        if(arr.length>0){
          arr.map(items=>{
            let itemsId=items.id
            arrId.push(itemsId)
          })
        }
        if(arrId.includes(id)){
          alert("Already Added")
        }else{
          arr.push(res.data)
          localStorage.setItem("delivery",JSON.stringify(arr))
          alert("Product Added")
          dispatch(increaseCart())
        }
      }else{
        const arr=[]
        arr.push(res.data)
        localStorage.setItem("delivery",JSON.stringify(arr))
        dispatch(increaseCart())
      }
    })
  }
  return (
    <div>
      <Navbar/>
      <div>
        <h2>Menu</h2>
        <div className='row justify-content-center align-items-center'>
          {menu.map(item=>
            <div key={item.id} className="card col-md-3 col-sm-12 m-4 p-3 d-flex flex-column justify-content-center align-items-center">
              <img src={item.imgUrl} className="pizza-image align-self-center"/>
              <h3 className='text-center card-title'>{item.title}</h3>
              <div className='d-flex justify-content-between align-items-center'>
                <button className='btn bg-dark text-white' onClick={()=>addTocart(item.id)}>Add to Cart</button>
                <p className='ps-5 align-self-center'>${item.price}</p>
              </div>
            </div>
            )}
        </div>
      </div>
    </div>
  )
}
