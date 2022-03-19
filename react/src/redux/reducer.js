import {combineReducers} from "redux"
import {cart} from "./reducers/cart"
import {auth} from "./reducers/auth"

export const rootReducer = combineReducers({
    cart,
    auth
})