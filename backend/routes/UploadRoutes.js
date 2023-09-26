const express= require("express")
const multer=require("multer")
const path=require("path")

const router=express.Router()

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    }
    ,filename:function(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
function checkFileType (file,cb){
    const fileTypes= /jpg|jpeg|png/
    const extname=fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=fileTypes.test(file.mimetype)
    if(mimetype && extname){
        return cb(null,true)
    }else{
        cb("Error:Images only")
    }

}
const upload=multer({storage:storage, fileFilter : function (req,file,cb){
    console.log(file)
    checkFileType(file,cb)
}})

router.post("/",upload.single("image"),(req,res)=>{
    res.send(`/${req.file.path}`)
})
module.exports = router
