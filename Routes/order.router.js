const express=require("express")
const OrderModel = require("../Models/order.model")

const OrderRouter=express.Router()


OrderRouter.post("/orders",async(req,res)=>{
    try {
       

        const newOrder= new OrderModel(req.body)
             await newOrder.save()
             return res.status(201).send({msg:"New Order added",newOrder})
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})


OrderRouter.get("/orders/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const allOrders= await OrderModel.findOne({_id:id}).populate("user").populate("restaurant")
    return res.status(200).send(allOrders)
    } catch (error) {
        return res.status(401).send({msg:error.message})
    }
})

// OrderRouter.patch("/orders/:id",async(req,res)=>{
//     try {
//         const {id}=req.params
//         const {status}=re.body
//         const updateorder= await OrderModel.findByIdAndUpdate({_id:id},{status})
//     return res.status(201).send({msg:"order updated",updateorder})
//     } catch (error) {
//         return res.status(401).send({msg:error.message})
//     }
// })

module.exports=OrderRouter