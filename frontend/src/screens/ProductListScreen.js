import React ,{useState,useEffect} from 'react'
import {Button , Row,Col, Table } from "react-bootstrap"
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from "../components/Loader"
import { Link, useNavigate, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import { createProduct, deleteProduct, listProducts} from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'
const ProductListScreen = ({history}) => {
    let {pageNumber} = useParams()
    
     pageNumber=pageNumber || 1
   
    const navigate=useNavigate()
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products,page,pages  } = productList
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDelete =useSelector((state) => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete


    const productCreate =useSelector((state) => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate , product : createdProduct} = productCreate

      useEffect(() => {
        dispatch({type:PRODUCT_CREATE_RESET})
        if ( userInfo.isAdmin!=='true') {
            navigate('/login')

        } 

        if(successCreate)
        {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else
        {
            dispatch(listProducts("" , pageNumber))
        }
      }, [dispatch, userInfo,successDelete,successCreate,pageNumber])
    
      const deleteHandler= (id)=>{
        console.log(id)
        dispatch(deleteProduct(id))
    }
    const createProductHandler=()=>{
        dispatch(createProduct())
    }

    
  return (
    <Layout>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={()=>{createProductHandler                                                                                               ()}}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>

        </Row>
        
        {loading || loadingDelete ? <Loader></Loader> : error ? <Message>{error}</Message> : (
           <>
            <Table striped  hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                            <Link to={`/admin/product/${product._id}/edit`}> <Button variant="light" className="btn-sm"><i className='fas fa-edit'></i></Button></Link>
                            <Button variant="danger" className="btn-sm" onClick={()=>{deleteHandler(product._id)}} ><i className='fas fa-trash'></i></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Paginate pages={pages} isAdmin={true} page={page} keyword={""}  />
           </>

        )}

    </Layout>


    )
}

export default ProductListScreen