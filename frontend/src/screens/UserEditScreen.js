

import React ,{useState,useEffect} from 'react'
import {Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {Row , Col  , Button ,Form } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import{getUserDetails, updateUser} from "../actions/userActions"
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'
import { USER_UPDATE_O_RESET } from '../constants/userConstants'

const UserEditScreen = () => {


    const [email,setEmail] =useState('')
    const [name,setName] =useState('')
    const [isAdmin,setIsAdmin] = useState(false)
   
    const {id}=useParams()


    const dispatch=useDispatch()
    
    const userDetails=useSelector (state =>state.userDetails)
    const  {loading,error,user}=userDetails
    const userUpdate=useSelector (state =>state.userUpdate)
    const  {loading:loadingUpdate,error:errorUpdate,success:successUpdate}=userUpdate
    const navigate=useNavigate()
    useEffect(()=>
    {
        if(successUpdate){
            dispatch({type:USER_UPDATE_O_RESET})
            navigate("/admin/userList")
        }else{
            console.log(user)
            if(!user.name && user._id!==id)
            {
                dispatch(getUserDetails(id))
            }
            else
            {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin==="true" ? true : false)
            }
        }
       
    },[dispatch,id , user,successUpdate])
    const submitHandler = (e)=>
    {
        e.preventDefault()
        console.log({_id:id,name,email,isAdmin})
        dispatch(updateUser({_id:id,name,email,isAdmin}))
            
            

    }
    return (
     <Layout>
        <Link to={"/admin/userList"} className="btn btn-primary ">Go back</Link>
         <FormContainer>
         <h1 style={{textAlign:"center" , fontSize : "32px" }}>Update user</h1>
        {loadingUpdate && <Loader></Loader>}
         {error && <Message variant="danger"> {error}</Message>}

         {loading && <Loader></Loader>}
          <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'className='mt-5' >
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
                    <Form.Control type="email" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)} value={email}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='isAdmin' className='mt-2'>
                 
                    <Form.Check type="checkBox" label="is Admin" value={isAdmin} checked={ isAdmin} onChange={(e)=>setIsAdmin(e.target.checked)} >

                    </Form.Check>
                </Form.Group>
             
                <Form.Group>
                <motion.div whileHover={{scale:0.998}}>
                <Button  className="my-3" type='submit' variant="primary" style={{background : "#FB2E86",width:"100%",fontSize:"17px"}}>
                                        Update

                </Button>
                </motion.div>    
                </Form.Group>
          </Form>
        
      </FormContainer>
     </Layout>
    )
}

export default UserEditScreen
