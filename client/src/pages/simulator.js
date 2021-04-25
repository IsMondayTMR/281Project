import React, {useEffect, useState,useContext}from 'react'
import {useHistory} from 'react-router-dom'
import {Context} from '../context/userContext'
import {db} from '../constant/constant'
import * as ROUTES from '../constant/constant'
function Simulator() {

    const [cards, setCards] = useState([])
    const {user} = useContext(Context)
    const history = useHistory()
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
            if (cardsResult.length === 0) {
                alert("please add an card to use this service")
                history.push(ROUTES.YOURPAYMENTS)
            }

        }catch(e){
            console.log(JSON.parse(JSON.stringify(e)));
        }
    }
    return (
        <>
        this is user Simulator page
        </>
    )
}

export default Simulator