import React, {useState}from 'react'
import {Form, Button, Modal} from "react-bootstrap"
function Pay(props) {
    console.log(props.cards)
    const [selectedCard, setSelectedCard] = useState(props.cards[0]);
    const [csv, setCsv] = useState('')
    async function handlePay(event) {
        event.preventDefault()
        if (csv === null || csv === undefined) {
            alert("please enter csv")
            return;
        }
        console.log(csv)

        setTimeout(() => {
            alert("your payment was processed")
        }, 3000)
    }

    const cardsOptions = props.cards.map((card, index) => {
        const digits = card.card_number.substr(card.card_number.length - 4)
        const value = "number end with " + digits
        return <option value = {card} key = {index}> {value} </option>
    })
    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                
                <Form  onSubmit = {handlePay}>
                    <Modal.Header closeButton>
                        <Modal.Title>Pay</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="type">Cards</label>
                            <select
                                name="type"
                                id="type"
                                value={selectedCard}
                                className="form-control"
                                onChange={(event) => setSelectedCard(event.target.value)}>
                                {cardsOptions}
                            </select>
                        </div>
                        <div style = {{marginLeft : "370px"}}>
                            <label style = {{marginRight: "10px"}}>csv</label>
                            
                            <input type ="text" style = {{width: "50px", 
                                                          height : "30px", 
                                                          padding : "10px", 
                                                          border : "1px solid #c4c4c4", 
                                                          borderRadius : "5px", 
                                                          outline : "none", 
                                                          fontSize : "0.9rem"}}
                                                value = {csv}
                                                onChange = {({target}) => setCsv(target.value)}></input>
                        </div>
                      
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="primary" type="submit" >
                            Pay
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Pay