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
    const [admin, setAdmin] = useState()
    useEffect (() => {
    
        const current = JSON.parse(localStorage.getItem('token'))
        const sessionUser = JSON.parse(sessionStorage.getItem('token'))
        const administrator = JSON.parse(sessionStorage.getItem('admin'))
        
        if ((current === undefined || current === null) && (sessionUser === undefined || sessionUser === null)) {
            setIsAuthorized(false)
            return true;
        }

        if (sessionUser !== null || sessionUser !== undefined) {
            setUser(sessionUser)
            setAdmin(administrator)
            setIsAuthorized(true)
            return false
        }

        var decoded = jwt_decode(user);
        var exp = decoded.exp
        
        if (Date.now() < exp * 1000) {
            setUser(current)
            setAdmin(administrator)
            console.log(administrator)
            setIsAuthorized(true)
            return false
        }
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("admin")
        setIsAuthorized(false)
        return true;
    }, [user])
    function logout(){
        localStorage.removeItem("token")
        sessionStorage.removeItem("token")
        localStorage.removeItem("admin")
        sessionStorage.removeItem("admin")
        setUser(null);
        setAdmin(null)
        setIsAuthorized(false)
        history.push(ROUTES.HOME);
        Utils.refresh()
    }
    return(
        <Context.Provider value = {{user, setUser, logout, isAuthorized, admin, setAdmin}}>
            {children}
        </Context.Provider>
    )
}

export {UserContext, Context};