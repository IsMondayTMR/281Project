import React, {useState} from "react"
import {Navbar,Nav, Form, FormControl, Button, Modal, Alert} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ROUTES from "../constant/constant"
function HeaderContainer(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [alertShow, setAlertShow] = useState(false);
    const [show, setShow] = useState(false);
    const [signUpShow, setsignUpShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSignUpClose = () => setsignUpShow(false);

    const alert = alertShow ? <Alert variant= "primary"> please fill out all required form </Alert> : null

    function handleSignUpShow() {
        handleClose()

        setsignUpShow(true)
    }

    function signUpToSignIn() {
        handleSignUpClose()

        handleShow(true)
    }
  
    async function handleSignIn(event) {
        event.preventDefault()
        if (!username || !password) {
            setAlertShow(true)
            return;
        }
    
        try{
            let res = await fetch("", {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    
                })
            });
            let result = await res.json();
            
        }catch(e){
            console.log(e);
        }
    }

    async function handleSignUp(event) {
        event.preventDefault()
        if (!username || !password) {
            setAlertShow(true)
            return;
        }

        try{
            let res = await fetch("http://localhost:8099/user/getCaptcha", {
    
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    username: username,
                    password: password,
                    email : email
                })
            });
            
        }catch(e){
            console.log(e);
        }
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
            
               
            <Modal show={show} onHide={handleClose}>
                {alert}
                <Form  onSubmit = {handleSignIn}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={({ target }) => setEmail(target.value)}/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={({ target }) => setPassword(target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remeber me" />
                        </Form.Group>
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Form.Text style = {{fontSize : "0.7rem"}}>
                            New to our website? 
                        </Form.Text>  
                        <Nav.Link style = {{fontSize : "0.75rem"}} onClick = {handleSignUpShow}>Sign up now.</Nav.Link>  
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
                
            <Modal show={signUpShow} onHide={handleSignUpClose}>
                <Form onSubmit = {handleSignUp} >
                    <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" onChange={({ target }) => setUsername(target.value)}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={({ target }) => setEmail(target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={({ target }) => setPassword(target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="first name" />
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="last name" />
                        </Form.Group>          
                    </Modal.Body>

                    <Modal.Footer>
                        <Form.Text style = {{fontSize : "0.7rem"}}>
                            Aready Have an Account? 
                        </Form.Text>  
                        <Nav.Link style = {{fontSize : "0.75rem"}} onClick = {signUpToSignIn}>Sign In.</Nav.Link>  
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
               
            </Navbar>
        </>
    )
}

export default HeaderContainer