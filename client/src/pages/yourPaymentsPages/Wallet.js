import React, {useEffect, useState, useContext} from 'react'
import {CardForm} from '../../components/cardForm'
import {Context} from '../../context/userContext'
import {db} from '../../constant/constant'
import {refresh} from '../../utils/functions'
import {Accordion, Card, Button} from 'react-bootstrap'



function Wallet() {
    const [show, setShow] = useState(false)
    const [cards, setCards] = useState([])
    const close = () => setShow(false)
    const open = () => setShow(true) 
    const {user} = useContext(Context)

    useEffect(() => {
        getCards()
    },[])

    async function getCards() {
        try{
            let token = user

            let res = await fetch(`${db}card`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token" : token
                }
            })
      
            let result = await res.json()
            let cardsResult = result.cards
        
            if (cardsResult.length > 0) {
                setCards(cardsResult)
                
            }

        }catch(e){
            console.log(JSON.parse(JSON.stringify(e)));
        }
    }

    async function deleteCard(cardIndex) {
        // if (selectedCard == undefined || selectedCard == null) {
        //     alert("you need to select a card")
        // }
        try{
            let token = user

            let res = await fetch(`${db}card/${cardIndex}`, {
                method : 'delete',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token" : token
                }
            })
            let result = await res.json()
            console.log(result)
            refresh()

        }catch(e){
            console.log(JSON.parse(JSON.stringify(e)));
        }
    }
    
    function cardsContainer(card) {

        const digits = card.card_number.substr(card.card_number.length - 4)
        return ( 
            <Card style = {{border : "1px solid #bfbfbf", borderRadius : "3px", marginBottom: "5px"}}>
              <div style = {{ width : "100%", borderRadius : "3px", backgroundColor : "#f2f2f2"}}>
                <Accordion.Toggle as={Button}  style = {{height : "40px", 
                                                         width : "100%", 
                                                         textAlign: "left", 
                                                         display : "flex", 
                                                         justifyItems : "center",
                                                         fontSize : "0.8rem",
                                                         paddingTop : "9px"}} variant = "black" eventKey= {card.id}>
                    <div style = {{width: "475px"}}>
                        <p > {card.type} ending with {digits} </p> 
                    </div>
                    
                    <p> {card.exp} </p>
                </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey = {card.id} >
                <div style = {{display : "flex", justifyContent : "space-between", margin: "20px 10px"}}>
                    <div style = {{display : "flex"}}> 
                        <p style = {{margin : "0 0", fontWeight : "bold"}}>Name on Card : </p>
                        <p style = {{margin : "0 10px"}}> {card.name}</p>
                    </div>
                    <Button style = {{width : "75px", 
                                    height : "30px", 
                                    fontSize : "0.75rem", 
                                    padding : "2px", 
                                    backgroundColor : "#f2f2f2",
                                    border : "1px solid #bfbfbf",
                                    color : "black"
                                    }} onClick = {() => {deleteCard(card.id)}}>Delete card</Button>
                </div>
                
                </Accordion.Collapse>
            </Card>
        )
    }


    if (cards && cards.length > 0) {
        const cardsAccordion = cards.map(card => {
            return cardsContainer(card)
        })
        return (
            <>
            
            <div>
                <div style = {{display : "flex"} }> 
                    <div style = {{width: "488px"}}>
                        <p style = {{ fontSize : "1.2rem" , fontWeight : "bold"}}>Your credit and debit cards</p>
                    </div>
                    
                    <p style = {{fontSize : "1.2rem" , fontWeight : "bold"}}>expires </p>
                </div>
                
                <Accordion>
                    {cardsAccordion}
                </Accordion> 

            </div>

            <div>
                <p style = {{fontSize : "1.2rem" , fontWeight : "bold"}}>Add New Payment Method</p>

                <Button style = {{width : "200px", 
                                    height : "40px", 
                                    fontSize : "0.75rem", 
                                    padding : "2px", 
                                    backgroundColor : "#f2f2f2",
                                    border : "1px solid #bfbfbf",
                                    color : "black"
                                    }}onClick = {open} >
                    Add a credit card or debit card
                            </Button>
            </div>
            <CardForm show = {show} close = {close}/>
            </>
        )
    } else {
  
        return  (
            <div>
                <div>
                <p style = {{fontSize : "1.2rem" , fontWeight : "bold"}}>Add New Payment Method</p>

                <Button style = {{width : "200px", 
                                    height : "40px", 
                                    fontSize : "0.75rem", 
                                    padding : "2px", 
                                    backgroundColor : "#f2f2f2",
                                    border : "1px solid #bfbfbf",
                                    color : "black"
                                    }}onClick = {open} >
                    Add a credit card or debit card
                            </Button>
            </div>
            <CardForm show = {show} close = {close}/>
            </div>
            
        )
    }
   
}

export default Wallet