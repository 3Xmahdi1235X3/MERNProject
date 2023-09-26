import {createStore,combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import {createProductReducer, productDeleteReducer, productDetailsReducer, productReducer, productReviewCreateReducer, productUpdateReducer} from "./reducers/productReducer.js"
import { cartReducer } from "./reducers/cartReducer.js"
import { productTopRatedReducer, userDeleteReducer, userDetailsReducer, userListReducer, userLoginReducer, userRegisterReducer, userUpdateOReducer, userUpdateReducer } from "./reducers/userReducer.js"
import { orderCreateReducer, orderDeliverReducer, orderDetailReducer, orderListReducer, orderMyListReducer, orderPayReducer } from "./reducers/orderReducer.js"

const reducer=combineReducers({
    productList:productReducer, 
    productDetails:productDetailsReducer,
    productDelete:productDeleteReducer , 
    productCreate:createProductReducer , 
    productUpdate: productUpdateReducer,
    productReviewCreate : productReviewCreateReducer,
    productTopRated:productTopRatedReducer,
    
    cart:cartReducer,
    userLogin: userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailReducer,
    orderPay:orderPayReducer,
    orderDeliver:orderDeliverReducer,
    orderMylist:orderMyListReducer,
    orderList:orderListReducer,
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userUpdate:userUpdateOReducer

})
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage=  
localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage=  

localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ""

const intialState={
    cart:{cartItems:cartItemsFromStorage,    shippingAddress:shippingAddressFromStorage, paymentMethod:paymentMethodFromStorage.paymentMethod
    } , 
    userLogin:{userInfo:userInfoFromStorage},
    
}
const middleware=[thunk]
const store = createStore(reducer,intialState,composeWithDevTools(applyMiddleware(...middleware)))
export default store