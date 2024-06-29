import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/shared/Message';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Button, Card, Image, ListGroup, ListGroupItem } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartAction';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = id;
//   const urlParams = new URLSearchParams(location.search);
// const qyt = urlParams.get('qyt') ? Number(urlParams.get('qyt')) : 1;
  const qyt = location.search ? (Number(location.search.split('=')[1]) || 1) : 1;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qyt));
    }
  }, [dispatch, productId, qyt]);

  const cart = useSelector((state) => state.cart);
  console.log(`Cart items: ${cart.cartItems}`);
  const { cartItems } = cart;
  console.log('cart items: ',cartItems);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    // navigate('/login?redirect=shipping');
    navigate('/shipping');
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty !<Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
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
                          dispatch(addToCart(item.product, Number(e.target.value)))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fa fa-trash text-danger" aria-hidden="true"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>
                  subtotal ({cartItems.length}) items
                </h2>
                {/* {cartItems.length > 0 ? (
                  `$${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}`
                ) : (
                  `$0.00`
                )} */}
{cartItems.length > 0? (
  `$${cartItems.reduce((acc, item) => {
    console.log(`item.qty: ${item.qty}, item.price: ${item.price}`);
    const quantity = item.qty? item.qty : 1; // default to 1 if qty is undefined
    return acc + quantity * item.price;
  }, 0).toFixed(2)}`
) : (
  `$0.00`
)}
              </ListGroupItem>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkout}
              >
                Proceed to checkOut
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;