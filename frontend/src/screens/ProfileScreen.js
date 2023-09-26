

import React ,{useState,useEffect} from 'react'
import {Row , Col  , Button ,Form, Table } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import{getUserDetails, updateUserProfile} from "../actions/userActions"
import { Link, useNavigate } from 'react-router-dom'
import { listMyOrder } from '../actions/orderActions'
const ProfileScreen = () => {
  const navigate = useNavigate()

    const [email,setEmail] =useState('')
    const [name,setName] =useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null)


   
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderMyList= useSelector((state) => state.orderMylist)
    const { loading:loadingOrders, error:errorOrders, orders } = orderMyList



    useEffect(()=> 
    {
        if(!userInfo)
            {
                navigate('/login')
            }
            
              else
              {
                  if(!user.name)
                  {
                      dispatch(getUserDetails('profile'))
                      
                  }else{
                    dispatch(listMyOrder())
                      setName(user.name)
                      setEmail(user.email)
                  }
              }
      },[dispatch , userInfo ,user])
    const submitHandler = (e)=>
    {
      console.log(password)
        e.preventDefault()
        if(password !==confirmPassword)
        {
            setMessage('password do not  match ')
        }
        else 
            {

                dispatch(updateUserProfile({id:user._id,name:name,email:email,password:password}) )
            }

    }
    return (
     
        <Row>
            <Col md={3}>
            <h2>User Profile</h2>

            {error && <Message variant="danger"> {error}</Message>}
         {message && <Message variant="danger"> {message}</Message>}
         {success && <Message variant="success"> profile update {true}</Message>}

         {loading && <Loader></Loader>}
          <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>
                       name
                    </Form.Label>
                    <Form.Control type="name" placeholder="enter name" onChange={(e)=>setName(e.target.value)} value={name}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Adress
                    </Form.Label>
                    <Form.Control type="email" placeholder="enter email" onChange={(e)=>setEmail(e.target.value)} value={email}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="enter password" onChange={(e)=>setPassword(e.target.value)} value={password}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirm password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type="password" placeholder="confirm password" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword}>

                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant='primary'>
                   Update
                </Button>
          </Form>
            </Col>
            <Col md={9}>
                    <h2>My Orders</h2>
                {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : !orders ||orders.length===0  ? <Message variant={"info"}>No Orders yet</Message> : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0,10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivred===true ? (order.delivredAt.substring(0,10)) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
</Row>
)
}
export default ProfileScreen
