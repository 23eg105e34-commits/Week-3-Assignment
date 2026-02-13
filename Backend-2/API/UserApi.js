import exp from 'express'
import { UserModel } from '../models/UserModel.js'
import bcrypt,{hash,compare} from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { verifyToken } from './middlewares/verifyToken.js'
export const userApp=exp.Router()

//user api routes




userApp.get('/users',async (req,res)=>{
    //read users form database
    let users=await UserModel.find({},{name:1,_id:0,age:1})

    res.json({message:"users",payload:users})
})


userApp.post('/users',async (req,res)=>{
    //get new user form req
    let newUser=req.body;

    //hash the password
    let hashedPassword=await hash(newUser.password,12)

    //replace plain password with hashed password
    newUser.password=hashedPassword
    //craete new user document
    let newUserDoc=await UserModel.create(newUser)



    //save new doc
    await newUserDoc.save()
    res.json({message:"new user craeted",payload:newUserDoc})


})

//read user by ObjectId
userApp.get('/users/:id',async (req,res)=>{
    //get obj id from user param
    let objId=req.params.id
    // find the user uning obj id
    let userObj=await UserModel.findById(objId)

    res.status(200).json({message:"user found",payload:userObj})

})

//upadte user by id
userApp.put('/users/:id',async (req,res)=>{
    //get obj id from url
    let objId=req.params.id
    //modifiy the user
    let modifiedUser=req.body
    //make update
    let lastesUser=await UserModel.findByIdAndUpdate(objId,
        {$set:{...modifiedUser}},
        {new:true})
    //send res
    res.status(200).json({message:"user modified and retured",payload:lastesUser})
})

//delete user by id
userApp.delete('/users/:id',async (req,res)=>{
    //get obj id
    let objId=req.params.id
    //delete the user
    let deletedUser=await UserModel.findByIdAndDelete(objId)
    //send res
    res.status(200).json({message:"user deleted",payload:deletedUser})

})

userApp.post('/auth',async (req,res)=>{
    //get user cred from req body
    let userCred=req.body
})

