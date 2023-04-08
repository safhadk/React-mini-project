/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserActions } from '../../../Store/Userauth'

import './Header.css'

function Header() {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const user = useSelector((state)=>state.user.userToken)
    const UserLogout=()=>{
        dispatch(UserActions.userLogout())
        navigate('/login')
    }

  return (
    <div className='navbar'>
    <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
            <button style={{ background: "white" }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li   className="nav-item">
                              <a style={{ color: 'white' }} id="home" onClick={() => { navigate('/') }} className="nav-link active" aria-current="page">Home</a>
                    </li>
                    <li   className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link">Shop</a>
                    </li>
                    <li   className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link">About</a>
                    </li>
                    <li   className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link" >Contacts</a>
                    </li>
                    <li   className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link">Cart</a>
                    </li>
                    <li   className="nav-item">
                        <a style={{ color: 'white' }} className="nav-link">Orders</a>
                    </li>
                </ul>
            </div>

            {user ? <button onClick={()=>{ navigate('/myaccount') }} type="button" className="btn btn" >My Account</button> : null}
            {user ? <button onClick={UserLogout} type="button" className="btn btn">Logout</button> : <button onClick={()=>{navigate('/login')}} type="button" className="btn btn">Login</button>}
            </div>
    </nav>

</div>
  )
}

export default Header