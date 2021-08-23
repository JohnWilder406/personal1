import React, { useState, useEffect } from 'react';
import {Button, Card, Form, Row, Col, Container, Nav, Navbar} from 'react-bootstrap'
import numberGen from '../../helpers/number';
import axios from 'axios';

const AddWall = (props) => {
    const [errors, setErrors] = useState({});
    const [wall, setWall] = useState({
        name: "",
        angle: "",
        height: "",
        climbs: []
    })
    const [wallNumber, setWallNumber] = useState();


//retrieves customer db to assign next customer number for new customer using numberGen.
useEffect(() => {
    axios.get('http://localhost:8000/api/walls')
        .then((res) => {
            console.log(res.data)
            setWallNumber(numberGen(res.data))
        })
        .catch((err) => {
            console.log(err)
        })
}, []);

//submit handler- creates new customer in database
const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/walls/add_wall', wall)
        .then((res) => {
            console.log(res.data);
            if(res.data.errors) {
                setErrors(res.data.errors)
            } else {
                alert("Submit Successful")
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

    //input function to load changes into form for submission.
    const inputChange = (e) => {
        let newObject = { ...wall};
        newObject.number = wallNumber
        console.log(e.target.name)
        newObject[e.target.name] = e.target.value;
        setWall(newObject)
        console.log(newObject)
    }

    return (
        <Container>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: "10px"}} className="navbrand">Spray Brand Wall App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/userMain">Home</Nav.Link>
                </Nav>
            </Navbar>
            <Card border="dark" className="modularForm">
                <Card.Body>
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Wall Number
                            </Form.Label>
                            <Col sm={2}>
                            <Form.Control 
                            readOnly plaintext
                            name="number"
                            value={wallNumber} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Wall Name
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control
                                type="text"
                                name="name"
                                value={wall.name}
                                onChange={(e) => inputChange(e)} />
                            {
                                errors.name ? <span className="error">{errors.name.message}</span> : null
                            }
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Wall Height
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control
                                type="number"
                                name="height"
                                value={wall.height}
                                onChange={(e) => inputChange(e)} />
                                {
                                errors.height ? <span className="error">{errors.height.message}</span> : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" >
                            <Form.Label column sm={2}>
                                Wall Angle
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control
                                type="number"
                                name="angle"
                                value={wall.angle}
                                onChange={(e) => inputChange(e)} />
                                {
                                    errors.angle ? <span className="error">{errors.angle.message}</span> : null
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{span: 1, offset: 5}}>
                                <Button variant="dark" style={{width: "150px"}} type="submit">Add Wall</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default AddWall;
