import React, {useState} from "react"
import {Button, Form, Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


const profileContainer = {
    height : '100%',
    padding : "1% 1.5%",
    backgroundColor : '#f0f0f0',
}

const formContainer = {
    width : "1000px",
    height : "650px",
    margin : "0 auto",
    backgroundColor : "white",
    padding : "2%",
    boxShadow: "5px 5px 15px 5px  #cfcfcf",
  
}

const inputBox = {
    width : "80%"
}
const title = {
    fontSize : "2.5rem",
    fontWeight : "bold",
    marginBottom : "2rem"
}
function Preference() {
    const [update, setUpdate] = useState(true)

    function updateHelper() {
        setUpdate(!update)
    }
    console.log(update)
    return (
        <div style = {profileContainer}>
            <p style = {title}>User Preference</p>
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

export default Preference