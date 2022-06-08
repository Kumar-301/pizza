import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserdetails } from '../config/services'
import Header from './Header'

export default function Login() {
    const [userdetails,setUserdetails]=useState([])
    const [isTrue,setisTrue]=useState(false)
    useEffect(()=>{
        getUserdetails().then(res=>{
            if(res){
                setUserdetails(res.data)
            }
        })
    })
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { email: '', password: '', emailErr: '', pwdError: '', }
    );
    const addItem=(event)=>{
        const{name,value}=event.target
        setState({...state,[name]:value})
      }
    const validate1=()=>{
        let value=state.email
        let sub=value.substring(value.indexOf('@')+1);
        if(value===""){
        setState({emailErr:"Required"})
        return false
        }else if(!value.includes('@')||sub===''){
        setState({emailErr:"Enter valid Email"})
        return false
        }else {
        setState({emailErr:""})
        return true
        }
    }
    const validate2=()=>{
        let value=state.password
        let reg=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])")
        if (value==''){
            setState({pwdError:"Required"})
            return false;
        }
        else if(reg.test(value)==false){
            setState({pwdError:"the password must have atleast one, Capital letter, Small letter, Number, Special Symbols"})
            return false;
        }
        else if (value.length<5 || value.length>12){
            setState({pwdError:"the passowrd should greater than 5 and less than 12"})
            return false;
        }
        else{
            setState({pwdError:""})
            return true;
        }
    }
    const usercheck=()=>{
        let res=userdetails.some(eachuser=>eachuser.mail===state.email && eachuser.password===state.password)
        if(res){
            let userfilter=userdetails.filter(eachuser=>eachuser.mail===state.email && eachuser.password===state.password)
            let uname=userfilter[0].username
            localStorage.setItem("setuser",JSON.stringify(uname))
            setisTrue(false)
            return true
        }else{
            setisTrue(true)
            return false
        }
    }
    const validate=()=>{
        let sp1=validate1()
        let sp2=validate2()
        let sp3
        if(sp1&&sp2){
            sp3=usercheck()
        }
        console.log(sp3)
        return sp1&&sp2&&sp3
    }
    const navigate=useNavigate()
    const logintoaccount=(event)=>{
        event.preventDefault()
        const result=validate()
        if(result){
            navigate('/Main')
        }
    }
  return (
    <div>
        <Header/>
        <div>
            <h2>Login</h2>
            <form onSubmit={logintoaccount}>
                <div >
                    <input type="email" className='w-100 my-2 p-1 input-text-fields' name='email' placeholder='Enter Email' onChange={addItem}/>
                    <p className='text-danger'>{state.emailErr}</p>
                </div>
                <div>
                    <input type="password" className='w-100 my-2 p-1 input-text-fields' name='password' placeholder='Enter Password' onChange={addItem}/>
                    <p className='text-danger'>{state.pwdError}</p>
                </div>
                {isTrue?<p className='text-danger'>Email and Password doesnot exist</p>:""}
                <input type="submit" className='text-white bg-secondary' value="Login"/>
            </form>
        </div>
    </div>
  )
}
