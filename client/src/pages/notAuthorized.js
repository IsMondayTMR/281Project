import React, {useEffect} from "react"
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../constant/constant'
function NotAuthorized() {
    const history = useHistory()
    useEffect(()=>{
        setTimeout(() => {
            console.log("after 3 seconds and jump back to home page")
            history.push(ROUTES.HOME)
        }, 3000)
        
    })
    return (
        <>
            <p> please login first</p>
        </>
    )
}

export default NotAuthorized