import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Col, Row } from "react-bootstrap";
import {listProduct} from '../actions/productActions'
import ProductScreen from "./ProductScreen";
import Loader from '../components/shared/Loader'
import Message from "../components/shared/Message";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state=> state.productList);
  const {loading, error, products} = productList ;
  useEffect(()=>{
   dispatch(listProduct());

  },[dispatch]);

  return ( 
    <>
    {
      loading ? <Loader/>:error ? <Message variant="danger">{error}</Message> : <Row>
      {products.map((product) => (
        <Col key={product._id} Col md={3}>
          <ProductScreen product={product} />
        </Col>
      ))}
    </Row>
    }
     
    </>
  );
};

export default HomeScreen;
