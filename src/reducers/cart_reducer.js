import {
  ADD_TO_CART, REMOVE_FROM_CART, UPDATE_PAYMENT_STATUS, WRITE_RECEIPT, UPDATE_PROMO_CODE, ACTIVATE_PROMO_CODE,
  SHOW_CHECKOUT_MESSAGE, CLEAR_CHECKOUT_MESSAGE, LOAD_CART, SET_ORDER_ERROR, UPDATE_PAYMENT_STATUS_MESSAGE, CLEAR_CART,
  INVALID_PROMO_CODE, CLEAR_PROMO_CODE, SET_CART
} from '../actions/types'

const initialState = {cart: [], message: '', message_type: '', paymentStatus: '', paymentStatusMessage: '', receipt: {
  cart: [],
  promo_code: '',
  promo_discount: '',
  totalCost: 0
}, promo_code: '',
promo_discount: 0, promo_id: false, promo_code_invalid: false, isLoading: false}
export default function(state = initialState, action) {
  switch(action.type) {
  case ADD_TO_CART:
    return {...state, cart: [...state.cart, ...action.payload]}
  case REMOVE_FROM_CART:
    let ind = state.cart.indexOf(action.payload)
    return {...state, cart: state.cart.filter((x, i) => i != ind)}
  case CLEAR_CART:
    return {...state, cart: []}
  case UPDATE_PAYMENT_STATUS:
    return {...state, paymentStatus: action.payload}
  case UPDATE_PAYMENT_STATUS_MESSAGE:
    return {...state, paymentStatusMessage: action.payload}
  case WRITE_RECEIPT:
    return {...state, receipt: action.payload}
  case UPDATE_PROMO_CODE:
    return {...state, promo_code: action.payload}
  case ACTIVATE_PROMO_CODE:
    return {...state, promo_code: action.payload.code, promo_discount: action.payload.discount, promo_id: action.payload.id, promo_code_invalid: false}
  case INVALID_PROMO_CODE:
    return {...state, promo_code_invalid: true}
  case CLEAR_PROMO_CODE:
    return {...state, promo_code: '', promo_id: false, promo_code_invalid: false, promo_discount: 0}
  case SHOW_CHECKOUT_MESSAGE:
    return {...state, message: action.payload.message, message_type: action.payload.type }
  case CLEAR_CHECKOUT_MESSAGE:
    return {...state, message: ''}
  case SET_ORDER_ERROR:
    return {...state, error: action.payload}
  case LOAD_CART:
    return {...state, cart: action.payload}
  case SET_CART:
    return {...state, cart: action.payload}
  default:
    return state
  }
}