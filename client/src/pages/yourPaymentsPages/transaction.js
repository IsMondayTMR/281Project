import React, {useState, useEffect, useContext} from 'react'

import {Accordion, Card, Button} from 'react-bootstrap'
import {Context} from '../../context/userContext'
import {db} from '../../constant/constant'
function Transaction() {
    const [transactions, setTransactions] = useState();
    const {user} = useContext(Context)
    useEffect(() => {
        getHistory()
    },[])

    async function getHistory() {
        try{
            let token = user

            let res = await fetch(`${db}transaction`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-access-token" : token
                }
            })
      
            let result = await res.json()
            let transactionHistory = result.transaction_history;
            if (transactionHistory && transactionHistory.length > 0) {
                setTransactions(transactionHistory)
            }
        
           

        }catch(e){
            console.log(JSON.parse(JSON.stringify(e)));
        }
    }
    console.log(transactions)

    function transactionCard(transaction, index) {

        const cardEnding = transaction.card_number.substr(transaction.card_number.length - 4)
       return (<Card style = {{border : "1px solid #bfbfbf", borderRadius : "3px", marginBottom: "5px"}} key = {Math.random()}>
              <div style = {{ width : "100%", borderRadius : "3px", backgroundColor : "#f2f2f2"}}>
                <Accordion.Toggle as={Button}  style = {{height : "40px", 
                                                         width : "100%", 
                                                         textAlign: "left", 
                                                         display : "flex", 
                                                         justifyItems : "center",
                                                         fontSize : "0.8rem",
                                                         paddingTop : "9px"}} variant = "black" eventKey= {index}>
                    <div style = {{width: "100%", display : "flex", justifyContent : "space-between"}}>
                        <div> ending with {cardEnding} on {transaction.end_time}</div> 
                        <div> - {transaction.payment.toLocaleString("en-US", {style: "currency", currency: "USD"})}</div> 
                    </div>
                    
                
                </Accordion.Toggle>
                </div>
                <Accordion.Collapse eventKey = {index}>
                <div style = {{display : "flex", justifyContent : "space-between", margin: "20px 10px"}}>
                    <div style = {{fontSize : "0.9rem"}}> 
                        <div style = {{display : "flex", margin : "10px 0"}}>
                            <p style = {{margin : "0 0", width : "400px"}}>car color : {transaction.car_color} </p>
                            <p style = {{margin : "0 0", width : "400px"}}>car model : {transaction.car_model}  </p>
                        </div>
                        <div style = {{display : "flex", margin : "10px 0"}}>
                            <p style = {{margin : "0 0", width : "400px"}}>start time : {transaction.start_time}  </p>
                            <p style = {{margin : "0 0", width : "400px"}}>end time : {transaction.end_time}  </p>
                        </div>
                        <div style = {{display : "flex", margin : "10px 0"}}>
                            <p style = {{margin : "0 0", width : "400px"}}>start location : {transaction.start_location}  </p>
                            <p style = {{margin : "0 0", width : "400px"}}>end location : {transaction.end_location}  </p>
                        </div>
                        
                    </div>
                </div>
                
                </Accordion.Collapse>
            </Card>)
    }

    if (transactions && transactions.length > 0) {
        const items = transactions.map((transaction, index) => {return transactionCard(transaction, index + 1)})
        return (
            <>
                
            <div>
                <div style = {{display : "flex"} }> 
                        <p style = {{ fontSize : "1.2rem" , fontWeight : "bold"}}>Your Transations History</p>
            
                </div>
                
                <Accordion>
                    {items}
                </Accordion> 
    
            </div>
    
           
            </>
        )
    } else {
        return (
            <>
                
            <div>
                <div style = {{display : "flex"} }> 
                        <p style = {{ fontSize : "1.2rem" , fontWeight : "bold"}}>Your Transations History</p>
            
                </div>
                
                <Accordion>
                
                </Accordion> 
    
            </div>
    
           
            </>
        )
    }
    
}

export default Transaction