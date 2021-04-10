import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constant/constant'
import * as Utils from '../utils/functions'
import jwt_decode from 'jwt-decode'
const Context = React.createContext()
function UserContext({children}){

    const history = useHistory()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('token')));

    function isExpired() {
        if (user === undefined || user === null) {
            return true;
        }
        var decoded = jwt_decode(user);
        var exp = decoded.exp
        if (Date.now() < exp * 1000) {
            
            return false;
        }
        localStorage.removeItem("token")
        return true;
    }
    function logout(){
        localStorage.removeItem("token")
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