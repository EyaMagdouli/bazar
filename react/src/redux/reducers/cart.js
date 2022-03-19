import { dispatchConstants } from "../constants"

const init = {
    favorite: [],
    added: []
}
export const cart = (state=init,action)=>{
    switch(action.type){
        case dispatchConstants.CART.FAVOURITE.ADD:
            return {
                ...state,
                favorite: [
                    ...state.favorite,
                    action.product
                ]
            }
        case dispatchConstants.CART.ADDED.ADD:
            return {
                ...state,
                added: [
                    ...state.added,
                    action.product
                ]
            }
        case dispatchConstants.CART.FAVOURITE.DELETE:
            return {
                ...state,
                favorite: state.favorite.filter(e=>e.id !== action.product.id)
            }
        case dispatchConstants.CART.ADDED.DELETE:
            return {
                ...state,
                added:state.added.filter(e=>e.id !== action.product.id)
            }
        default:
            return state
    }
}