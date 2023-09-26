import React,{useState,useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch,useSelector} from "react-redux" 
import {listProducts} from "../actions/productActions"
import ProductCustom from '../components/ProductCustom'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
const HomeScreen = () => {
  let {keyword,pageNumber} = useParams()
  console.log(keyword)
  if(!pageNumber)
  {
    pageNumber=1
  }

  if(!keyword)
  {
    keyword=""
  }

  const dispatch = useDispatch()
  const productList=useSelector(state=>state.productList)
  
  const {loading,error,products,page,pages}=productList
  useEffect(()=>{
    
    dispatch(listProducts(keyword,pageNumber))
  },[dispatch,keyword,pageNumber])
  return (
<Layout>

    <h1>Latest Products</h1>
    {loading ?
     <Loader/>: error ? <Message variant={"danger"}>{error}</Message> : ( 
     <><Row>
      {products.map(proudct=>(
          <Col key={proudct.id} sm={12} md={6} lg={4} xl={3}>
              <ProductCustom  key={proudct._id} prodcut={proudct}/>
          </Col>
      ))}
  </Row>
  <Paginate pages={pages} page={page} keyword={keyword}  />
  </>)}
   
</Layout>
  )
}

export default HomeScreen