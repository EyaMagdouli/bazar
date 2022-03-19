import { dispatchConstants } from "../../../redux/constants"
import { store } from "../../../redux/store"

export const deleteFromAddedInCart = product => {
    store.dispatch({
        type: dispatchConstants.CART.ADDED.DELETE,
        product
    })
}