import exp from 'express';
import { userApp } from './API/UserApi.js'
import {productApp} from './API/ProductApi.js'
import cookieParser from 'cookie-parser';
import {connect} from 'mongoose';
const app=exp();
const port=4000;

// connect to db server
async function connectDB() {
    try {
        await connect("mongodb://localhost:27017/anuragdb");
        console.log("Db connection is success");
        // Assign port
        app.listen(port, () => console.log(`server listening on port ${port}....`));
    } catch (err) {
        console.log("Err in db connection:", err);
    }
}

// start DB connection and server
connectDB();

app.use(exp.json())
app.use(cookieParser())
//route to mini-app route
app.use('/user-api',userApp)
app.use('/product-api',productApp)

//error handler middle ware   (without this is show HTML code) but now handled and shown as json.

app.use((err,req,res,next)=>{
    res.status(500).json({message:"error",payload:err.message})
})