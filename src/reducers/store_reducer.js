import {
  FETCH_STORE_DATA, FETCH_DOMAIN_DETAIL, RECEIVE_STORE_DATA, INITIATE_TABLE_DATA, UPDATE_TABLE_DATA,
   STORE_ERROR, CLEAR_STORE_MESSAGE, SHOW_STORE_MESSAGE
} from '../actions/types'

const initialState = {data: [], message: '', message_type: 'info', paymentStatus: '', isLoading: false}
export default function(state = initialState, action) {
  switch(action.type) {
  case FETCH_STORE_DATA:
    return {...state, data: action.payload}
  case RECEIVE_STORE_DATA:
    return {...state, isLoading: false }
  case INITIATE_TABLE_DATA:
    return {...state, data: action.payload}
  case UPDATE_TABLE_DATA:
    return {...state, data: action.payload}
  case STORE_ERROR:
    return {...state, message: action.payload, message_type: 'danger'}
  case CLEAR_STORE_MESSAGE:
    return {...state, message: ''}
  case SHOW_STORE_MESSAGE:
    return {...state, message: action.payload.message, message_type: action.payload.type}
  case FETCH_DOMAIN_DETAIL:
    return {...state, data: action.payload}
  default:
    return state
  }
}