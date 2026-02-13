import { Schema, model } from 'mongoose'

// create user schema
const userSchema = new Schema({
    pid: {
        type: Number,
        required: [true, "pid is required"],
        minLength: [4, "Min length should be 4"],
        maxLength: [6, "Max length exceeded"]
    },
    productName:{
        type: String,
        required: [true, "product name is required"]
    }, 
    price:{
        type: Number,
        required: [true, "price is required"],
        min: [1, "Price should be above 1"],
        max: [10000, "Price should be below 10000"]
    }
})

// create user model
export const ProductModel = model('product', userSchema)
