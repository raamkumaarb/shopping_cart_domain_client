import {FETCH_PBN_DATA} from '../actions/types'

const initialState = {data: [], message: '', message_type: 'info', paymentStatus: '', isLoading: false}
export default function(state = initialState, action) {
  switch(action.type) {  
  case FETCH_PBN_DATA:
    return {...state, data: action.payload}  
  
  default:
    return state
  }
}