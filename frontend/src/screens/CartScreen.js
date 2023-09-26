import React, { useEffect } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
const CartScreen = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();
  console.log(cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
   const user= localStorage.getItem("userInfo")
    console.log(user)
    navigate(`/shipping`);
  };
  return (
    <Layout>
      <h1 className="text-cart mt-5" style={{ textAlign: "center" , fontSize:"32px" }}>shopping Cart</h1>
      <Row className="mt-5">
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <span className="text-cart"> Image</span>
                  </Col>
                  <Col md={3}>
                    <span className="text-cart">Name</span>
                  </Col>
                  <Col md={2}>
                    <span className="text-cart">Price</span>
                  </Col>
                  <Col md={2}>
                    <span className="text-cart">Qty</span>
                  </Col>
                  <Col md={2}>
                    <span className="text-cart">Action</span>
                  </Col>
                </Row>
              </ListGroup.Item>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4} className="pt-3" >
            <h5 className="text-cart" style={{ textAlign: "center"  }}>Cart total</h5>
          <Card className="" style={{background: "#F4F4FC",borderRaidus: '3px'}}>
            <ListGroup  style={{background: "#F4F4FC",borderRaidus: '3px'}}>
              <ListGroup.Item className="pt-3 pb-3" style={{background: "#F4F4FC",borderRaidus: '3px'}}>
                <Row> <Col >
                <span className="text-cart">Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) </span></Col>
                <Col> 
                <span className="text-cart" style={{fontSize:"17px"}}> &nbsp; ${cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}</span></Col></Row>
                
               
              </ListGroup.Item>
              <ListGroup.Item className="pt-3 pb-3" style={{background: "#F4F4FC",borderRaidus: '3px'}}>
                <Row> <Col >
                <span className="text-cart">Total  </span></Col>
                <Col> 
                <span className="text-cart" style={{fontSize:"17px"}}> &nbsp; ${cartItems
                  .reduce((acc, item) => 20 +acc + item.qty * item.price, 0)
                  .toFixed(2)}</span></Col></Row>
                
               
              </ListGroup.Item>
              <ListGroup.Item className="pt-3 pb-3" style={{background: "#F4F4FC",borderRaidus: '3px'}}>
              <Row className="mb-3 pl-3 pr-3">
              <Col>
              <i class="fa-solid fa-circle-check" style={{color:"#19D16F", fontSize:"12px"}}></i><span className="text-g " style={{fontSize:"14px"}}>Shipping & taxes calculated at checkout  </span></Col>
                </Row>
                <Row className="mb-3 pl-3 pr-3">
                <Button
                
                
                style={{background: "#19D16F",borderRaidus:"3px"}}
                  onClick={checkoutHandler}
                  type="button"
                  className="btn-block text-b"
                  disabled={cartItems.length === 0}
                >
                  Proceed To Checkout
                </Button>
                </Row>
                
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default CartScreen;
