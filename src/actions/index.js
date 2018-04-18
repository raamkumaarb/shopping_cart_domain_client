/*eslint no-console: [{ allow: ["warn", "error", "log"] }] */
import axios from 'axios'
import { browserHistory } from 'react-router'
import config from '../config.js'
import _ from 'lodash'
import {
  AUTH_ERROR, AUTH_USER, UNAUTH_USER, DISPLAY_HOME_MESSAGE,
  FETCH_STORE_DATA, FETCH_DOMAIN_DETAIL, FETCH_TUMBLR_DATA, FETCH_PBN_DATA, SIGNUP_MESSAGE, ADD_TO_CART,
  INITIATE_TABLE_DATA, UPDATE_TABLE_DATA, FETCH_USER_DATA, REMOVE_FROM_CART,
  STORE_ERROR, CLEAR_STORE_MESSAGE, UPDATE_PAYMENT_STATUS, WRITE_RECEIPT, FETCH_USER_ORDERS,
  FETCH_USER_CREDITS, CLEAR_HOME_MESSAGE, UPDATE_PROMO_CODE, ACTIVATE_PROMO_CODE, SHOW_STORE_MESSAGE, SET_LOADING_STATE,
  SHOW_USER_MESSAGE_INFO, SHOW_USER_MESSAGE_ERROR, CLEAR_USER_MESSAGE, CLEAR_AUTH_MESSAGE, SHOW_CHECKOUT_MESSAGE,
  CLEAR_CHECKOUT_MESSAGE, CLEAR_SIGNUP_MESSAGE, SHOW_SIGNUP_MESSAGE, DISPLAY_LOGIN_MESSAGE, CLEAR_LOGIN_MESSAGE,
  SET_ORDER_ERROR, FETCH_USER_ITEMS, CLEAR_CART, UPDATE_PAYMENT_STATUS_MESSAGE, SET_NOTIE, CLEAR_NOTIE, SET_SWEET_ALERT,
  CLEAR_SWEET_ALERT, INVALID_PROMO_CODE, CLEAR_PROMO_CODE, PASS_RESET_TOKEN, CLEAR_RESET_PASS_TOKEN, SET_CART, SET_JWT_TOKEN, CLEAR_JWT_TOKEN
} from './types'

const ROOT_URL = config.API_URL

export function signinUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signin`, {email, password})
    .then(response => {

      dispatch({type: AUTH_USER })
      dispatch({type: SET_JWT_TOKEN, payload: response.data.token})
      localStorage.setItem('token', response.data.token)
      browserHistory.push('/tumblr')
    })
    .catch((response) => {
      dispatch(setNotie(response.data.error, 'danger', 2))
    })
  }
}

export function signupUser({ bhwname, email, password, captcha }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {bhwname, email, password, captcha})
    .then(response => {
      browserHistory.push('/')
      dispatch(setNotie(response.data.message, 'success', 4))
    })
    .catch(response => {
      let err = response.data ? response.data.error : config.MESSAGEDATA.SERVER_ERROR
      dispatch(setNotie(err, 'danger', 2))
    })
  }
}

export function signoutUser() {
  return function(dispatch) {
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    dispatch({type: UNAUTH_USER})
    dispatch({type: CLEAR_JWT_TOKEN })
    dispatch({ type: CLEAR_CART })
  }
}

export function resetPassword({ email }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/resetpassword/initiate`, {email})
    .then(response => {
      console.log('we got back: ', response.data)
      browserHistory.push('/signin')
      let message = {}
      message.text = config.MESSAGEDATA.RESET_PASSWORD_INFO
      message.title = config.MESSAGEDATA.RESET_PASSWORD_TITLE
      message.type = 'success'
      message.confirmButtonClass = 'btn-info'
      message.confirmButtonText = 'Ok'
      dispatch(setSweetAlert(message))
  })
    .catch(response => {
      console.log('Error: ', response.data)
      dispatch(setNotie(config.MESSAGEDATA.SERVER_ERROR, 'danger', 2))
    })
  }
}

