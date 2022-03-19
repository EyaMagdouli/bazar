import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

export const Protected = ({element})=>{
    const { isLoggedIn } = useSelector(s=>s.auth)
    const nav = useNavigate()

    useEffect(() => {
        if(isLoggedIn === false) {
            nav("/login")
        }
    }, [isLoggedIn])

    if(isLoggedIn==null) return "Loading..."
    else if(isLoggedIn) return element
    else return null
}