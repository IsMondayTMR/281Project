import React, {useState} from "react"
import {Navbar,Nav, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ROUTES from "../constant/constant"
import SignUp from "../components/signup"
import SignIn from "../components/signin"
function HeaderBeforeSignIn(props) {


    const [show, setShow] = useState(false);
    const [signUpShow, setsignUpShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)
    const handleSignUpClose = () => setsignUpShow(false);

    function handleSignUpShow() {
        handleClose()

        setsignUpShow(true)
    }

    function signUpToSignIn() {
        handleSignUpClose()

        handleShow(true)
    }
  
    return (
        <>
            
            <Navbar bg="dark" variant="dark" expand = "xl">
                <Navbar.Brand href="#home" style = {{fontSize : "2rem", fontWeight : "bold"}} >Car Rental</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href={ROUTES.HOME} >Home</Nav.Link>
                    <Nav.Link href={ROUTES.SERVICE}>Service</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            
                <Button variant="outline-info" onClick={handleShow}>SignIn</Button>
                
                <SignIn show = {show} handleClose = {handleClose} handleSignUpShow = {handleSignUpShow}/>
                
                <SignUp signUpShow = {signUpShow} handleSignUpClose = {handleSignUpClose} signUpToSignIn = {signUpToSignIn}/>
                    
            </Navbar>
        </>
    )
}

export default HeaderBeforeSignIn