export function verifyResetPassword(token) {
  return function(dispatch) {
    console.log('token: ', token)
     axios(
      {
        url: `${ROOT_URL}/resetpassword/verify`,
        method: 'post',
        data: { token }
    })
    .then(response => {
      console.log('response: ', response)
      if(response.status === 200 && response.data.resetToken) {
        dispatch({ type: PASS_RESET_TOKEN, payload: response.data.resetToken })
        browserHistory.push('/resetpassword/submit')
      } else {
        throw new Error()
      }
      })
    .catch(response => {
      if(response) {
        msg = response.data.error ? response.data.error : ''
        let message = {}
        message.text = msg ? msg : config.MESSAGEDATA.COMMON_ERROR
        message.title = config.MESSAGEDATA.COMMON_TITLE
        message.type = 'error'
        message.confirmButtonClass = 'btn-danger'
        message.confirmButtonText = 'Ok'
        browserHistory.push('/')
        dispatch(setSweetAlert(message))
      }
    })
  }
}

export function submitNewPassword(password, passwordConfirm) {
  return function(dispatch, getState) {
    const token = getState().auth.pass_reset_token
    axios(
      {
        url: `${ROOT_URL}/resetpassword/submit`,
        method: 'post',
        data: { password, passwordConfirm, token }
    })
    .then(response => {
      console.log('we got: ', response)
      dispatch({
        type: CLEAR_RESET_PASS_TOKEN
      })
      browserHistory.push('/signin')
      let message = {}
      message.text = config.MESSAGEDATA.RESET_PASSWORD_SUCCESS
      message.title = config.MESSAGEDATA.RESET_PASSWORD_TITLE
      message.type = 'success'
      message.confirmButtonClass = 'btn-success'
      message.confirmButtonText = 'Ok'
      dispatch(setSweetAlert(message))
    })
    .catch(response =>  {
      dispatch({
        type: CLEAR_RESET_PASS_TOKEN
      })
      browserHistory.push('/')
      let message = {}
      message.text = config.MESSAGEDATA.RESET_PASSWORD_ERROR
      message.title = config.MESSAGEDATA.RESET_PASSWORD_TITLE
      message.type = 'error'
      message.confirmButtonClass = 'btn-danger'
      message.confirmButtonText = 'Ok'
      dispatch(setSweetAlert(message))
    })
  }
}

export function authSignupError(error) {
  console.log('error: ', error)
  return {
    type: SHOW_SIGNUP_MESSAGE,
    payload: { message: error, type: 'danger' }
  }
}

export function authLoginError(error) {
  console.log('error: ', error)
  return {
    type: DISPLAY_LOGIN_MESSAGE,
    payload: { message: error, type: 'danger' }
  }
}

export function setNotie(message, type, delay) {
  return function(dispatch) {
    dispatch({
      type: SET_NOTIE,
      payload: { message, type, delay }
    })
    setTimeout(dispatch({type: CLEAR_NOTIE}), 1000)
  }
}

export function setSweetAlert(message, delay) {
  return function(dispatch) {
    dispatch({
      type: SET_SWEET_ALERT,
      payload: { message }
    })
    console.log('calling sweet alert...: ', message)
    setTimeout(dispatch({type: CLEAR_SWEET_ALERT}), delay ? delay : 2000)
    window.onkeydown = null;
    window.onfocus = null;
  }
}

export function setInfoNotie(info) {
  return {
    type: SET_NOTIE,
    payload: { message: info, type: 'info' }
  }
}

export function setSuccessNotie(success) {
  return {
    type: SET_NOTIE,
    payload: { message: success, type: 'success' }
  }
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: DISPLAY_HOME_MESSAGE,
        payload: response.data.message
      })
      console.log(response)
    })
  }
}

export function fetchAuthMessage(path = '') {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/${path}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: DISPLAY_HOME_MESSAGE,
        payload: response.data.message
      })
    })
  }
}

