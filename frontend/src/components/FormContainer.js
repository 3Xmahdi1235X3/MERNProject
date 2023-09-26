import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
const FormContainer = ( {children}) => {
  return (
    <Container className=''>
      
        <Row className='justify-content-md-center p-md-5 pd-lg-5'>
            <Col xs={12} md={6} className="form-s  p-md-5 pd-lg-5">
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer