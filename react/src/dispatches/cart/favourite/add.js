import { dispatchConstants } from "../../../redux/constants"
import { store } from "../../../redux/store"

export const addToFavouriteInCart = product => {
    store.dispatch({
        type: dispatchConstants.CART.FAVOURITE.ADD,
        product
    })
}