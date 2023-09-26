

import React ,{useState,useEffect} from 'react'
import {Link, useNavigate, useSearchParams } from 'react-router-dom'
import {Row , Col  , Button ,Form } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import{register} from "../actions/userActions"
import FormContainer from '../components/FormContainer'
import Layout from '../components/Layout'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
const ShippingScreen = () => {
    const navigate = useNavigate()
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [countery, setCountery] = useState(shippingAddress.countery)
    const dispatch = useDispatch()
    const submitHandler = (e)=>
    {
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalCode,countery}))
        navigate("/payment")
    }


  return (
    <Layout>
                    <CheckoutSteps step1 step2></CheckoutSteps>

        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="postalCode">
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId="countery">
                    <Form.Label>Countery</Form.Label>
                    <Form.Control type="text" placeholder="Enter Countery" value={countery} onChange={(e) => setCountery(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>

    </Layout>
  )
}

export default ShippingScreen