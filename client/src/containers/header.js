import React, {useContext} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderAfterSignIn from "./headerAfterSignIn"
import HeaderBeforeSignIn from "./headerBeforeSignIn"
import {Context} from '../context/userContext'
function HeaderContainer(props) {
    const {isExpired, logout} = useContext(Context)
    const Header = isExpired() ? <HeaderBeforeSignIn/> : <HeaderAfterSignIn  logout = {logout}/>
    return (
        <>
            {Header}
        </>
    )
}

export default HeaderContainer