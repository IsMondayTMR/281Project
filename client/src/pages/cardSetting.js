import React, {useEffect, useState, useContext} from 'react'
import {CardForm} from '../components/cardForm'
import {Context} from '../context/userContext'
import {db} from '../constant/constant'
import {Form,Button} from 'react-bootstrap'
import styles from "../css/selectForm.module.css"
import {refresh} from '../utils/functions'

const Container = {

    height : '100%',
    padding : "1% 1.5%",
    backgroundColor : '#f0f0f0',
}


function CardSetting() {
    const [show, setShow] = useState(false)
    const [cards, setCards] = useState([])
    const close = () => setShow(false)
    const open = () => setShow(true) 
    const {user} = useContext(Context)
    const [selectedCard, setSelectedCard] = useState()
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
    function cardsOption(card){

        let cardnumber = "●●●● ●●●● ●●●● " + card.card_number.substr(card.card_number.length - 4) + "   /   " + card.type
       
        return <option key = {card.id}> {cardnumber}</option>
    }
    function handleChange(value) {
        let digits = value.substring(14, 19)
        digits = digits.trim()
        cards.forEach(card => {
            let last4Digits = card.card_number.substr(card.card_number.length - 4)
  
            if (last4Digits == digits) {

                setSelectedCard(card.id)
            }})
    }

    async function deleteCard() {
        if (selectedCard == undefined || selectedCard == null) {
            alert("you need to select a card")
        }

        try{
            let token = user

            let res = await fetch(`${db}card/${selectedCard}`, {
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
    

    if (cards && cards.length > 0) {
        const Options =cards.map(card => {
            return cardsOption(card)
        })
        return (
            <div style = {Container}>
                <div className = {styles.formContainer} style = {{width : "600px", height : "600px", margin : "25px auto"}}>
                    <section style = {{textAlign : "center", height: "100%"}}>
                        <div className = {styles.selectContainer} >
         
                            <select
                                name="type"
                                id="type"
                                className = {styles.select}
                                onChange={({ target }) => handleChange(target.value)}>
                                {Options}
                            </select>
                            
                        </div>
                        <Button style = {{width : "75px", height : "30px", fontSize : "0.75rem", padding : "2px"}}onClick = {open}>Add card</Button>
                        <Button style = {{width : "75px", height : "30px", fontSize : "0.75rem", padding : "2px"}}onClick = {deleteCard}>Delete card</Button>
                    </section>
                   
                </div>
               
                <CardForm show = {show} close = {close}/>
            </div>
            
        )
    } else {
  
        return  (
            <div style = {Container}>
                <div className = {styles.formContainer} style = {{width : "600px", height : "600px", margin : "25px auto"}}>
                    <section style = {{textAlign : "center", height: "100%"}}>
                        <div className = {styles.selectContainer} >
         
                            <select
                                name="type"
                                id="type"
                                className = {styles.select}
                                onChange={handleChange}>
                                <option>......</option>
                            </select>
                            
                        </div>
                        <Button style = {{width : "75px", height : "30px", fontSize : "0.75rem", padding : "2px"}}onClick = {open}>Add card</Button>
                    </section>
                   
                </div>
               
                <CardForm show = {show} close = {close}/>
            </div>
            
        )
    }
   
}

export default CardSetting