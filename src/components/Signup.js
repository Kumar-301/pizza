import React, { useReducer } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import {postUsers} from '../config/services'
export default function Signup() {
    const [state, setState] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        { username: '', mail:"", password: '', confirmPwd:"", userErr: '',mailErr:"", pwdError: '', confirmPwdErr:"" }
    );
    const addItem=(event)=>{
        const{name,value}=event.target
        setState({...state,[name]:value})
      }
    const navigate=useNavigate()
    const validate1=()=>{
        let value=state.username
        let reg=new RegExp('^[A-Za-z]+$')
        if(value===""){
          setState({userErr:"Required"})
          return false
        }else if(!reg.test(value)){
          setState({userErr:"Enter only Alphabets & Spaces not allowed"})
          return false
        }else {
          setState({userErr:""})
          return true
        }
    }
    const validate2=()=>{
        let value=state.mail
        let sub=value.substring(value.indexOf('@')+1);
        if(value===""){
            setState({mailErr:"Required"})
            return false
        }else if(!value.includes('@')||sub===''){
            setState({mailErr:"Enter valid Email"})
            return false
        }else {
            setState({mailErr:""})
            return true
        }
    }
    const validate3=()=>{
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
    const validate4=()=>{
        let value1=state.password
        let value2=state.confirmPwd;
        if (value2==''){
            setState({confirmPwdErr:"Required"})
            return false;
        }
        else if (value2!==value1){
            setState({confirmPwdErr:"Enter the correct password"})
            return false;
        }
        else{
            setState({confirmPwdErr:""})
            return true;
        }
    }
    const validate=()=>{
            const sp1=validate1()
            const sp2=validate2()
            const sp3=validate3()
            const sp4=validate4()
            return sp1&&sp2&&sp3&&sp4
    }
    const logintoaccount=(event)=>{
        event.preventDefault()
        let result=validate()
        if(result){
            console.log(state)
            postUsers(state)
            navigate('/login')
        }
    }
  return (
    <div>
        <Header/>
        <div>
            <h2>Signup</h2>
            <form onSubmit={logintoaccount}>
            <div className='form-group'>
                <label htmlFor="pname">Enter Username</label>
                <input id='pname' type="text" name='username' className='w-100 my-2 p-1 input-text-fields' onChange={addItem}/>
                <p className='text-danger'>{state.userErr}</p>
            </div>
            <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input id='email' type="email" name='mail' className='w-100 my-2 p-1 input-text-fields' onChange={addItem}/>
                <p className='text-danger'>{state.mailErr}</p>
            </div>
            <div className='form-group'>
                <label htmlFor="pass">Password</label>
                <input id='pass' type="password" name='password' className=' w-100 my-2 p-1 input-text-fields' onChange={addItem}/>
                <p className='text-danger'>{state.pwdError}</p>
            </div>
            <div className='form-group'>
                <label htmlFor="conpass">Confirm Password</label>
                <input id='conpass' type="password" name='confirmPwd' className='w-100 my-2 p-1 input-text-fields' onChange={addItem}/>
                <p className='text-danger'>{state.confirmPwdErr}</p>
            </div>
            <input type="submit" className='text-white bg-secondary' value="Signup"/>
            </form>
        </div>
    </div>
  )
}
