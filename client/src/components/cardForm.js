import React, {useContext} from 'react'
import Styles from '../styledComponents/cards/styles'
import { Form, Field } from 'react-final-form'
import Card from '../styledComponents/cards/cards'
import {db} from "../constant/constant"
import {Context} from '../context/userContext'
import { MDBCloseIcon } from "mdbreact"
import {Modal} from "react-bootstrap"
import {refresh} from '../utils/functions'
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  GetCardType
} from '../utils/cardUtils'


export function CardForm(props) {
  const {user} = useContext(Context)


  const onSubmit = async values => {
      try{
        let token = user
        let type =  GetCardType(values.number)
        let res = await fetch(`${db}card`, {
            method: 'post',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token" : token
            },
  
            body: JSON.stringify({
              card_number : values.number,
              exp : values.exp,
              name : values.name,
              cvc : values.cvc,
              type : type
          })
        })
    
        let result = await res.json()
      
        refresh()
    }catch(e){
        console.log(JSON.parse(JSON.stringify(e)));
    }
  }

  return (
    <Modal show={props.show} onHide={props.close}>
      <Styles style = {{ border:"none"}}>
        <Form
        
          onSubmit={onSubmit}
          render={({
            handleSubmit,
            form,
            submitting,
            pristine,
            values,
            active
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <div style = {{display: "flex", flexDirection : "column"}}>
                <MDBCloseIcon style = {{marginLeft: "auto", marginRight: "0",height : "40px", width : "40px", border : "#a6a6a6 solid 1px", color : "#4d4d4d"}} 
                              onClick = {props.close}/>
                <Card
                  number ={values.number || ''}
                  name = {values.name || ''}
                  expiry = {values.exp || ''}
                  cvc = {values.cvc || ''}
                  focused = {active}
  
                  
                />
                </div>
                <div>
                  <Field
                    name="number"
                    component="input"
                    type="text"
                    pattern="[\d| ]{16,22}"
                    placeholder="Card Number"
                    format={formatCreditCardNumber}
                  />
                </div>
                <div>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <Field
                    name="exp"
                    component="input"
                    type="text"
                    pattern="\d\d/\d\d"
                    placeholder="Valid Thru"
                    format={formatExpirationDate}
                  />
                  <Field
                    name="cvc"
                    component="input"
                    type="text"
                    pattern="\d{3,4}"
                    placeholder="CVC"
                    format={formatCVC}
                  />
                </div>

                <div className="buttons">
                  <button type="submit" disabled={submitting}>
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                </div>
              </form>
            )
          }}
        />
    </Styles>
  </Modal>
  )
}
  
