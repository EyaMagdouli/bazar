import { dispatchConstants } from "../../../redux/constants"
import { store } from "../../../redux/store"

export const deleteFromFavoriteInCart = product => {
    store.dispatch({
        type: dispatchConstants.CART.FAVOURITE.DELETE,
        product
    })
}