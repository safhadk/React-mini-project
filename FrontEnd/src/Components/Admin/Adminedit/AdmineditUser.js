import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { adminAPI } from '../../../API'
import swal from 'sweetalert'

function AdmineditUser() {
    const { id } = useParams()
    const navigate = useNavigate()
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')


    let user = useSelector((state) => state.Admin)
    if (!user) {
        navigate('/admin')
    }

    useEffect(() => {
        Axios.get(`${adminAPI}userDetails?id=${id}`,{headers:{"x-access-admin-token":user.userToken}}).then((response) => {
            setName(response.data.userDetails.name)
            setEmail(response.data.userDetails.email)
            setPhone(response.data.userDetails.phone)
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const handleEditUser = async (e) => {
        e.preventDefault();
        console.log(name+email+phone)
        Axios.post(`${adminAPI}updateUser`, {id:id, name: name, email: email, phone: phone }).then((response) => {
            if (response.data.status === 'success') {
                swal("Done", "User Updated", "success").then((result) => {
                    navigate('/admin')
                })
            } else {
                swal('Oops!!Please Login').then((result) => {
                    navigate('/login')
                })
            }
        })
    }
    return (
        <div >
            <div className="container ">
                <h1 className="fw-bold mb-5 text-center">Edit Details</h1>
                <form onSubmit={handleEditUser}>
                    <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example1"> name</label>
                        <input name="Name" type="text" id="username" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="form-outline mb-4 mt-5">
                        <label className="form-label" for="form2Example1">Email address</label>
                        <input type="email" id="userEmail" className="form-control" name="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example1"> phone</label>
                        <input name="phone" type="number" id="username" className="form-control" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    </div>

                    <div className="text-center">
                        <small className="text-danger"></small>
                    </div>
                    <div className="text-center">
                        <button id="btn-submit" type="submit" className="btn btn-primary btn-block mb-4">Update Now</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default AdmineditUser