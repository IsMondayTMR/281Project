import React, {useState, useContext} from "react"
import { useHistory } from 'react-router-dom';
import {Nav, Form, Button, Modal} from "react-bootstrap"
import * as ROUTES from "../constant/constant"
import * as Utils from "../utils/functions"
import {db} from "../constant/constant"
import {Context} from '../context/userContext'

function SignIn(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user, setUser} = useContext(Context)

    const history = useHistory()
    const isInValid = email === '' || password === ''

    

    async function handleSignIn(event) {
        event.preventDefault()
        if (isInValid) {
  
            return;
        }
    
        try{
            let res = await fetch(`${db}user/login`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            });
            let result = await res.json()

            if(result){
                if(result && result.data.token ){
                    localStorage.setItem('token', JSON.stringify(result.data.token));
                    setUser(JSON.parse(localStorage.getItem('token')));
       
                }

            }else if(result && result.success === false){
                alert(result.msg);
            }
            
        }catch(e){
            console.log(e);
        }
    }
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
           
                <Form  onSubmit = {handleSignIn}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" onChange={({ target }) => setEmail(target.value)}/>
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
                        <Nav.Link style = {{fontSize : "0.75rem"}} onClick = {props.handleSignUpShow}>Sign up now.</Nav.Link>  
                        <Button variant="primary" type="submit" disabled = {isInValid}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default SignIn