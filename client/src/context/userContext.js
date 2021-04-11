import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constant/constant'
import * as Utils from '../utils/functions'
import jwt_decode from 'jwt-decode'
const Context = React.createContext()
function UserContext({children}){

    const history = useHistory()
    const [user, setUser] = useState();


    function isExpired() {
    
        const current = JSON.parse(localStorage.getItem('token'))
        const sessionUser = JSON.parse(sessionStorage.getItem('token'))
        
        if ((current === undefined || current === null) && (sessionUser === undefined || sessionUser === null)) {
            return true;
        }

        if (sessionUser !== null || sessionUser !== undefined) {
            setUser(sessionUser)
            return false
        }

        var decoded = jwt_decode(user);
        var exp = decoded.exp

        if (Date.now() < exp * 1000) {
            setUser(current)
            return false;
        }
        localStorage.removeItem("token")
        return true;
    }
    function logout(){
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
        setUser(null);
        history.push(ROUTES.HOME);
        Utils.refresh()
    }
    return(
        <Context.Provider value = {{user, setUser, logout, isExpired}}>
            {children}
        </Context.Provider>
    )
}

export {UserContext, Context};