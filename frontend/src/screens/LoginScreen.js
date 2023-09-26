import React, { useEffect, useState } from 'react'
import { Link, redirect, useLocation, useNavigate, useParams ,useSearchParams} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { toast } from 'react-toastify'

const LoginScreen = () => {
    const [email,setEmail]=useState("")
    
    const [searchParams, setSearchParams] = useSearchParams()
    const location=useLocation() ; 
    const redirect=searchParams.get("redirect") ? searchParams.get("redirect") :null

    const [password,setPassword] = useState("")
    const dispatch=useDispatch()

    const userLogin=useSelector(state=>state.userLogin)
    const {loading,error , userInfo} = userLogin
    const navigate = useNavigate()

    useEffect(()=>{
        if(userInfo){
            navigate(redirect ? redirect : "/")
        }
    },[navigate,userInfo,redirect])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
   
        
    }
  return (
<Layout>
<FormContainer  >
            <h1 style={{textAlign:"center" , fontSize : "32px"}}>Sign In</h1>
           <div style={{textAlign:"center" }}> <span className="text-g" >Please login using account detail bellow.</span></div>
            
            {loading && <Loader></Loader>}
           { !loading && (<><Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='mt-2'>
                    <Form.Label className='text-g'>Email</Form.Label>
                    <FormControl type='email' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}></FormControl>
                </Form.Group>
                <Form.Group controlId='password' className='mt-2'>
                    <Form.Label className='text-g'>Password</Form.Label>
                    <FormControl type='password' placeholder='Enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}></FormControl>
                </Form.Group>
                <Form.Group>
                <Button className="my-3" type='submit' variant="primary" style={{background : "#FB2E86",width:"100%",fontSize:"17px"}}>
                        Sign In
                </Button>
                </Form.Group>
            </Form>
            <Row className='py-3 text-g' >
                <Col className='d-flex justify-content-center' >New Cusomer ?<Link  className="text-g " to={redirect ? `/register?redirect=${redirect}` :"/register"  }>Regsiter</Link> </Col>
            </Row></>)}
        </FormContainer>
</Layout>
        
  )
}

export default LoginScreen