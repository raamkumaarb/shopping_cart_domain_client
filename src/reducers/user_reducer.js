import {
  FETCH_USER_DATA, FETCH_USER_ORDERS, FETCH_USER_CREDITS, SHOW_USER_MESSAGE_INFO, SHOW_USER_MESSAGE_ERROR, CLEAR_USER_MESSAGE,
  FETCH_USER_ITEMS
} from '../actions/types'

const initialState = {info: {}, orders: [], credits: [], items: [], message: '', message_type: 'info'}
export default function(state = initialState, action) {
  switch(action.type) {
  case FETCH_USER_DATA:
    return {...state, info: action.payload }
  case FETCH_USER_ORDERS:
    return {...state, orders: action.payload}
  case FETCH_USER_CREDITS:
    return {...state, credits: action.payload}  
  case FETCH_USER_ITEMS:
    return {...state, items: action.payload}
  case SHOW_USER_MESSAGE_INFO:
    return {...state, message: action.payload, message_type: 'info'}
    break
  case SHOW_USER_MESSAGE_ERROR:
    return {...state, message: action.payload, message_type: 'danger'}
    break
  case CLEAR_USER_MESSAGE:
    return {...state, message: ''}
  default:
    return state
  }
}