import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './../components/shared/FormContainer';
import {saveshippingAddress} from '../actions/cartAction'
import { useNavigate } from 'react-router-dom';
import CheckOutStep from '../components/shared/CheckOutStep';

const ShippingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveshippingAddress({address, city, postalCode, country}));
        navigate('/payment');
    }
  return (
    <FormContainer>
      <CheckOutStep step1 step2 />
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder='Enter Address' value={address} onChange={e=>setAddress(e.target.value)} required>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder='Enter City' value={city} onChange={e=>setCity(e.target.value)} required>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
            <Form.Label>Postalcode</Form.Label>
            <Form.Control type="text" placeholder='Enter Postalcode' value={postalCode} onChange={e=>setPostalCode(e.target.value)} required>
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder='Enter Country' value={country} onChange={e=>setCountry(e.target.value)} required>
            </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>continue</Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
