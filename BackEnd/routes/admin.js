const express=require('express')
const router=express.Router()
const adminController= require('../controllers/adminController')

router.post('/adminLogin',adminController.adminLogin)

router.get('/getUserDetails',adminController.getUserDetails)

router.post('/deleteUser',adminController.deleteUser)

router.get('/userDetails',adminController.EditUser)

router.post('/updateUser',adminController.updateUser)



module.exports=router