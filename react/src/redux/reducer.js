import {combineReducers} from "redux"
import auth from './reducers/auth'
import message from "./reducers/message"

export default combineReducers({
    auth,
    message
})

