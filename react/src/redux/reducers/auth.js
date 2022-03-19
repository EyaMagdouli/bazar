import { dispatchConstants } from "../constants"

const init = {
    isLoggedIn: false
}
export const auth = (state=init, action)=>{
    switch(action.type){
        case dispatchConstants.AUTH.SET_LOGGED_IN:
            return {
                isLoggedIn: true,
                ...action.user
            }
        case dispatchConstants.AUTH.SET_LOGGED_OUT:
            return {
                isLoggedIn: false
            }
        default: 
        return state
    }
}