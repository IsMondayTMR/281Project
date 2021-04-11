import React, {useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAfterSignIn from "./headerAfterSignIn"
import HeaderBeforeSignIn from "./headerBeforeSignIn"
import {Context} from '../context/userContext'
function HeaderContainer(props) {
    const {isAuthorized, logout} = useContext(Context)
    const Header = isAuthorized ? <HeaderAfterSignIn  logout = {logout}/> : <HeaderBeforeSignIn/>
    return (
        <>
            {Header}
        </>
    )
}

export default HeaderContainer