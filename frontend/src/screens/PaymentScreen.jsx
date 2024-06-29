import React,{useState} from 'react'
import {Form, Button, Col } from 'react-bootstrap'
import { savePaymentMethod } from '../actions/cartAction'
import CheckOutStep from './../components/shared/CheckOutStep';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if(!shippingAddress){
        navigate('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const submitHandler = (e) => {
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder');
    }

  return (
    <>
    <CheckOutStep step1 step2 step3/>
    <h1>Payment Method</h1>
    <Form onSubmit={submitHandler}>
        <Form.Group >
            <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
                <Form.Check type='radio' label='Paypal or Credit Card'
                id="paypal" name='paymentMethod' value="paypal" checked
                onChange={e=>setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>

        </Form.Group>
        <Button type='submit' variant='primary' >Continue</Button>
    </Form>
    </>
  )
}

export default PaymentScreen
