import {
  SET_LOADING_STATE,
  INIT,
  SET_NOTIE,
  CLEAR_NOTIE,
  SET_SWEET_ALERT, CLEAR_SWEET_ALERT
} from '../actions/types'
import { REHYDRATE } from 'redux-persist/constants'

const initialState = {loading: false, notie: '', notie_type: 'info', notie_delay: 3, sweet_alert: { title: '', text: '', type: '' }}
export default function(state = initialState, action) {
  switch(action.type) {
  case SET_LOADING_STATE:
    return {...state, loading: action.payload }
  case SET_NOTIE:
    return {...state, notie: action.payload.message, notie_type: action.payload.type, notie_delay: action.payload.delay }
  case CLEAR_NOTIE:
    return {...state, notie: '', notie_delay: 2}
  case SET_SWEET_ALERT:
    return {...state, sweet_alert: action.payload.message }
  case CLEAR_SWEET_ALERT:
    return {...state, notie: '', sweet_alert: { title: '', text: '', type: '' }}
  case INIT:
    return {...state}
  default:
    return state
  }
}