import React ,{useState,useEffect} from 'react'
import { Col, ListGroup, Row,Image, Card, Placeholder } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import Layout from '../components/Layout'
import Message from '../components/Message'

const PlaceOrderScreen = ({history}) => {
    const dispatch=useDispatch()

    
    const cart =useSelector((state)=>state.cart)
    cart.itemsPrice=cart.cartItems.reduce(
        (acc,item)=>acc+item.price*item.qty,0

    )
    cart.shippingPrice=cart.itemsPrice>100?0:100
    cart.taxPrice=Number((0.15*cart.itemsPrice).toFixed(2))
    cart.totalPrice=Number(cart.itemsPrice+cart.shippingPrice+cart.taxPrice).toFixed(2)
    
    const orderCreate=useSelector(state=>state.orderCreate)
    const {order,success,error}=orderCreate
    const navigate=useNavigate()

    useEffect(()=>{
        if(success)
        {
            navigate(`/order/${order._id}`)
        }
    },[success,navigate,order])

    const placeOrderHandler = ()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice,

        }))
    }
    return (
        <Layout>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps> 
            <Row>
                <Col md={8}>
                    <ListGroup.Item variant=''>
                        <h2>Shipping</h2>
                        <p><strong>Address:</strong>
                        {cart.shippingAddress.address} {" "}
                        {cart.shippingAddress.city} {" "}
                        {cart.shippingAddress.postalCode} {" "}
                        {cart.shippingAddress.countery}  {" "}
                        </p>
                            

                    </ListGroup.Item>
                    <ListGroup.Item >
                        <h2>Payment Method</h2>
                        <p><strong>Methode:</strong>
                        {cart.paymentMethod} {" "}
                        
                        </p>
                            

                    </ListGroup.Item>
                    <ListGroup.Item >
                        <h2>Order Items</h2>
                       
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty </Message> : 
                        
                        
                        <ListGroup variant="flush">
                        {cart.cartItems.map((item,index)=>(
                                <ListGroup.Item key={index}> 
                                
                                <Row>
                                    <Col md={1}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col>
                                      <Link to =  {`/product/${item.name}`}
                                        >{item.name}</Link>


                                    </Col>
                                    
                                    <Col md={4}>
                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                                
                                
                                
                                
                                
                                }                        
                        
                            

                    </ListGroup.Item>
                </Col>
                <Col md={4}>
                  <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message>}
                        </ListGroup.Item>

                        <ListGroup.Item

                        >
                            <button type='button' className='btn btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>
                                Place Order
                            </button>
                        </ListGroup.Item>
                        </ListGroup>

                  </Card>
                </Col>
            </Row>
        </Layout>
    );
}

export default PlaceOrderScreen