export function fetchDomainData(domainType) {
  return function(dispatch) {
    dispatch(setLoading(true))
    var store_type=FETCH_STORE_DATA
    if(domainType=='tumblr'){
        store_type=FETCH_TUMBLR_DATA
    }
    if(domainType=='pbn'){
        store_type=FETCH_PBN_DATA
    }

    axios.get(`${ROOT_URL}/fetchDomain/${domainType}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      response.data.message.forEach(item => {
        console.log(item._id)
      })
      dispatch(setLoading(false))
      dispatch({
        type: store_type,
        payload: response.data.message
      })
    })
    .catch(response => {
      if(response.status === 401) {
       _signoutUser()
        browserHistory.push('/signin')
      }
    })
  }
}

export function verifyEmailAddress(token) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/verify/${token}`)
    .then(response => {
      browserHistory.push('/')
      let message = {}
      message.text = response.data.message
      message.title = config.MESSAGEDATA.EMAIL_VERIFIED_TITLE
      message.type = 'success'
      message.confirmButtonClass = 'btn-success'
      message.confirmButtonText = 'Ok'
      dispatch(setSweetAlert(message))
    })
  }
}

export function clearStoreMessage() {
  return {
    type: CLEAR_STORE_MESSAGE
  }
}

export function clearHomeMessage() {
  return {
    type: CLEAR_HOME_MESSAGE
  }
}

export function clearLoginMessage() {
  return {
    type: CLEAR_LOGIN_MESSAGE
  }
}

export function clearAuthMessage() {
  return {
    type: CLEAR_AUTH_MESSAGE
  }
}

export function clearSignupMessage() {
  return {
    type: CLEAR_SIGNUP_MESSAGE
  }
}

export function showCheckoutMessage(message, type) {
  return function(dispatch) {
    dispatch(setNotie('You need at least one item to checkout.', type, 2))
  }
}

export function showSignupMessage(message, type) {
  return {
    type: SHOW_SIGNUP_MESSAGE,
    payload: { message, type }
  }
}

export function clearCheckoutMessage() {
  return {
    type: CLEAR_CHECKOUT_MESSAGE
  }
}

export function clearCart() {
  return {
    type: CLEAR_CART,
  }
}

export function clearJwtToken() {
  return {
    type: CLEAR_JWT_TOKEN,
  }
}

export function addToCart(ids) {
  return function(dispatch) {
    dispatch({
      type: ADD_TO_CART,
      payload: ids
    })
    dispatch(setNotie(`Added ${ids.length} item(s) to cart`, 'info', 2))
  }
}

export function removeFromCart(id) {
  return {
    type: REMOVE_FROM_CART,
    payload: id
  }
}

export function displayStoreError(err) {
  return {
    type: STORE_ERROR,
    payload: err
  }
}
export function initiateTableData(data) {
  return {
    type: INITIATE_TABLE_DATA,
    payload: data
  }
}

export function updateTableData(data) {
  return {
    type: UPDATE_TABLE_DATA,
    payload: data
  }
}

export function fetchUserData() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch({
        type: FETCH_USER_DATA,
        payload: response.data
      })
    }).catch(response => {
      console.log('response.status: ', response.status)
      if(response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        dispatch({type: UNAUTH_USER})
        dispatch({ type: CLEAR_CART })
        browserHistory.push('/signin')
      }
    })
  }
}

export function getCartFromLocalStorage() {
  return function(dispatch) {
    let cart
    try {
      cart = localStorage.getItem('cart')
    } catch(e) {
      //intentional
    }
    if(cart) {
      dispatch({
        type: SET_CART,
        payload: cart
      })
    }
  }
}

export function processCredit(creditAmount) {
  return function(dispatch, getState) {
    console.log('creditAmount', creditAmount)
    dispatch(setLoading(true))
    axios(
      {
        url: `${ROOT_URL}/credit`,
        method: 'post',
        data: { creditAmount:  creditAmount},
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      //dispatch ORDER_STATUS: 'PROCESSING'
        dispatch({
          type: UPDATE_PAYMENT_STATUS,
          payload: 'processing'
        })
        window.location = response.data.redirect

    }).catch(response => {
       if(response.status === 401) {
          localStorage.removeItem('token')
          dispatch({type: UNAUTH_USER})
          browserHistory.push('/signin')
        } else {
          let msg = response.data.error
          let message = {}
          dispatch(setLoading(false))
          console.log('error: ', response)
          message.text = config.MESSAGEDATA.COMMON_ERROR
          message.title = config.MESSAGEDATA.COMMON_TITLE
          message.type = 'error'
          message.confirmButtonClass = 'btn-danger'
          message.confirmButtonText = 'Ok'
          dispatch(setSweetAlert(message))
        }
    })
  }
}


