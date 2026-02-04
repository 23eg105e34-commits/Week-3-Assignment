import exp from 'express'

export const productApp=exp.Router()
      
      
let products=[]
   
   
   //getting all products
    productApp.get('/products',(req,res)=>{
        res.status(200).json({message:"products data",payload:products})
    })

    //get using id
    productApp.get('/products/product-id/:id',(req,res)=>{
        let id=Number(req.params.id)
        let product=products.find((e)=>e.productId===id)
        if(!product) res.status(404).json({message:"Product Not Found of that id"})
        else res.status(200).json({message:"Prouduct Found",payload:product})
    })

    //get using brand
    productApp.get('/products/product-brand/:brand',(req,res)=>{
        let brand=req.params.brand

        let product=products.find((e)=>e.brand===brand)
        if(!product) res.status(404).json({message:"Product Not Found of that brand"})
        else res.status(200).json({message:"Prouduct Found",payload:product})
    })

    //post new product
    productApp.post('/products',(req,res)=>{
        let newProduct=req.body

        products.push(newProduct)
        res.json({message:"Added new Product"})
    })

    productApp.put('/products/:id',(req,res)=>{
        let id=Number(req.params.id)
        let newProduct=req.body
        let productIndex=products.findIndex((e)=>e.productId=id)
        if(productIndex===-1) return res.status(404).json({message:"product not found"})

        let deletedProduct=products.splice(productIndex,1,newProduct)
        res.status(201).json({message:"product modified sucessfully"})

    })

    productApp.delete('/products/:id',(req,res)=>{
        let id=Number(req.params.id)
        let productIndex=products.findIndex((e)=>e.productId=id)
        if(productIndex===-1) return res.status(404).json({message:"product not found"})

        let deletedProduct=products.splice(productIndex,1)
        res.status(201).json({message:"product deleted sucessfully",payload:deletedProduct})
    })