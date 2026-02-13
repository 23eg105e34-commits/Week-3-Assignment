import exp from 'express'
import { ProductModel } from '../models/ProductModel.js'


export const productApp=exp.Router()
// get all products
productApp.get('/products',async (req,res)=>{
    // get all products 
    let products=await ProductModel.find()

    res.status(200).json({message:"all products",payload:products})
})

productApp.get('/products/:id',async (req,res)=>{
    // get obj id
    let productObjId=req.params.id
    // finding product
    let product=await ProductModel.findById(productObjId)
    //send res
    res.status(200).json({message:"product found",payload:product})

})

productApp.post('/products',async (req,res)=>{
    // get new data
    let product=req.body
    //create a new prouct doc
    let newProductDoc=new ProductModel(product)
    // saving new doc
    await newProductDoc.save()
    //send res
    res.status(200).json({message:"new product added",payload:newProductDoc})

})

//put using pid
productApp.put('/products/:pid',async (req,res)=>{
    //get obj id
    let producObjId=req.params.pid
    // get passed data
    let modifiedProduct=req.body
    // update and return modified product
    let latestProduct=await ProductModel.findByIdAndUpdate(producObjId,
        {$set:{...modifiedProduct}},
        {new:true,runValidators:true}
    )
    //send res
    res.status(200).json({message:"product updated",payload:latestProduct})

})
