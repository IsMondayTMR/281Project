import React from 'react'
import {Accordion, Card, Button} from 'react-bootstrap'
function History() {
    const historyContainer = {
        height : '100%',
        backgroundColor : '#f0f0f0',
        display : 'flex'
    }
    const HistoryContainer = {
        width : "60%",
        backgroundColor : 'white',
        padding : "2.5%",
        margin : "50px auto",
        boxShadow: "5px 5px 15px 5px  #cfcfcf",
    }

    const title = {
        fontSize : "2.5rem",
        fontWeight : "bold",

    }
    return (
        <div style = {historyContainer}>
            
            <div style = {HistoryContainer}>
                <p style = {title}>User History</p>
                <Accordion>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            History 1
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            History 2
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        </div>
    )
}

export default History