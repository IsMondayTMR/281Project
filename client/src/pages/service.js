import React from "react"
import {Card, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import img from '../img/uber.jpg'
import SmartX from '../img/UberX.png'
const cardContentContainer = {
    width : '1200px', 
    height : "700px", 
    outline : "none", 
    border : "none",
    margin : "0 auto",
    display : "flex",
}
const serviceContentContiner = {
    width : '1200px', 
    outline : "none", 
    border : "none",
    margin : "100px auto",

}
const service = {
    width: "400px",
    border : "none",
  
}
function Service() {
    return (
        <>
            <div style = {cardContentContainer}>
                <Card  style = {{width : "600px", height: '700px', border : "none"}}>
                            <Card.Body style = {{ display: "flex", flexWrap: "wrap", alignContent: "center" }}>
                                <Card.Title style = {{ marginBottom : '2rem', fontSize : "2rem", fontWeight : "bold"}}>Ride Options</Card.Title>
                                <Card.Text style = {{ marginBottom : '2rem', fontSize : "1.4rem" }}>
                                    Always the ride you want. Our app gives you the power to get where you want to go with 
                                    access to different types of rides across more than 10,000 cities. All of our service are doing automatically
                                </Card.Text>
                                <Button variant = "dark" style = {{width : "200px", height: '50px', fontSize : "1.2rem"}}>take a ride</Button>
                            </Card.Body>
                </Card>
                <div>
                    <img src = {img} alt = "this is a alt"></img>
                </div>
            </div>
            
            <div style = {serviceContentContiner}>
            <p style = {{fontSize : "2.2rem", fontWeight : "500"}}>Rides from around the world</p>
                <div style = {{display : "flex"}}>

                    <Card style = {service}>
                        <Card.Img variant="top" src = {SmartX} />
                        <Card.Body>
                            <Card.Title>SmartX</Card.Title>
                            <Card.Text>
                                Affordable rides, all to yourself
                            </Card.Text>
                            <Button variant="dark ">Learn more about SmartX</Button>
                        </Card.Body>
                    </Card>

                    <Card style = {service}>
                        <Card.Img variant="top" src = {SmartX} />
                        <Card.Body>
                            <Card.Title>Smart Pool</Card.Title>
                            <Card.Text>
                                Shared rides, door to door or with a short walk 
                            </Card.Text>
                            <Button variant="dark ">Learn more about Smart Pool</Button>
                        </Card.Body>
                    </Card>

                    <Card style = {service}>
                        <Card.Img variant="top" src = {SmartX} />
                        <Card.Body>
                            <Card.Title>Smart Comfort</Card.Title>
                            <Card.Text>
                                Newer cars with extra legroom
                            </Card.Text>
                            <Button variant="dark   ">Learn more about Smart Comfort</Button>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>
    )
}
export default Service