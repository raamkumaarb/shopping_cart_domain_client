import { combineReducers } from 'redux'
import { reducer as form} from 'redux-form'
import authReducer from './auth_reducer'
import storeReducer from './store_reducer'
import userReducer from './user_reducer'
import cartReducer from './cart_reducer'
import appReducer from './app_reducer'
import tumblrReducer from './tumblr_reducer'
import pbnReducer from './pbn_reducer'

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  store: storeReducer,
  tumblr: tumblrReducer,
  pbn: pbnReducer,
  user: userReducer,
  cart: cartReducer,
  app: appReducer
})

export default rootReducer

/**
 * state: {
 *   auth: {
 *     error: 'error message',
 *     message: 'message',
 *     authenticated: true,
 *   },
 *   store: {
 *     data: [{
 *       
 *     }],
 *     numberAvailable: 4
 *   },
 *   cart: []
 *   isFetching: false
 * },
 *   user: {
 *     info: {}
 *   }
 */