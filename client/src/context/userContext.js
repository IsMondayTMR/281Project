import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from '../constant/constant'
import * as Utils from '../utils/functions'
import jwt_decode from 'jwt-decode'
const Context = React.createContext()
function UserContext({children}){

    const history = useHistory()
    const [user, setUser] = useState();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect (() => {
    
        const current = JSON.parse(localStorage.getItem('token'))
        const sessionUser = JSON.parse(sessionStorage.getItem('token'))

        if ((current === undefined || current === null) && (sessionUser === undefined || sessionUser === null)) {
            setIsAuthorized(false)
            return true;
        }

        if (sessionUser !== null || sessionUser !== undefined) {
            setUser(sessionUser)
            setIsAuthorized(true)
            return false
        }

        var decoded = jwt_decode(user);
        var exp = decoded.exp
        
        if (Date.now() < exp * 1000) {
            setUser(current)
            setIsAuthorized(true)
            return false
        }
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
        setIsAuthorized(false)
        return true;
    }, [user])
    function logout(){
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
        setUser(null);
        setIsAuthorized(false)
        history.push(ROUTES.HOME);
        Utils.refresh()
    }
    return(
        <Context.Provider value = {{user, setUser, logout, isAuthorized}}>
            {children}
        </Context.Provider>
    )
}

export {UserContext, Context};