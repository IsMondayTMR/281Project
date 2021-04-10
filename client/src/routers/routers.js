import React from 'react'
import {Route, Switch} from 'react-router-dom'
import * as ROUTES from '../constant/constant'

import Home from '../pages/home'
import Service from '../pages/service'
import Sigin from '../pages/signin'
import UserMainPage from '../pages/userMainPage'
import Settings from '../pages/settings'
import Simulator from '../pages/simulator'
import History from '../pages/history'
function Routers() {
    return (
        <Switch>
            <Route exact path = {ROUTES.HOME}><Home/></Route>
            <Route exact path = {ROUTES.SERVICE}><Service/></Route>
            <Route exact path = {ROUTES.SIGNIN}><Sigin/></Route>
            <Route exact path = {ROUTES.USERMAINPAGE}><UserMainPage/></Route>
            <Route exact path = {ROUTES.SETTINGS}><Settings/></Route>
            <Route exact path = {ROUTES.SIMULATOR}><Simulator/></Route>
            <Route exact path = {ROUTES.HISTORY}><History/></Route>
        </Switch>
    )
}

export default Routers