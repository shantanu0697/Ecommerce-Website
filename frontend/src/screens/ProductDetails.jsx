import React ,{useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import {listProductDetails} from '../actions/productActions'
import Rating from '../components/Rating';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Col, Row, Image, ListGroup, ListGroupItem, Button, Form} from 'react-bootstrap';

const ProductDetails = ({match}) => {
  
  const [qyt, setQyt] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const {id} = useParams();
    const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
    
  useEffect(() => {
    dispatch(listProductDetails(id)); 
  }, [dispatch, id]);
  
  const addToCartHandler = () =>{
    navigate(`/cart/${id}?qyt=${qyt}`)
  };
   
  return (
    <>
    {
      loading ? <Loader/>:error ? <Message variant="danger">{error}</Message> : 
    <div>
      
      <Link to="/" className='btn-light'>
        <i class="fas fa-arrow-left"></i>
      &nbsp; GO BACK
      </Link>
      <Row>
        <Col>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                 <ListGroupItem>
                    <h3>{product.name}</h3>
                 </ListGroupItem>
                 <ListGroupItem>
                    <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                    />
                 </ListGroupItem>
                 <ListGroupItem>
                    Price : ${product.price}
                 </ListGroupItem>
                 <ListGroupItem>{product.description}</ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <ListGroupItem>
                <Row>
                    <Col>Status :</Col>
                    <Col>{product.countInStock>0? 'In Stock':'Out of Stock'}</Col>

                </Row>
            </ListGroupItem>
            {
              product.countInStock>0 && (
                <ListGroupItem>
                  <Row>
                    <Col>
                    Qyt
                    </Col>
                    <Form.Control as="select" value={qyt} onChange={(e)=> setQyt( e.target.value)}>
                      {
                        [...Array(product.countInStock).keys()].map((x)=>(
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )
            }
            <ListGroupItem>
                <Button className='btn-block' type='button' onClick={addToCartHandler}>Add to cart</Button>
            </ListGroupItem>
        </Col>
      </Row>

    </div>
}
    </>
  )
}

export default ProductDetails
