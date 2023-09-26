import React ,{useState,useEffect} from 'react'
import {Button , Table } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { deleteUser, listUsers } from '../actions/userActions'

const UserListScreen = ({history}) => {
   
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
      const { success:successDelete } = userDelete
  
      useEffect(() => {
        if (userInfo && userInfo.isAdmin==='true') {
          dispatch(listUsers())
        } else {
          navigate('/login')
        }
      }, [dispatch, successDelete, userInfo])
    
      const deleteHandler= (id)=>{
        console.log(id)
        dispatch(deleteUser(id))
    }
  
    
  return (
    <Layout>
        <h1>User List</h1>
        {loading ? <Loader></Loader> : error ? <Message>{error}</Message> : (
            <Table striped  hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin=="true" ? <i style={{color:"green"}} className="fas fa-check"></i> : <i style={{color:"red"}}  className="fas fa-times"></i>}</td>
                            <td>
                            <Link to={`/admin/user/${user._id}/edit`}> <Button variant="light" className="btn-sm"><i className='fas fa-edit'></i></Button></Link>
                            <Button variant="danger" className="btn-sm" onClick={()=>{deleteHandler(user._id)}} ><i className='fas fa-trash'></i></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}

    </Layout>


    )
}

export default UserListScreen