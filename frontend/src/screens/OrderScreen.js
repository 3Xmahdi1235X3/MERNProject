import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import {PayPalButton} from "react-paypal-button-v2"
import { Col, ListGroup, Row,Image, Card, Placeholder, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createOrder, deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = ({}) => {
    const dispatch=useDispatch()
    const {id}=useParams()

    const user=JSON.parse(localStorage.getItem("userInfo"))
    const [sdkReady,setSdkReady]=useState(false)
    const orderDetails=useSelector(state=>state.orderDetails)
    const {order,loading,error}=orderDetails
    const orderPay=useSelector(state=>state.orderPay)
    const {loading:loadingPay,success:successPay}=orderPay
    const orderDeliver=useSelector(state=>state.orderDeliver)
    const {loading:loadingDeliver,success:successDeliver}=orderDeliver
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const navigate=useNavigate()
    const successPaymentHandler=(paymentResult)=>{
        dispatch(payOrder(id,paymentResult))
    }
    useEffect(()=>{
                const addPayPalScript=async ()=>{
            console.log("aaaa")
            const {data : clientId}=await axios.get("/api/config/paypal")
            console.log(clientId)
            const script=document.createElement("script")
            script.type="text/javascript"
            script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async=true
            script.onload=()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)

        }
        if(!userInfo)
        {
            navigate('/login')

        }


        if(!order ||successPay || successDeliver){
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})

            dispatch(getOrderDetails(id))

        }else{

            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                }else{
                    setSdkReady(true)
                }
            }
        }
    },[dispatch,id,successPay,order,userInfo,successDeliver])

   
    const deliverHandler=()=>{
        dispatch(deliverOrder(order))
    }
    return (
        <Layout>
            {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> : (
            <>
            <h1>Order {order.id} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Shipping</h2>
                               <p><strong>
                                    Name :
                                </strong>{user.name}</p>
                                <p><strong>
                                    Email :
                                </strong><a href={`mailto:=${user.email}`}    >{user.email}</a> 
                                  </p>                             <p>
                                    <strong>Addresse:</strong>
                                    {order.shippingAddress.address},  {order.shippingAddress.city}, {" "} {order.shippingAddress.postalCode},{" "} {order.shippingAddress.countery},
                                </p>
                                {order.isDelivred===true ? <Message variant="success">delivered on {order.delivredAt} : </Message>:<Message variant="danger">Not Delivered</Message>}
         
                            </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p><strong>Method:</strong>
                        {order.paymentMethod}</p>
                        {order.isPaid ? <Message variant="success">Paid on {order.createdAt} : </Message>:<Message variant="danger">Not paid</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Items</h2>

                            {order.orderItems.length===0  ? <Message>Your cart is empty</Message>:(
                                <ListGroup variant="flush">
                                    {order.orderItems.map((item,index)=>(
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={1}>
                                                    <Image alt={item.name} src={item.image} fluid rounded/>

                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} X ${item.price} = $ { item.qty* item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}

                                </ListGroup>
                            )}                    </ListGroup.Item>
                    </ListGroup>
                
                </Col>
                <Col md={4}>
                    <Card>
                       <ListGroup variant="flush">
                           <ListGroup.Item>
                               <h2>Order Summary</h2>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Items</Col>
                                   <Col>{order.orderItems[0].qty}</Col>
                               </Row>
                           </ListGroup.Item>
                       </ListGroup>
                           
                           <ListGroup.Item>
                               <Row>
                                   <Col>Shipping </Col>
                                   <Col>${order.orderItems[0].price>100?0:100}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Tax </Col>
                                   <Col>${order.taxPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Total  </Col>
                                   <Col>${order.totalPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           {!order.isPaid && (
                <ListGroup.Item>
                    {console.log(sdkReady)}
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : userInfo._id===order.user._id &&  (
                    
                    <PayPalButton
                      amount={order.totalPrice}
                     onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )} 
                {loadingDeliver && <Loader />}
                { order.isPaid===true && order.isDelivred===false && userInfo.isAdmin==="true" && (
                    <ListGroup.Item>
                        <Button

                            type='button'
                            className='btn btn-block'
                            onClick={deliverHandler}
                        >
                            Mark As Delivered
                        </Button>
                    </ListGroup.Item>
                )}

                    </Card>
                
                </Col>
            </Row>
            </>
            
            )}
                    
        </Layout>
    );
}

export default OrderScreen
