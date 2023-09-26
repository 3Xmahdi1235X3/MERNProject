import React ,{useState,useEffect} from 'react'
import {Button , Table } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { deleteorder, listorders } from '../actions/orderActions'
import { listOrder } from '../actions/orderActions'

const OrderListScreen = () => {
   
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders } = orderList
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


      useEffect(() => {
        if (userInfo && userInfo.isAdmin==='true') {
          dispatch(listOrder())
        } else {
          navigate('/login')
        }
      }, [dispatch, userInfo])
    
 
  
    
  return (
    <Layout>
        <h1>Order List</h1>
        {loading ? <Loader></Loader> : error ? <Message>{error}</Message> : (
            <Table striped  hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>user</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Paid</th>
                        <th>delivred</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order=>(
                        <tr key={order._id}>
                            <td>{order._id }</td>
                            <td>{order.user && order.user.name }</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>${order.totalPrice}</td>
                            <td>{order.isPaid===true ?(order.paidAt.substring(0,10)) : <i style={{color:"red"}}  className="fas fa-times"></i>}</td>
                            <td>{order.isDelivred===true ? (order.delivredAt.substring(0,10))  : <i style={{color:"red"}}  className="fas fa-times"></i>}</td>
                            <td>
                            <Link to={`/order/${order._id}`}> <Button variant="light" className="btn-sm">Details</Button></Link>
                            </td>

                        </tr>
                        
                    ))}
                </tbody>
            </Table>
        )}

    </Layout>


    )
}

export default OrderListScreen