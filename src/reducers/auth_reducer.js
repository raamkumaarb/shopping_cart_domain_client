import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  SET_JWT_TOKEN,
  CLEAR_JWT_TOKEN,
  FETCH_MESSAGE,
  SIGNUP_MESSAGE,
  SHOW_SIGNUP_MESSAGE,
  CLEAR_HOME_MESSAGE,
  DISPLAY_LOGIN_MESSAGE,
  CLEAR_LOGIN_MESSAGE,
  CLEAR_AUTH_MESSAGE,
  CLEAR_SIGNUP_MESSAGE,
  DISPLAY_HOME_MESSAGE,
  PASS_RESET_TOKEN,
  CLEAR_RESET_PASS_TOKEN
} from '../actions/types'

const initialState = { token: '', error: '', message: '', message_type: 'info', signup_message: '', signup_message_type: '',
login_message: '', login_message_type: '', authenticated: false, pass_reset_token: '' }
export default function(state = initialState, action) {
  switch(action.type) {
  case AUTH_USER:
    return { ...state, error: '', message: '', authenticated: true }
  case UNAUTH_USER:
    return { ...state, authenticated: false, message: 'You signed out.' }
  case AUTH_ERROR:
    return { ...state, error: action.payload }
  case FETCH_MESSAGE:
    return { ...state, error: '',message: action.payload }
  case CLEAR_HOME_MESSAGE:
    return { ...state, message: '' }
  case DISPLAY_HOME_MESSAGE:
    return { ...state, error: '', message: action.payload }
  case CLEAR_LOGIN_MESSAGE:
    return { ...state, login_message: '' }
  case DISPLAY_LOGIN_MESSAGE:
    return { ...state, error: '', login_message: action.payload.message, login_message_type: action.payload.type }
  case SIGNUP_MESSAGE:
    return { ...state, message: action.payload.message, type: action.payload.type, error: '' }
  case SHOW_SIGNUP_MESSAGE:
    return { ...state, signup_message: action.payload.message, signup_message_type: action.payload.type }
  case CLEAR_SIGNUP_MESSAGE:
    return {...state, signup_message: '' }
  case CLEAR_AUTH_MESSAGE:
    return {...state, message: '', error: ''}
  case PASS_RESET_TOKEN:
    return { ...state, pass_reset_token: action.payload }
  case CLEAR_RESET_PASS_TOKEN:
    return {...state, pass_reset_token: ''}
  case SET_JWT_TOKEN:
    return {...state, token: action.payload}
  case CLEAR_JWT_TOKEN:
    return {...state, token: ''}  
  }
  return state
}