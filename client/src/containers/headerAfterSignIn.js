import React, {useState, useContext} from "react"
import {Navbar,Nav, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ROUTES from "../constant/constant"

function HeaderAfterSignIn(props) {
   
    return (
        <>
            
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home" style = {{fontSize : "2rem", fontWeight : "bold"}} >DashBoard</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href = {ROUTES.SETTINGS}>Setting</Nav.Link>
                    <Nav.Link href = {ROUTES.SIMULATOR}>Simulator</Nav.Link>
                    <Nav.Link href = {ROUTES.HISTORY}>History</Nav.Link>
                </Nav>
                <Button variant="outline-info" onClick = {props.logout}>Log Out</Button>
            </Navbar>
        </>
    )
}

export default HeaderAfterSignIn