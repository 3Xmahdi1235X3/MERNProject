import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({prodcut}) => {
  return (
        <Card className='my-3 p-3 rounded'>
            <Link  to={`/product/${prodcut._id}`}>
                <Card.Img src={prodcut.image} variant="top" />
            </Link>
            <Card.Body>
            <Link to={`/product/${prodcut._id}`}>
                <Card.Title as={"div"}>
                <strong>{prodcut.name} </strong>
                </Card.Title> 
            </Link>
            <Card.Text as="div">
                <div className='my-3'> 
                    <Rating value={prodcut.rating} text={` ${prodcut.numReviews } reviews` }  />
                </div>
            </Card.Text>
            <Card.Text as="h3">
               ${prodcut.price}
            </Card.Text>
            </Card.Body>
         
        
        </Card>
    )
}

export default Product