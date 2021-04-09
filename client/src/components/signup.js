import React, {useState}from "react"
import {Nav, Form, Button, Modal} from "react-bootstrap"
import {db} from '../constant/constant'
function SignUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    

    const isInValid = email === '' || password === '' || firstname === '' || firstname === '' || lastname === '' || username === ''

    async function handleSignUp(event) {
        event.preventDefault()
        if (!username || !password) {
            return;
        }

        try{
            let res = await fetch(`${db}user/getCaptcha`, {
    
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    username: username,
                    password: password,
                    email : email,
                    firstname : firstname,
                    lastname : lastname
                })

            });
            let result = await res.json();

            if (result ) {
                props.signUpToSignIn()
            } else {
                return
            }
            
        }catch(e){
            console.log(e);
        }
    }
    return(
        <>
            <Modal show={props.signUpShow} onHide={props.handleSignUpClose}>
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
                            <Form.Control type="text" placeholder="first name" onChange={({ target }) => setFirstname(target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="last name" onChange={({ target }) => setLastname(target.value)}/>
                        </Form.Group>          
                    </Modal.Body>

                    <Modal.Footer>
                        <Form.Text style = {{fontSize : "0.7rem"}}>
                            Aready Have an Account? 
                        </Form.Text>  
                        <Nav.Link style = {{fontSize : "0.75rem"}} onClick = {props.signUpToSignIn}>Sign In.</Nav.Link>  
                        <Button variant="primary" type="submit" disabled = {isInValid}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}


export default SignUp