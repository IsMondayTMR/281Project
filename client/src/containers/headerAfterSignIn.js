import React, {useState, useContext} from "react"
import {Navbar,Nav, Button, Dropdown} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ROUTES from "../constant/constant"

function HeaderAfterSignIn(props) {
   
    return (
        <>
            
            <Navbar bg="dark" variant="dark" style = {{height : '5rem'}}>
                <Navbar.Brand href= {ROUTES.HOME} style = {{fontSize : "2rem", fontWeight : "bold"}} >DashBoard</Navbar.Brand>
                <Nav className="mr-auto">
                <Dropdown>
                    <Dropdown.Toggle variant = "dark" id = "dropdown-basic" >
                        Settings
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href = {ROUTES.PROFILE}>Profile</Dropdown.Item>
                        <Dropdown.Item href = {ROUTES.PREFERENCE}>Preference</Dropdown.Item>
                        <Dropdown.Item href = {ROUTES.BILLING}>Billing</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                    
                    <Nav.Link href = {ROUTES.SIMULATOR}>Simulator</Nav.Link>
                    <Nav.Link href = {ROUTES.HISTORY}>History</Nav.Link>
                </Nav>
                <Button variant="outline-info" onClick = {props.logout}>Log Out</Button>
            </Navbar>
        </>
    )
}

export default HeaderAfterSignIn