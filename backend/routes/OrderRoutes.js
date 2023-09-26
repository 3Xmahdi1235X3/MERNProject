
const express=require("express")
const orderController=require("../controllers/orderController")
const { protect, admin } = require("../midleware/authMiddleware")

const router=express.Router()
router.route('/myorders').get(protect,orderController.getMyOrders)
router.route('/weekly').get(orderController.getWeeklyOrder)
router.route('/monthely').get(orderController.getMonthely)
router.route('/lastest').get(orderController.getLastest)
router.route("/").post( protect , orderController.addOrderItems).get(protect,admin,orderController.getOrders)

router.route('/:id').get(protect,orderController.getOrderById)
router.route('/:id/pay').put(protect,orderController.updateOrderToPaid)
router.route('/:id/deliver').put(protect,admin,orderController.updateOrderToDelivered)
module.exports = router

