

import React ,{useState,useEffect} from 'react'
import {Link, useNavigate, useSearchParams } from 'react-router-dom'
import {Row , Col  , Button ,Form } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import{register} from "../actions/userActions"
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import {checkEmail,checkConfirmPassword,checkName,checkPassword,checkVide} from "../screens/RE-MAP"

const RegisterScreen = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const redirect=searchParams.get("redirect") ? searchParams.get("redirect") :null

    const [email,setEmail] =useState('')
    const [name,setName] =useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState('')
    const navigate = useNavigate()


    const dispatch=useDispatch()
    const userRegister=useSelector (state =>state.userRegister)
    const  {loading,error,userInfo}=userRegister

    useEffect(()=>
    {
        if(userInfo)
            {
                navigate(redirect)
            }
    },[navigate , userInfo , redirect ])
    const submitHandler = (e)=>
    {
        e.preventDefault()
        setMessage("")
        var b=false 
        let a=checkName(name)
        if(a!=="")
        {
            b=true
        }
        let c=checkEmail(email)
        if(c!=="")
        {
            b=true
        }

       let d=checkPassword(password)
        if(d!=="")
        {
            b=true
           
        }
        e=checkConfirmPassword(password,confirmPassword)
        if(e!=="")
        {
            b=true
        }

       
        alert(a+c+d+e)
        setMessage(a+c+d+e)

        if(!b)
         
        
      
            {

                dispatch(register(name , email,password))
                navigate("/profile")
            }
            
            

    }
    return (
     <Layout>
         <FormContainer>
         <h1 style={{textAlign:"center" , fontSize : "32px"}}>Sign Up</h1>
           <div style={{textAlign:"center" }}> <span className="text-g" >Please Make new  account .</span></div>
            
         {message && <Message variant="danger"> {message}</Message>}

         {loading && <Loader></Loader>}
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'className='mt-2' >
                    <Form.Label className="text-g"  >
                       Name
                    </Form.Label>
                    <Form.Control type="name" placeholder="enter name" onChange={(e)=>setName(e.target.value)} value={name}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email' className='mt-2'>
                    <Form.Label className="text-g" >
                        Email Adress
                    </Form.Label>
                    <Form.Control type="text" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)} value={email}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password' className='mt-2'>
                    <Form.Label className="text-g" >
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="enter password" onChange={(e)=>setPassword(e.target.value)} value={password}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirm password' className='mt-2'>
                    <Form.Label className="text-g" >
                        Repassword
                    </Form.Label>
                    <Form.Control type="password" placeholder="confirm password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}>

                    </Form.Control>
                </Form.Group>
                <Form.Group>
                <motion.div whileHover={{scale:0.998}}>
                <Button  className="my-3" type='submit' variant="primary" style={{background : "#FB2E86",width:"100%",fontSize:"17px"}}>
                                        Register

                </Button>
                </motion.div>    
                </Form.Group>
          </Form>
          <Row className='py-3'>
              <Col>
                Have an account  ? <Link to={redirect ?`/login?redirect=${redirect}` : '/login '}>Login</Link>
              </Col>
          </Row>
      </FormContainer>
     </Layout>
    )
}

export default RegisterScreen
