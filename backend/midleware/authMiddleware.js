const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler");
const User = require("../models/UserModel");

const protect= asyncHandler( async (req,res,next)=>{
    let token ; 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") )
    {
        try {
            token= req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)
            req.user=await User.findById(decoded.id).select("-password")
            next()
            
        } catch (error) {
            
        }
    }
    if(!token)
    {
        res.status(401)
        throw new Error("Not authorized")
    }

})

const admin=(req,res,next)=>{
    console.log(req.user.isAdmin)
    if( req.user.isAdmin=="true"){
        console.log("admin")
        next()
    }else{
        res.status(401) 
        throw new Error("not authorized as an admin")

    }
}
module.exports={protect,admin}