import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import {motion} from "framer-motion"

const ProductCustom = ({prodcut}) => {
  return (
    <motion.div whileHover={
        {
            scale:1.1
        }
    }>
        <Card className='my-3 rounded'>
            <Link  to={`/product/${prodcut._id}`}>
                <motion.img src={prodcut.image} width={"100%"}     
 />
            </Link>
            <Card.Body>
            <Link to={`/product/${prodcut._id}`}>
                <Card.Title as={"div"}>
                <strong className='text-cart' style={{fontSize:"18px"}}>{prodcut.name} </strong>
                </Card.Title> 
            </Link>
            <Card.Text as="div">
                <div className='my-3'> 
                    <Rating value={prodcut.rating} text={` ${prodcut.numReviews } reviews` }  />
                </div>
            </Card.Text>
            <Card.Text as="h3" className='text-cart' style={{fontSize:"14px"}}>
               ${prodcut.price}   
            </Card.Text>
            </Card.Body>
         
        
        </Card> 
    </motion.div>

 )
}

export default ProductCustom