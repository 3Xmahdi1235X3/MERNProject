

import React ,{useState,useEffect} from 'react'
import {Link, useNavigate, useSearchParams } from 'react-router-dom'
import {Row , Col  , Button ,Form } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import Layout from '../components/Layout'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
const PaymentScreen = () => {
    const navigate = useNavigate()
    const cart=useSelector(state=>state.cart)
    const {shippingAddress}=cart

    if(!shippingAddress){
        navigate("/shipping")
    }
    const [paymentMethod, setPaymentMethod] = useState(shippingAddress.paymentMethod)
    
    const dispatch = useDispatch()
    const submitHandler = (e)=>
    {
        e.preventDefault()
        dispatch(savePaymentMethod({paymentMethod}))
        navigate("/placeorder")
    }


  return (
    <Layout>
                    <CheckoutSteps step1 step2 step3></CheckoutSteps>

        <FormContainer>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="paymentMethod">
                    <Form.Label>Select Method</Form.Label>
                    <Col>

                        <Form.Check type="radio" label="PayPal or Credit Card" id="PayPal" name="paymentMethod" value="PayPal" checked onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check type="radio" label="Stripe" id="Stripe" name="paymentMethod" value="Stripe" onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary">Continue</Button>
            </Form>
        </FormContainer>

    </Layout>
  )
}

export default PaymentScreen