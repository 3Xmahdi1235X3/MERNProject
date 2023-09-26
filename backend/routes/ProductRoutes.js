
const express=require("express")
const router=express.Router()
const productController=require("../controllers/productController")
const { protect,admin } = require("../midleware/authMiddleware")

router.route("/").get(productController.getProducts).post(protect,admin,productController.createProduct)
router.route("/:id").get(productController.getProductById).delete(protect,admin,productController.deleteProduct).put(protect,admin,productController.updateProduct)
router.route("/:id/reviews").post(protect,productController.createReview)
router.get('/top/rated', productController.getTopProducts )

module.exports = router

//lezem nzid async handler 06