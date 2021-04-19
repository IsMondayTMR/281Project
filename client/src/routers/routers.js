import React, {useContext} from 'react'
import {Route, Switch} from 'react-router-dom'
import * as ROUTES from '../constant/constant'
import {Context} from '../context/userContext'
import Home from '../pages/home'
import Service from '../pages/service'

import UserMainPage from '../pages/userMainPage'
import Profile from '../pages/profile'
import Simulator from '../pages/simulator'
import History from '../pages/history'
import NotAuthorized from '../pages/notAuthorized'
import Preference from '../pages/preference'
import Price from '../pages/price'
import CardSetting from '../pages/cardSetting'
function Routers() {
    const {isAuthorized} = useContext(Context)

    const authorization = isAuthorized ? (
        <>
            <Route exact path = {ROUTES.USERMAINPAGE}><UserMainPage/></Route>
            <Route exact path = {ROUTES.PROFILE}><Profile/></Route>
            <Route exact path = {ROUTES.PREFERENCE}><Preference/></Route>
            <Route exact path = {ROUTES.CARDSETTING}><CardSetting/></Route>
            <Route exact path = {ROUTES.SIMULATOR}><Simulator/></Route>
            <Route exact path = {ROUTES.HISTORY}><History/></Route> 
        </>) : ( <NotAuthorized/>) 

    const HomePage = isAuthorized ?  (<UserMainPage/>) : (<Home/>) 

    return (
        <Switch>
            <Route exact path = {ROUTES.HOME}>{HomePage}</Route>
            <Route exact path = {ROUTES.SERVICE}><Service/></Route>
            <Route exact path = {ROUTES.PRICE}><Price/></Route>
            {authorization}
        </Switch>
    )
}

export default Routers