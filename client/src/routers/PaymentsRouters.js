import React from "react"
import {Route,Switch} from "react-router-dom"

import * as ROUTES from '../constant/constant'
import Transaction from '../pages/yourPaymentsPages/transaction'
import Overview from '../pages/yourPaymentsPages/overview'
import Wallet from '../pages/yourPaymentsPages/Wallet'
function PaymentsRouters() {
    return (

        <Switch>
            <Route exact path = {ROUTES.PAYMENTS_OVERVIEW}><Overview/></Route>
            <Route exact path = {ROUTES.PAYMENTS_TRANSACTION}><Transaction/></Route> 
            <Route exact path = {ROUTES.PAYMENTS_WALLET}><Wallet/></Route> 
        </Switch>

    )
}

export default PaymentsRouters