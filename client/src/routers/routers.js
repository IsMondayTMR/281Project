import React from "react"
import {Route, Switch} from "react-router-dom"
import * as ROUTES from '../constant/constant'

import Home from "../pages/home"
import Service from "../pages/service"
import Sigin from "../pages/signin"
function Routers() {
    return (
        <Switch>
            <Route exact path = {ROUTES.HOME}><Home/></Route>
            <Route exact path = {ROUTES.SERVICE}><Service/></Route>
            <Route exact path = {ROUTES.SIGNIN}><Sigin/></Route>
        </Switch>
    )
}

export default Routers