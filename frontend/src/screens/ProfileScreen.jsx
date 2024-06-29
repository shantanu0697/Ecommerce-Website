import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userAction';

const ProfileScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user || !user.name) {
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [navigate, userInfo, user, dispatch]);

    useEffect(() => {
        console.log("userDetails:", userDetails);
        if (user && user._id) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Submit handler triggered');
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
        } else {
            setMessage('');
            if (user && user._id) {
                console.log('Dispatching updateUserProfile action');
                dispatch(updateUserProfile({ id: user._id, name, email, password }));
            } else {
                console.error('User ID is missing');
            }
        }
    };

    return (
        <>
            <Row>
                <Col md={3}>
                    <h1>Update Information</h1>
                    {/* {error && <Message variant="danger">{error}</Message>} */}
                    {success && <Message variant="success">Profile Updated</Message>}
                    {/* {loading && <Loader />} */}
                    {message && <Message variant="danger">{message}</Message>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                </Col>
                <Col md={9}>
                    <h1>My Orders</h1>
                </Col>
            </Row>
        </>
    );
};

export default ProfileScreen;
