import React, {useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAfterSignIn from "./headerAfterSignIn"
import HeaderBeforeSignIn from "./headerBeforeSignIn"
import HeaderAdmin from "./headerAdmin"
import {Context} from '../context/userContext'
function HeaderContainer() {
    const {isAuthorized, logout, admin} = useContext(Context)
    let Header = isAuthorized ? <HeaderAfterSignIn  logout = {logout}/> : <HeaderBeforeSignIn/>
    Header = admin ? <HeaderAdmin logout = {logout}/> : Header;
    return (
        <>
            {Header}
        </>
    )
}

export default HeaderContainer