export function processOrder() {
  return function(dispatch, getState) {
    const state = getState()
    let cart = _syncLocalStorage(getState())
    dispatch(setLoading(true))
    axios(
      {
        url: `${ROOT_URL}/order`,
        method: 'post',
        data: { cart: state.cart.cart, promo_id: state.cart.promo_id },
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      //if the order was free
      if(response.data.status === 'Complete') {
        _handleReceipt(dispatch, response)
        try{
          localStorage.removeItem('cart')
        } catch(e) {
        //intentional
        }
        dispatch(setLoading(false))
        let message = {}
        message.text = config.MESSAGEDATA.ORDER_SUCCESS
        message.title = config.MESSAGEDATA.ORDER_SUCCESS_TITLE
        message.type = 'success'
        message.confirmButtonClass = 'btn-success'
        message.confirmButtonText = 'Ok'
        dispatch(setSweetAlert(message))
      }
      else {
          // sweet alert
        let message = {}
        message.text = config.MESSAGEDATA.ADD_CREDIT_INFO
        message.title = config.MESSAGEDATA.ORDER_FAILED_TITLE
        message.type = 'error'
        message.confirmButtonClass = 'btn-danger'
        message.confirmButtonText = 'Ok'
        browserHistory.push('/user/profile')
        dispatch(setSweetAlert(message))
      }

    }).catch(response => {
       if(response.status === 401) {
          localStorage.removeItem('token')
          localStorage.removeItem('cart')
          dispatch({type: UNAUTH_USER})
          dispatch({ type: CLEAR_CART })
          browserHistory.push('/signin')
        } else {
          let msg = response.data.error
          let message = {}
          dispatch(setLoading(false))
          console.log('error: ', response)
          fetchDomainData()
         // message.text = msg ? msg : 'There was an error processing your request. Try again or contact support.'
          message.text = config.MESSAGEDATA.COMMON_ERROR
          message.title = config.MESSAGEDATA.COMMON_TITLE
          message.type = 'error'
          message.confirmButtonClass = 'btn-danger'
          message.confirmButtonText = 'Ok'
          dispatch(setSweetAlert(message))
        }
    })
  }
}

export function executeCredit(data) {
  return function(dispatch) {
     axios(
      {
        url: `${ROOT_URL}/executeCredit`,
        method: 'post',
        data: { data },
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)
        _handleCreditReceipt(dispatch, response)
      })
    .catch(response => {
      console.log('receiptCatchResponse', response);
      if(response) {
        response.data.error = response.data.error ? response.data.error : ''
      switch(response.data.error) {
      case 'PaypalResponseError':
        dispatch({
          type: SET_ORDER_ERROR,
          payload: config.MESSAGEDATA.PAYPAL_RESPONSE_ERROR
        })
        console.log('error: ', response)
        browserHistory.push('/credit/error')
        break
      default:
        dispatch({
            type: SET_ORDER_ERROR,
            payload: config.MESSAGEDATA.DEFAULT_ORDER_ERROR
          })
        console.log('error: ', response)
        browserHistory.push('/credit/error')
      }
    }
  })
  }
}

export function executeOrder(data) {
  return function(dispatch) {
     axios(
      {
        url: `${ROOT_URL}/executeOrder`,
        method: 'post',
        data: { data },
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)
       try{
        localStorage.removeItem('cart')
      } catch(e) {
        //intentional
      }

      _handleReceipt(dispatch, response)
      })
    .catch(response => {
      if(response) {
        response.data.error = response.data.error ? response.data.error : ''
      switch(response.data.error) {
      case 'PaypalResponseError':
        dispatch({
          type: SET_ORDER_ERROR,
          payload: config.MESSAGEDATA.PAYPAL_RESPONSE_ERROR
        })
        console.log('error: ', response)
        browserHistory.push('/order/error')
        break
      case 'ExpiredOrderError':
        dispatch({
          type: SET_ORDER_ERROR,
          payload: config.MESSAGEDATA.EXPIRED_ORDER_ERROR
        })
        console.log('error: ', response)
        browserHistory.push('/order/error')
        break
      default:
        dispatch({
            type: SET_ORDER_ERROR,
            payload: config.MESSAGEDATA.DEFAULT_ORDER_ERROR
          })
        console.log('error: ', response)
        browserHistory.push('/order/error')
      }
    }
  })
  }
}

