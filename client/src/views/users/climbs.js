import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Row, Col, Button, Nav, Navbar, Card} from 'react-bootstrap';
import Search from '../../components/users/Search';
import Logout from '../../components/users/Logout';
import { Link } from 'react-router-dom';

const UserClimbs = (props) => {
    const {wall} = props
    const [wallInfo, setWallInfo] = useState([]);
    const [climbs, setClimbs] = useState([])
    const [climbDefault, setClimbDefault] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/walls/' + wall._id)
            .then((res) => {
                console.log(res)
                setWallInfo(res.data)
                setClimbs(res.data.climbs)
                setClimbDefault(res.data.climbs)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



        //search filter
        const updateInput = async (searchQuery) => {
        const filtered = climbDefault.filter(climb => {
            if(climb.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return climb.name.toLowerCase().includes(searchQuery.toLowerCase())
            }
            
        })
        setSearchQuery(searchQuery);
        setClimbs(filtered)
    }


    return (
        <Container>
            <h1>Climbs</h1>
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
                        <th>Difficulty</th>
                        <th>First Ascent</th>
                        <th># of Repeats</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        {
                            climbs.map((climb, idx) => {
                                return(
                                    <tr key={idx}><td>{climb.name}</td><td>{climb.difficulty}</td><td>{climb.firstAscent}</td><td>{climbs.ascents.length}</td><td><Button>Favorite Climb</Button><Button>Sent!</Button></td></tr>
                                )
                            })
                        }
                    </tbody>
                </Table>

            </Card>
        </Container>
    )
}

export default UserClimbs;