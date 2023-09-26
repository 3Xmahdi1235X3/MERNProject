const express=require("express");
const path = require("path")
const dotenv=require("dotenv");
const connectDb=require("./config/db")
const cors = require("cors");
const productRoutes=require("./routes/ProductRoutes")
const userRoutes=require("./routes/UserRoutes")
const orderRoutes=require("./routes/OrderRoutes")
const uploadRoutes=require("./routes/UploadRoutes")
const {notFound, errorHandler}=require("./midleware/errorMiddleware")
const morgan = require("morgan")
dotenv.config();
connectDb();
var bodyParser = require('body-parser')

const app=express()


app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
 
  
app.options("*", cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use("/api/products",productRoutes)
app.use("/api/users",userRoutes)
app.use("/api/orders",orderRoutes)
app.use("/api/upload",uploadRoutes)
const _dirname = path.resolve()
console.log(_dirname)
app.use("/uploads",express.static(path.join(_dirname,"/uploads")))
app.get("/api/config/paypal",(req,res)=>res.send(process.env.PAYPAL_CLIENT_ID))
app.use(errorHandler)
app.use(notFound)

app.listen(5000,console.log("runn"))