export function cancelCredit(credit) {
  return function(dispatch) {
     axios(
      {
        url: `${ROOT_URL}/credit/cancel`,
        method: 'post',
        data: { credit },
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)
      if(response.data.error) {
        dispatch({})
      }
      if(response.data.credit_status) {
        dispatch({
          type: UPDATE_PAYMENT_STATUS,
          payload: response.data.credit_status
        })
        dispatch({type: SHOW_STORE_MESSAGE, payload: { type: 'info', message: config.MESSAGEDATA.ORDER_CANCEL_INFO}})
        // sweet alert
        let message = {}
        message.text = config.MESSAGEDATA.PAYMENT_CANCEL_INFO
        message.title = config.MESSAGEDATA.COMMON_TITLE
        message.type = 'error'
        message.confirmButtonClass = 'btn-danger'
        message.confirmButtonText = 'Ok'
        browserHistory.push('/user/profile')
        dispatch(setSweetAlert(message))
      }
    })
  }
}

export function cancelOrder(order) {
  return function(dispatch) {
     axios(
      {
        url: `${ROOT_URL}/order/cancel`,
        method: 'post',
        data: { order },
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)
      if(response.data.error) {
        dispatch({})
      }
      if(response.data.order_status) {
        dispatch({
          type: UPDATE_PAYMENT_STATUS,
          payload: response.data.order_status
        })
        dispatch({type: SHOW_STORE_MESSAGE, payload: { type: 'info', message: config.MESSAGEDATA.ORDER_CANCEL_INFO}})
        browserHistory.push('/checkout')
      }
    })
  }
}

export function exportUserItems(domainType) {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user/export/${domainType}`, {
      headers: { authorization: localStorage.getItem('token')}
      // responseType: 'blob'
    })
    .then(({data}) => {
      console.log('error:L ', data.error)
      console.log('export user orders: ', data.filename)
      if(data.error) {
        dispatch({
          type: SHOW_USER_MESSAGE_ERROR,
          payload: data.error
        })
      } else {
        let filename = encodeURIComponent(data.filename)
        window.location = `${ROOT_URL}/download?filename=${filename}`
          dispatch({
            type: SHOW_USER_MESSAGE_INFO,
            payload: config.MESSAGEDATA.EXPORTED_DOMAINS_SUCCESS
          })
        }
      })
    .catch(({data}) => {
      if(response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        dispatch({type: UNAUTH_USER})
        dispatch({ type: CLEAR_CART })
        browserHistory.push('/signin')
      } else {
        console.log('error export users: ', data)
        dispatch({
          type: SHOW_USER_MESSAGE_ERROR,
          payload: data.error
        })
      }
    })
  }
}
export function fetchUserItems(domainType) {
  return function(dispatch) {
    dispatch(setLoading(true))
    axios.get(`${ROOT_URL}/user/items/${domainType}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)

      dispatch({
        type: FETCH_USER_ITEMS,
        payload: response.data.items
      })
      dispatch(setLoading(false))
    })
    .catch(response => {
      if(response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        dispatch({type: UNAUTH_USER})
        dispatch({ type: CLEAR_CART })
        browserHistory.push('/signin')
      }
      dispatch(setLoading(false))
    })
  }
}

export function fetchUserOrders() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user/orders`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)

      dispatch({
        type: FETCH_USER_ORDERS,
        payload: response.data.orders
      })
    })
    .catch(response => {
      if(response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        dispatch({type: UNAUTH_USER})
        dispatch({ type: CLEAR_CART })
        browserHistory.push('/signin')
      }
    })
  }
}

export function fetchUserCreditHistory() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/user/credits`, {
      headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)

      dispatch({
        type: FETCH_USER_CREDITS,
        payload: response.data.credits
      })
    })
    .catch(response => {
      if(response.status === 401) {
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        dispatch({type: UNAUTH_USER})
        dispatch({ type: CLEAR_CART })
        browserHistory.push('/signin')
      }
    })
  }
}

