 


const User = require("../models/UserModel")
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken");
const createTransporter = require("../config/mailer");

const authUser =asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password)))
    {     res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
    }else{
        res.status(401).json({message:"Invalid email or password"})
      //  throw new Error("Invalid email or password")
    }


   
}) ; 
const registerUser =asyncHandler(async (req,res)=>{
    const {name , email,password}=req.body
    const userExist = await User.findOne({email})
    if(userExist)
    {
        res.status(400)
        throw new Error("User already exist")
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if(user){
        res.status(201).json({
            _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
        })
        let transporter = createTransporter();

        // create an email message object
        let message = {
          from: 'omarlengliz12@gmail.com',
          to: user.email,
          subject: 'Account created ',
          html: `
            <h2>ccount created</h2>
            <p>Dear customer,</p>
            <p>Your account has been created successfully !</p>
            <p>Thank you for your register!</p>
          `
        };
        
        // send the email using the transporter object
        transporter.sendMail(message, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
    }else{
        res.status(400).json({message:"invalid user data"})
        throw new Error("invalid user data")
    }


   
}) ; 
const getUserProfile =asyncHandler(async (req,res)=>{
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error("User not found!")
    }


   
}) ; 


const updateUserProfile =asyncHandler(async (req,res)=>{
    
    const user = await User.findById(req.user._id)
    if(user){
        console.log(req.body)
      user.name=req.body.name|| user.name

      user.email=req.body.email|| user.email
      if(req.body.password)
      {
        user.password=req.body.password
      }
      const updatedUser =await user.save()
      res.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
    })

    }else{
        res.status(404) 
        throw new Error("User not found!")
    }


   
}) ; 

const getUsers= asyncHandler(async (req,res)=>{
    const users = await User.find({})
    res.json(users)

})

const deleteUser =asyncHandler(async (req,res)=>{

    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:"user removed"})
    }else{
        res.status(404)
        throw new Error("User not found!")
    }




})

const getUserById =asyncHandler(async (req,res)=>{
    const user =await User.findById(req.params.id).select("-password")
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message:"User not found"})
    }

})


const updateUser =asyncHandler(async (req,res)=>{
    
    const user = await User.findById(req.params.id)
    console.log("\n -------"+  req.body.isAdmin)
    if(user){
        console.log(req.body)
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
     user.isAdmin=req.body.isAdmin 
   
      const updatedUser =await user.save()
      console.log("fking" + updateUser.isAdmin)
      res.json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin,
    })

    }else{
        res.status(404) 
        throw new Error("User not found!")
    }


   
}) ; 
module.exports = {authUser, getUserProfile,registerUser,updateUserProfile,getUsers,deleteUser,getUserById,updateUser}