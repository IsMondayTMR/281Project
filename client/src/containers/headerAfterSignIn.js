import React, {useState, useContext} from "react"
import {Navbar,Nav, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ROUTES from "../constant/constant"

function HeaderAfterSignIn(props) {
   
    return (
        <>
            
            <Navbar bg="dark" variant="dark" expand = "xl">
                <Navbar.Brand href="#home" style = {{fontSize : "2rem", fontWeight : "bold"}} >DashBoard</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link>Home</Nav.Link>
                    <Nav.Link>Service</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Button variant="outline-info" onClick = {props.logout}>Log Out</Button>
            </Navbar>
        </>
    )
}

export default HeaderAfterSignIn