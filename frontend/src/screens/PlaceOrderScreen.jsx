import React, { useEffect} from 'react'
import { Button, Row, Col, ListGroup, Image, Card, ListGroupItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import CheckOutStep from '../components/shared/CheckOutStep';

const PlaceOrderScreen = () => {
    const cart = useSelector(state=>state.cart)
    const dispatch = useDispatch();
    const orderCreate = useSelector(state=>state.orderCreate)
    const {success, error, order} = orderCreate
    const navigate = useNavigate();

    const addDecimal = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
      cart.itemsPrice = addDecimal(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );
      cart.shippingPrice = addDecimal(cart.cartItems > 500 ? 0 : 50);
      cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)));
      cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
      ).toFixed(2);

      const placeOrderHandler = () => {
        dispatch(
          createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
          })
        );   
      };
  useEffect(()=>{
    // console.log('useEffect - success:', success, 'order:', order);
    if(success ){
        navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line
  },[navigate,success])     
  return (
    <>
      <CheckOutStep step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>Shipping</h2>  
                    <p><strong>Address : </strong>
                    {cart.shippingAddress.address} &nbsp;
                    {cart.shippingAddress.city} &nbsp;
                    {cart.shippingAddress.postalCode} &nbsp;
                    {cart.shippingAddress.country} &nbsp;
                    </p>
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Payment Method</h2>
                    <p>
                        <strong> {cart.paymentMethod} </strong>
                    </p>
                </ListGroupItem>

                <ListGroupItem>
                    <h2>Order Items</h2>
                    {cart.cartItems.length ===0
                    ? (<Message>Your cart is empty</Message>)
                    :(<ListGroup variant='flush'>
                        {cart.cartItems.map((item, index)=>(
                            <ListGroupItem key={index}>
                                <Row>
                                    <Col md={1}>
                                    <Image src={item.image} alt={item.name} fluid/>
                                    </Col>
                                    <Col>
                                    <Link to={`/product/${item.product}`}>
                                    {item.name}
                                    </Link>
                                    </Col>
                                    <Col md={4}>
                                    {item.qyt} X ${item.price} = ${item.price}
                                    </Col>
                                </Row>

                            </ListGroupItem>
                        ))}

                    </ListGroup>)
                }
                </ListGroupItem>
            </ListGroup>
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Order Summery</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>

                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            {error && <Message variant="danger">{error}</Message>}
                        </ListGroupItem>
                        <Button type="button" className='btn-block'
                                disabled={cart.cartItems===0}
                                onClick={placeOrderHandler}
                        > Place Order</Button>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen
