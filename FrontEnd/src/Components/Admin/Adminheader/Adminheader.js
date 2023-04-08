import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AdminActions } from '../../../Store/Adminauth'
import './Adminheader.css'

function Adminheader() {

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const UserLogout=()=>{
        dispatch(AdminActions.AdminLogout())
        navigate('/admin/')
    }

  return (
    <div className='navbar'>
    <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
            <button style={{ background: "white" }} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li  className="nav-item">
                        <a  style={{ color: 'white' }} id="home" className="nav-link active" aria-current="page">Home</a>
                    </li>
                </ul>
            </div>
            <button onClick={UserLogout} type="button" className="btn btn">Logout</button>             
        </div>
    </nav>
    </div>
)}

export default Adminheader