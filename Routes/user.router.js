const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const UserModel = require("../Models/user.model")

const UserRouter=express.Router()


UserRouter.post("/register",async(req,res)=>{

    try {
        const {name,email,password,address}=req.body
        const isUserPresent= await UserModel.findOne({email})
        if(isUserPresent){
            return res.status(401).send({msg:"User Already Exist"})
        }
        bcrypt.hash(password,5,async(err,hash)=>{
             const newUser= new UserModel({name,email,password:hash,address})
             await newUser.save()
             return res.status(201).send({msg:"Registration Succesful",newUser})
        })
        
    } catch (err) {
        return res.status(401).send({msg:err.message})
    }
   
})

UserRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const isUserPresent= await UserModel.findOne({email})
        if(!isUserPresent){
            return res.status(401).send({msg:"User Not Exist"})
        }
        bcrypt.compare(password,isUserPresent.password,async(err,result)=>{
            if(result){
                const token=jwt.sign({userid:isUserPresent._id},"jammi",{expiresIn:"3h"})
                return res.status(201).send({msg:"Login Succesful",token,isUserPresent})
            }else{
                return res.status(401).send({msg:"Wrong Credentials"})
            }
        })
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

UserRouter.patch("/user/:id/reset",async(req,res)=>{
    try {
        const {id}=req.params
        const {currPass,newPass}=req.body

        const user =await UserModel.findOne({_id:id})
        bcrypt.compare(currPass,user.password,async(err,result)=>{
            if(result){
                const newhashPassword=bcrypt.hashSync(newPass,5)
                const  Updateuserpass= await UserModel.findByIdAndUpdate({_id:id},{password:newhashPassword})
                return res.status(201).send({msg:"Password Updated"})
            }else{
                return res.status(401).send({msg:"Wrong Current Password"})
            }
        })

    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

module.exports=UserRouter