export function updatePromoCode(code) {
  return {
    type: UPDATE_PROMO_CODE,
    payload: code
  }
}
export function submitPromoCode(code) {
  return function(dispatch) {
    axios(
      {
        url: `${ROOT_URL}/promo/use`,
        method: 'post',
        data: { code },
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      console.log('response: ', response)
      if(response.data.error) {
        console.log('OOPOPS')
        dispatch({type: INVALID_PROMO_CODE})
      } else {
        dispatch({type:ACTIVATE_PROMO_CODE, payload: response.data })
      }
    })
    .catch(response => {
      dispatch(setNotie(config.MESSAGEDATA.SERVER_ERROR, 'danger', 3))
    })
  }
}

export function changePassword({ currentPassword, newPassword, passwordConfirm}) {
  return function(dispatch) {
    axios(
      {
        url: `${ROOT_URL}/user/changepassword`,
        method: 'post',
        data: { currentPassword, newPassword,  passwordConfirm},
        headers: { authorization: localStorage.getItem('token')}
    })
    .then(response => {
      dispatch(setNotie(response.data.message, 'success', 4))
    })
    .catch(response => {
      dispatch(setNotie(response.data.error, 'danger', 2))
    })
  }
}

export function setLoading(loadingState) {
  console.log('setting loading state: ', loadingState)
  return {
    type: SET_LOADING_STATE,
    payload: loadingState
  }
}

export function showUserMessage(message) {
  return {
    type: SHOW_USER_MESSAGE,
    payload: message
  }
}

export function clearUserMessage() {
  return {
    type: CLEAR_USER_MESSAGE
  }
}



//===============================================================//
//Private functions
//===============================================================//

function _handleReceipt(dispatch, response) {
  dispatch({
    type: UPDATE_PAYMENT_STATUS,
    payload: response.data.order_status
  })

  if(response.data.order_status_message) {
    dispatch({
      type: UPDATE_PAYMENT_STATUS_MESSAGE,
      payload: response.data.order_status_message
    })
  }

  dispatch({
    type: WRITE_RECEIPT,
    payload: {
      cart: response.data.cart,
      totalCost: response.data.totalCost,
      promo_discount: response.data.promo_discount,
      promo_code: response.data.promo_code
    }
  })

  // sweet alert
  let message = {}
  message.text = config.MESSAGEDATA.ORDER_SUCCESS
  message.title = config.MESSAGEDATA.ORDER_SUCCESS_TITLE
  message.type = 'success'
  message.confirmButtonClass = 'btn-success'
  message.confirmButtonText = 'Ok'

  dispatch({
    type: CLEAR_CART
  })
  dispatch({
    type: CLEAR_PROMO_CODE
  })

  browserHistory.push('/order/receipt')
  dispatch(setSweetAlert(message))
}

function _handleCreditReceipt(dispatch, response) {
  dispatch({
    type: UPDATE_PAYMENT_STATUS,
    payload: response.data.credit_status
  })
  if(response.data.credit_status_message) {
    dispatch({
      type: UPDATE_PAYMENT_STATUS_MESSAGE,
      payload: response.data.credit_status_message
    })
  }
  dispatch({
    type: WRITE_RECEIPT,
    payload: {
      cart: response.data.cart,
      totalCost: response.data.totalCost
    }
  })
  // sweet alert
  let message = {}
  message.text = config.MESSAGEDATA.ORDER_SUCCESS
  message.title = config.MESSAGEDATA.ORDER_SUCCESS_TITLE
  message.type = 'success'
  message.confirmButtonClass = 'btn-success'
  message.confirmButtonText = 'Ok'

  browserHistory.push('/credit/receipt')
  dispatch(setSweetAlert(message))
}

function _syncLocalStorage(state) {
  return function(dispatch) {
    dispatch({
      type: CLEAR_CART,
    })
    dispatch({
      type: ADD_TO_CART,
      payload: state.cart.cart
    })
  }

}

function _signoutUser() {
  return function(dispatch) {
    console.log('ok...')
    localStorage.removeItem('token')
    localStorage.removeItem('cart')
    dispatch({type: UNAUTH_USER})
    dispatch({ type: CLEAR_CART })
    browserHistory.push('/signin')
  }
}