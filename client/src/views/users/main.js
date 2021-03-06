import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Row, Col, Button, Nav, Navbar, Card} from 'react-bootstrap';
import Search from '../../components/users/Search';
import Logout from '../../components/users/Logout';
import { useHistory } from 'react-router-dom';

const UserMain = (props) => {
    const [walls, setWalls] = useState([]);
    const [wallsDefault, setWallsDefault] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
    let history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api/walls')
            .then((res) => {
                console.log(res)
                setWalls(res.data)
                setWallsDefault(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleClick = () => {
        history.push('/climbs')
    }



        //search filter
        const updateInput = async (searchQuery) => {
        const filtered = wallsDefault.filter(wall => {
            if(wall.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return wall.name.toLowerCase().includes(searchQuery.toLowerCase())
            }
            
        })
        setSearchQuery(searchQuery);
        setWalls(filtered)
    }


    return (
        <Container>
            <h1>User Main Page</h1>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{marginLeft: "10px"}} className="navbrand">Spray Brand Wall App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/addwall">Add A Wall</Nav.Link>
                </Nav>
                <div style={{marginLeft: "275px"}}>
                    <Search searchQuery={searchQuery} onChange={updateInput} />
                </div>
                <div style={{marginLeft: "10px"}}>
                    <Logout admin={true}/>
                </div>
            </Navbar>
            <Card border="dark" className="modularForm">
                <Table>
                    <thead>
                        <th>Name</th>
                        <th>Angle</th>
                        <th>Height</th>
                        <th># of Climbs</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            walls.map((wall, idx) => {
                                return(
                                    <tr key={idx}><td>{wall.name}</td><td>{wall.angle}</td><td>{wall.height}</td><td>{wall.climbs.length}</td><td><Button onClick={handleClick}>Select Wall</Button><Button>Delete Wall</Button></td></tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            </Card>
        </Container>
    )
}

export default UserMain;