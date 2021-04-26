import React, {useState} from "react"
import {Button, Form, Col} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';


const profileContainer = {
    height : '100%',
    padding : "1% 1.5%",
    backgroundColor : '#f0f0f0',
}

const formContainer = {
    width : "700px",
    height : "500px",
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
                    
                  
                </Form> 
            </div>
        </div>
    )
}

export default Preference