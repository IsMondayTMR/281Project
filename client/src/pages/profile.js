import React, {useState} from 'react'
import {Card, Button, Form, Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../img/touxiang.jpg'

const profileContainer = {
    height : '100%',
    padding : '2.5%',
    backgroundColor : '#f0f0f0',
    display : 'flex'
}
const cardContainer = {
    width : "30rem",
    margin : "0 auto",
    boxShadow: "10px 15px 15px  #cfcfcf",
    height : "600px"
}

const formContainer = {
    margin : "0 auto",
    marginLeft : "100px",
    width : "1000px",
    height : "650px",
    backgroundColor : "white",
    padding : "2%",
    boxShadow: "10px 15px 15px #cfcfcf"
}

const inputBox = {
    width : "80%"
}

function Profile() {
    const [update, setUpdate] = useState(true)

    function updateHelper() {
        setUpdate(!update)
    }
    console.log(update)
    return (
        <div style = {profileContainer}>
            <div style = {cardContainer}>
                <Card style = {{ width: '30rem', height : "100%"}}>
                    <Card.Img variant="top" src = {img} style = {{width : '400px', height : '400px', borderRadius : '100%', objectFit : 'cover', margin : '0 auto'}}/>
                    <Card.Body>
                        <Card.Title>Welcome, !!!!</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
            </div>

            <div style = {formContainer}>
        
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" disabled = {update} style = {inputBox}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridUsername">
                        <Form.Label>User name</Form.Label>
                        <Form.Control type="text" placeholder="User name" disabled = {update} style = {inputBox}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstname">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="First name" disabled = {update} style = {inputBox}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLastname">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="password" placeholder="Last name" disabled = {update} style = {inputBox}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="1234 Main St" disabled = {update}/>
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" disabled = {update}/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control disabled = {update}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select" defaultValue="Choose..." disabled = {update}>
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control disabled = {update}/>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" onClick = {updateHelper} style = {{marginTop : "50px"}}>
                        Update
                    </Button>
                </Form> 
             
            </div>
        </div>
    )
}

export default Profile