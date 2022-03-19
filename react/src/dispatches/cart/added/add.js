import { dispatchConstants } from "../../../redux/constants"
import { store } from "../../../redux/store"

export const addToAddedInCart = product => {
    store.dispatch({
        type: dispatchConstants.CART.ADDED.ADD,
        product
    })
}