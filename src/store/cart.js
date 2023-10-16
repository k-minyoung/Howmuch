import { createStore } from "redux";
import { combineReducers } from "redux";


export const ADD_CART = "ADD_CART"
export const DELETE_CART = "DELETE_CART"

export const BUY_LAND = "BUY_LAND"
const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_CART:
            return [...state, action.product]
        case DELETE_CART:
            return state.filter(elem => elem.productId !== action.productId)
        default:
            return state;
    }
}
const landReducer = (state = [], action) => {
    switch (action.type) {
        case BUY_LAND:
            return [...state, action.house]
        default:
            return state;
    }
}

const reducers = combineReducers({
    cart: cartReducer,
    land: landReducer
})


const store = createStore(reducers)

export default store





