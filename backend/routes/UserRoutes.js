
const express=require("express")
const router=express.Router()
const userController=require("../controllers/userController")
const { protect,admin } = require("../midleware/authMiddleware")

router.post("/login" , userController.authUser)
router.route("/register").post(  userController.registerUser)
router.route("/").get(protect,admin, userController.getUsers)
router.route("/profile").get(protect, userController.getUserProfile).put(protect,userController.updateUserProfile)
router.route("/:id").delete(protect,admin,userController.deleteUser).get(protect,admin,userController.getUserById).put(protect,admin,userController.updateUser)
module.exports = router


//lezem nzid async hdler 06
//get , put , delete , post
