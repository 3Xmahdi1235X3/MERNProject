import React from 'react'
import { Alert } from 'react-bootstrap'
const Message = ({variant,children}) => {
  return (
  <Alert style ={{whiteSpace : "pre-line"}} variant={variant}>
    {children} 
  </Alert>
    )
}


export default Message