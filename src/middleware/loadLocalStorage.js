import { AUTH_USER, LOAD_CART, INIT, ADD_TO_CART, REMOVE_FROM_CART } from '../actions/types'
import cartSelector from '../selectors/checkout_store_items'
export const loadFromStorage = store => next => action => {
  if (action.type === INIT) {
    try {
      const token = localStorage.getItem('token')
      if(token) {
        store.dispatch({ type: AUTH_USER })
      }
    } catch(e) {
      //intentional
    }
    try {
      let storedCart = localStorage.getItem('cart')
      if(storedCart) {
        storedCart = storedCart.split(',')
        store.dispatch({
          type: LOAD_CART,
          payload: storedCart
        })
      }
    } catch (e) {
      //intentional
    }
  }
  next(action)
}

export const saveToStorage = (store) => next => action => {
  console.log('action.type: ', action)
  switch(action.type) {
  case REMOVE_FROM_CART:
    console.log('remove_from_cart called')
  case ADD_TO_CART:
    let cart = []
    next(action)
    cart = cartSelector(store.getState())
    cart = cart.map(item => item._id)
    console.log('Setting cart to: ', cart)
    try {
      localStorage.setItem('cart', cart)
    } catch(e) {
      //continue on exception
      console.log('e: ', e)
    }
    break
  default:
    next(action)
  }
}