const adminCollection=require('../models/admin_Schema')
const userCollection=require('../models/user_Schema')
const { generateAuthToken } = require('../middlewares/jwt');
const { request } = require('express');

module.exports.adminLogin=async(req,res)=>{
    try {
        let adminResult={
            Status:false,
            message:null, 
            token:null
            }
        let adminDetails=req.body
        const admin= await adminCollection.findOne({email:adminDetails.email})
        if (admin) {
            if (admin.password===adminDetails.password) {
                const token =generateAuthToken(admin)
                adminResult.Status=true
                adminResult.token=token
                res.json({ adminResult })
            } else {
                adminResult.message='Your Password not matched'
                res.json({ adminResult })
            }
        } else {
            adminResult.message='Your email is wrong'
            res.json({ adminResult })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports.getUserDetails=async(req,res)=>{
    try {
        const user=await userCollection.find().then((data)=>{
            res.send({data})
        }).catch(() => {
            res.status(500).send({ erroe: "no user" })
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports.deleteUser=async(req,res)=>{
    try {
        const Token=request.headers["x-access-token"]
        const userId=verifyToken(Token)
        await userCollection.deleteOne({_id: userId})
        const users= await userCollection.find({})
        res.json({"status":"success",result:users})
    } catch (error) {
        res.json({"status":"failed",message:error.message})
        console.log(error);
    }
}

module.exports.EditUser=async(req,res)=>{
    try {
        let {id}=req.query
        let userDetails=await userCollection.findOne({_id:id})
        if (userDetails) {
            res.status(200).send({ userDetails }) 
        } else {
            res.status(500).send({ error: "no user" })
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports.updateUser=async(req,res)=>{
    try {
        const userNewDetails=req.body
        const userId=userNewDetails.id
        await userCollection.findByIdAndUpdate(userId,{
            name:userNewDetails.name,
            email:userNewDetails.email,
            phone:userNewDetails.phone,
        })
        res.json({status:'success'})
    } catch (error) {
        console.log(error.message)
        res.json({status:'failed'})
    }
}


