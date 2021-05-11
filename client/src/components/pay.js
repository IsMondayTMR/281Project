import React, {useState,useContext, useEffect}from 'react'
import {Form, Button, Modal} from "react-bootstrap"
import {db} from '../constant/constant'
import {Context} from '../context/userContext'

function Pay(props) {
    const [selectedCard, setSelectedCard] = useState();
    const [csv, setCsv] = useState('')
    const {user} = useContext(Context)
   
    const [show,setShow] = useState(false)
    const handleClose = () => {setShow(false)}
    const handleOpen = () => {setShow(true)}
    const IsInValid = csv.length < 3 || csv === ''
    useEffect(() => {
        setSelectedCard(props.cards[0])
    })
   console.log(selectedCard)

    async function handlePay(event) {
        event.preventDefault()
        if (csv === null || csv === undefined) {
            alert("please enter csv")
            return;
        }
   
        try {
            let token = user
            
            let res = await fetch(`${db}pay`, {
                method : "post",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token" : token
                },
                body: JSON.stringify({
                    c_num: selectedCard.card_number,
                    payment_method: selectedCard.type,
                    car_model: props.model,
                    car_color: props.color,
                    start_time: props.startTime,
                    end_time:  props.endTime,
                    start_location: props.departure,
                    end_location: props.destination,
                    payment: props.amount
                })
            })
            
            let result = await res.json()
            
            if (result && result.message == "transaction complete"){
                console.log(result.message)
                props.handleClose()
                handleOpen()
            } else {
                alert("there is something wrong with the payment, please contact with support")
            }
            
        } catch(e){
            console.log(e);
        }
        
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
                        <Modal.Title>Payment</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h5>Bill information</h5>
                        <div>
                            <div style = {{display : "flex"}}>
                                <div style = {{display : "flex", alignItems: "center", width : "240px"}}>
                                    <p style = {{marginRight : "1rem" , fontWeight : "bold"}}>Departure: </p>
                                    <p>{props.departure}</p>
                                </div>
                                <div style = {{display : "flex", alignItems: "center"}}>
                                    <p style = {{marginRight : "1rem", fontWeight : "bold"}}>Destination: </p>
                                    <p>{props.destination}</p>
                                </div>
                            </div>

                            <div style = {{display : "flex"}}>
                                <div style = {{display : "flex", alignItems: "center",  width : "240px"}}>
                                    <p style = {{marginRight : "1rem" , fontWeight : "bold"}}>Start: </p>
                                    <p style = {{fontSize: "0.9rem"}}>{props.startTime ? props.startTime.substr(0, props.startTime.length - 3) : "null"}</p>
                                </div>
                                <div style = {{display : "flex", alignItems: "center"}}>
                                    <p style = {{marginRight : "1rem", fontWeight : "bold"}}>End: </p>
                                    <p style = {{fontSize: "0.9rem"}}>{props.endTime ? props.endTime.substr(0, props.endTime.length - 3) : "null"}</p>
                                </div>
                                
                            </div>

                            <div style = {{display : "flex"}}>
                                <div style = {{display : "flex", alignItems: "center" , width : "240px"}}>
                                    <p style = {{marginRight : "1rem" , fontWeight : "bold"}}>Model: </p>
                                    <p style = {{fontSize: "0.9rem"}}>{props.model}</p>
                                </div>
                                <div style = {{display : "flex", alignItems: "center"}}>
                                    <p style = {{marginRight : "1rem", fontWeight : "bold"}}>Color: </p>
                                    <p style = {{fontSize: "0.9rem"}}>{props.color}</p>
                                </div>
                                
                            </div>
                            <div style = {{display : "flex",  justifyContent : "space-between"}}>
                                <div style = {{display : "flex", alignItems: "center" , width : "240px"}}>
                                    <p style = {{marginRight : "1rem" , fontWeight : "bold"}}>Duration: </p>
                                    <p style = {{fontSize: "0.9rem"}}>{props.duration} s</p>
                                </div>
                                
                            </div>

                            <div style = {{display : "flex",  justifyContent : "space-between"}}>
                                <div style = {{display : "flex", alignItems: "center"}}>
                                    <p style = {{marginRight : "1rem" , fontWeight : "bold"}}>Amount: </p>
                                    <p style = {{fontSize: "0.9rem"}}>{props.amount ? props.amount.toLocaleString("en-US", { style: "currency",  currency: "USD"}) : null}</p>
                                </div>
                                
                            </div>
                        </div>
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
                        <Button variant="primary" type="submit" disabled = {IsInValid} >
                            Pay
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>


            <Modal show={show} onHide={handleClose}>
                
                    <Modal.Header closeButton>
                        <Modal.Title>PaymentComplete</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        transaction complete, you can check all detail information later in the transaction section
                    </Modal.Body>

            </Modal>
        </>
    )
}

export default Pay