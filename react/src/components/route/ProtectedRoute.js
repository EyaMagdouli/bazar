import { useEffect } from "react";
import { useNavigate } from "react-router";
import { isLoggedIn } from "../auth/checkIsLoggedIn";

export const ProtectedRoute = ({ Component }) => {
    const nav = useNavigate()
    useEffect(() => {
        if(!isLoggedIn()) {
            nav("/login")
        }
    }, [])
    return Component;
};
