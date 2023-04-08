import  Axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAPI } from '../../../API'

function Myaccount() {

  const navigate=useNavigate()
  const [UserData,setUserData]=useState({})

  let user = useSelector((state)=>state.user)
  if (!user) {
    navigate('/')
  }

  useEffect(()=>{
    Axios.get(`${userAPI}userProfile`,{params: { token: user.userToken}}).then((response)=>{
    setUserData(response.data.userDetails)
    }).catch(error=>{
      console.log(error);
      })
  },[user.userToken])

  return (
    <div>
        <section className="vh-100" style={{backgroundColor:'wheat'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-12 col-xl-4">

        <div className="card" style={{borderRadius:'15px'}}>
          <div className="card-body text-center">
            <div className="mt-3 mb-4">
                <img src={UserData.image?UserData.image:'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp'}alt="demo" 
                className="rounded-circle img-fluid" style={{width:'100px'}}/>
            </div>
            <h4 className="mb-2">{UserData.name}</h4>
            <p className="text-muted mb-4">{UserData.email}</p>
            
            <button onClick={()=>{navigate('/editaccount')}} type="button" className="btn btn-primary btn-rounded btn-lg">
              Update
            </button>
            <div className="d-flex justify-content-center text-center mt-5 mb-2">
            
              <div className="px-3">
                <p className="mb-2 h5">{UserData.phone}</p>
                <p  className="mb-0" style={{color:'red'}}>{UserData.image ? null :'Please Update Your Photo!!'}</p>
              </div>
             
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Myaccount