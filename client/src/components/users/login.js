import React, {useState, useContext} from 'react';
import {Card, Form, Button, Row, Col, Container, Modal} from 'react-bootstrap';
import axios from 'axios'
// import { Link, navigate } from '@reach/router';
// import { LoginContext } from '../../context/context';  


const Login = (props) => {
    // const {setId} = useContext(LoginContext);
    const {setToken} = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [show, setShow] = useState(false);

    //modal close function for error popup
    const handleClose = () => setShow(false);
    

    //login function
    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/login", {
            email: email,
            password: password,
        },
        {
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            setToken(true);
            // setId(res.data.userId);
            // navigate("/main");            
        })
        .catch(err => {
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
            setShow(true);
        });
    }


    return (
        <Container className='loginContainer' >
        <Card border="dark" className="text-center">
        <Card.Header className="headers" style={{fontSize: "24px"}}>Login</Card.Header>
        <Card.Body className="bodys">
        <Form  className='text-center' onSubmit={login}>
            <Form.Group as={Row} className='text-center'>
                <Form.Label column sm={2}>Email:</Form.Label>
                <Col sm={8}>
                <Form.Control type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Password:</Form.Label>
                <Col sm={8}>
                <Form.Control type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" />
                </Col>
            </Form.Group>
        <Button className='submit_btn' size="lg" type="submit" >Login</Button>
        </Form>
        
        {/* <Row><Link style={{margin: 'auto'}} to="/register">Not registered? Click here.</Link></Row>
        <Row><Link style={{margin: 'auto'}} to="/admin">Admin? Click here.</Link></Row> */}
        </Card.Body>
    </Card>

    {/* The animation = false removes an error for the findDOMNode depreciated warning.  */}
    <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Body className="error text-center">
            {errorMessage}
        </Modal.Body>
        <Modal.Footer>
            <Button style={{marginRight: "200px"}} variant="dark" onClick={handleClose}>Close</Button>
        </Modal.Footer>
    </Modal>
    </Container>
    )
}

export default Login;

