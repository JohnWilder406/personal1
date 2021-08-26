import React, { useState, useEffect } from 'react';
import {Button, Card, Form, Row, Col, Container, Nav, Navbar} from 'react-bootstrap'
import numberGen from '../../helpers/number';
import axios from 'axios';

const AddClimb = (props) => {
    const {wall} = props
    const [errors, setErrors] = useState({});
    const [climb, setClimb] = useState({
        name: "",
        difficulty: "",
        firstAscent: "",
        ascents: []
    })




//submit handler- creates new climb in database
const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/walls/'+ wall.id+'/add_climb', climb)
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
        let newObject = { ...climb};
        console.log(e.target.name)
        newObject[e.target.name] = e.target.value;
        setClimb(newObject)
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
                                Climb Name
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control
                                type="text"
                                name="name"
                                value={climb.name}
                                onChange={(e) => inputChange(e)} />
                            {
                                errors.name ? <span className="error">{errors.name.message}</span> : null
                            }
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm={2}>
                                Climb.difficulty
                            </Form.Label>
                            <Col sm={8}>
                            <Form.Control
                                type="number"
                                name="difficulty"
                                value={wall.difficulty}
                                onChange={(e) => inputChange(e)} />
                                {
                                errors.difficulty ? <span className="error">{errors.difficulty.message}</span> : null
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
