import exp from 'express'
import { userApp } from './API/userapi.js'
import { productApp } from './API/productapi.js'

// create express app
const app = exp()

/*
//create custom middleware
function middleware1(req,res,next){
    console.log("middleware1 executed")
    next()
}
//to execute every incoming request
app.use(middleware1)
*/

// body parsing middleware
app.use(exp.json())

// routes
app.use('/user-api', userApp)
app.use('/product-api', productApp)

// server
app.listen(3000, () => console.log("server listening on port 3000"))
