import React from "react"
import {Navbar,Nav, Button, Dropdown} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ROUTES from "../constant/constant"

function HeaderAfterSignIn(props) {
   
    return (
        <>
            
            <Navbar bg="dark" variant="dark" style = {{height : '5rem'}}>
                <Navbar.Brand style = {{fontSize : "2rem", fontWeight : "bold"}} >DashBoard</Navbar.Brand>
                <Nav className="mr-auto">
  
                    <Nav.Link href = {ROUTES.CAR}>Car</Nav.Link>
                    <Nav.Link href = {ROUTES.DATA}>Data</Nav.Link>
                    <Nav.Link href = {ROUTES.MANAGEMENT}>Management</Nav.Link>
                </Nav>
                <Button variant="outline-info" onClick = {props.logout}>Log Out</Button>
            </Navbar>
        </>
    )
}

export default HeaderAfterSignIn