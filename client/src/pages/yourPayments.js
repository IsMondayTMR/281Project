import React from 'react'
import {Navbar,Nav, Button, Dropdown} from "react-bootstrap"
import * as ROUTES from '../constant/constant'
import PaymentsRouters from '../routers/PaymentsRouters'
const container = {
    width : "50%",
    height : "100%",
    margin : "0 auto"
}

const title = {
    fontSize : "2.5rem",
    fontWeight : "bold",
}
function YourPayments() {
    return (
        <div style = {container}>
            <p style = {title}>Your Payments</p>
            <Navbar >
                <Nav.Link href = {ROUTES.PAYMENTS_OVERVIEW}>Overview</Nav.Link>
                <Nav.Link href = {ROUTES.PAYMENTS_WALLET}>Wallet</Nav.Link>
                <Nav.Link href = {ROUTES.PAYMENTS_TRANSACTION}>Transactions</Nav.Link>
            </Navbar>
            <PaymentsRouters/>
        </div>
    )
}

export default YourPayments