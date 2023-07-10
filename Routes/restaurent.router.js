const express=require("express")
const RestaurentModel = require("../Models/restaurent.model")
const RetaurentRouter=express.Router()


RetaurentRouter.post("/post",async(req,res)=>{
    try {
       

        const newRestaurent= new RestaurentModel(req.body)
             await newRestaurent.save()
             return res.status(201).send({msg:"New Restaurent added",newRestaurent})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

RetaurentRouter.get("/restaurants",async(req,res)=>{
    try {
        const allRestaurent= await RestaurentModel.find()
    return res.status(200).send(allRestaurent)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

RetaurentRouter.get("/restaurants/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const Restaurent= await RestaurentModel.findOne({_id:id})
    return res.status(200).send({msg:"Specific",Restaurent})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})
RetaurentRouter.get("/restaurants/:id/menu",async(req,res)=>{
    try {
        const {id}=req.params
        const Restaurent= await RestaurentModel.findOne({_id:id})
    return res.status(200).send(Restaurent.menu)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

RetaurentRouter.patch("/restaurants/:id/menu",async(req,res)=>{
    try {
        const {id}=req.params
        const updatemenu= await RestaurentModel.findByIdAndUpdate({_id:id},{$push:{menu:req.body}})
    return res.status(201).send({msg:"menu updated",updatemenu})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})
module.exports=RetaurentRouter