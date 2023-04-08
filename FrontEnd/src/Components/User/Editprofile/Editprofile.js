import Axios from 'axios'
import swal from 'sweetalert'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../../../API'
import './Editprofile.css'

function Editprofile() {

    const navigate = useNavigate()
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [phone, setPhone] = useState('')
    let [oldImage, setOldimage] = useState('')
    const [image, setImage] = useState('')

    let user = useSelector((state) => state.user)
    if (!user) {
        navigate('/')
    }

    useEffect(() => {
        Axios.get(`${userAPI}userProfile`, { params: { token: user.userToken } }).then((response) => {
            setName(response.data.userDetails.name)
            setEmail(response.data.userDetails.email)
            setPhone(response.data.userDetails.phone)
            setOldimage(response.data.userDetails.image)
        }).catch(error => {
            console.log(error);
        })
    }, [user.userToken])

    const toBase64 = (image) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }).catch((err) => {
        console.log(err)
    })

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        const imgBase = await toBase64(image)
        Axios.post(`${userAPI}editProfilePhoto`, { name: name, email: email, phone: phone, token: user.userToken, image: imgBase }).then((response) => {
            if (response.data.status === 'success') {
                swal("Done", "Profile Updated", "success").then((result) => {
                    navigate('/myaccount')
                })
            } else {
                swal('Oops!!Please Login').then((result) => {
                    navigate('/login')
                })
            }
        })
    }

    return (
        <>
            <div className="container bootstrap snippets bootdey">
                <h1 className="text-primary">Edit Profile</h1>
                <hr />
                <form className="form-horizontal" role="form" onSubmit={handleUpdateProfile}>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="text-center">
                                <img className='avatar' src={oldImage ? oldImage : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'} alt='avatar' />
                                <input type="file" className="form-control" onChange={(e) => {
                                    setImage(e.target.files[0])
                                }} />
                                <button type='submit' className='custombutton'>Update Profile</button>
                            </div>
                        </div>
                        <div className="col-md-9 personal-info">
                            <h3>Personal info</h3>

                            <div className="form-group">
                                <label className="col-lg-3 control-label"> Name :</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label">Email:</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-lg-3 control-label"> Phone :</label>
                                <div className="col-lg-8">
                                    <input className="form-control" type="number" value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <hr className="mt-5" />
        </>
    )
}

export default Editprofile