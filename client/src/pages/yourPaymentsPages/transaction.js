import React from 'react'
import {Accordion, Card, Button} from 'react-bootstrap'
function Transaction() {

    return (
        <>
            
        <div>
            <div style = {{display : "flex"} }> 
                    <p style = {{ fontSize : "1.2rem" , fontWeight : "bold"}}>Your Transations History</p>
        
            </div>
            
            <Accordion>
            <Card style = {{border : "1px solid #bfbfbf", borderRadius : "3px", marginBottom: "5px"}}>
              <div style = {{ width : "100%", borderRadius : "3px", backgroundColor : "#f2f2f2"}}>
                <Accordion.Toggle as={Button}  style = {{height : "40px", 
                                                         width : "100%", 
                                                         textAlign: "left", 
                                                         display : "flex", 
                                                         justifyItems : "center",
                                                         fontSize : "0.8rem",
                                                         paddingTop : "9px"}} variant = "black" eventKey= "0">
                    <div style = {{width: "475px"}}>
                        <p > completed on 4/12/2020 </p> 
                    </div>
                    
                
                </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey = "0" >
                <div style = {{display : "flex", justifyContent : "space-between", margin: "20px 10px"}}>
                    <div style = {{display : "flex"}}> 
                        <p style = {{margin : "0 0", fontWeight : "bold"}}>history detail </p>
                        <p style = {{margin : "0 10px"}}> </p>
                    </div>
                </div>
                
                </Accordion.Collapse>
            </Card>
            </Accordion> 

        </div>

       
        </>
    )
}

export default Transaction