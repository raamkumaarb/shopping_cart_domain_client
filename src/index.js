import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import reduxThunk from 'redux-thunk'

import './static/js/lib/jquery/jquery.min'
import './static/js/lib/moment/moment.min.js'
import './static/js/lib/responsive-bootstrap-toolkit/bootstrap-toolkit.min.js'
import './static/js/lib/match-height/jquery.matchHeight.min.js'
import './static/js/lib/eonasdan-bootstrap-datetimepicker/bootstrap-datetimepicker.min.js'
import './static/js/lib/jScrollPane/jquery.mousewheel.js'
import './static/js/lib/jScrollPane/jquery.jscrollpane.min.js'
import './static/js/lib/html5-form-validation/jquery.validation.min.js'
import './static/js/lib/peity/jquery.peity.min.js'
import './static/js/lib/autosize/autosize.min.js'
import './static/js/lib/fancybox/jquery.fancybox.pack.js'
import './static/js/lib/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js'

import './static/js/vendor/jquery.clickout.js'
import './static/js/vendor/jquery-asPieProgress.min.js'

import './static/js/app/app.js'
import './static/scss/main.scss'
import App from './components/App'
import Signin from './components/auth/Signin'
import Signout from './components/auth/Signout'
import Signup from './components/auth/Signup'
import ResetPassword from './components/auth/resetPassword/ResetPassword'
import VerifyPassword from './components/auth/resetPassword/VerifyPassword'
import SubmitNewPassword from './components/auth/resetPassword/SubmitPassword'
import Feature from './components/Feature'
import Store from './components/store/Store'
import Checkout from './components/Checkout'
import RequireAuth from './components/auth/RequireAuth'
import Home from './components/Home'
import LandingPage from './components/landingPage/LandingPage'
import Profile from './components/pages/user/Profile'
import Credits from './components/pages/user/Credits'
import Messages from './components/pages/user/Messages'
import Orders from './components/pages/user/Orders'
import Purchases from './components/pages/user/Purchases'
import FAQPage from './components/FAQ'
import PrivacyPolicy from './components/pages/PrivacyPolicy'
import Order from './components/order/Order'
import OrderExecute from './components/order/Execute'
import OrderReceipt from './components/order/Receipt'
import OrderCancel from './components/order/Cancel'
import OrderError from './components/order/Error'
import Credit from './components/credit/Credit'
import CreditExecute from './components/credit/Execute'
import CreditReceipt from './components/credit/Receipt'
import CreditCancel from './components/credit/Cancel'
import CreditError from './components/credit/Error'
import Verify from './components/Verify'
import reducers from './reducers'
import {loadFromStorage, saveToStorage} from './middleware/loadLocalStorage'
import { AUTH_USER, INIT } from './actions/types'
const initialState = {}
let store

if(process.env.NODE_ENV != 'production') {
  store = createStore(reducers, initialState, compose(applyMiddleware(saveToStorage), applyMiddleware(reduxThunk), applyMiddleware(loadFromStorage), autoRehydrate(),
   window.devToolsExtension ? window.devToolsExtension() : f => f))
} else {
  store = createStore(reducers, initialState, compose(applyMiddleware(saveToStorage), applyMiddleware(reduxThunk), applyMiddleware(loadFromStorage), autoRehydrate()))
}

persistStore(store)
store.dispatch({ type: INIT })


const app = document.createElement('div')
document.body.appendChild(app)

ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={LandingPage} />
      <Route path='signin' component={Signin} />
      <Route path='signout' component={Signout} />
      <Route path='signup' component={Signup} />
      <Route path='resetpassword'>
        <Route path='form' component={ResetPassword} />
        <Route path='verify/:token' component={VerifyPassword} />
        <Route path='submit' component={SubmitNewPassword} />
      </Route>
      <Route path='checkout' component={Checkout} />
      <Route path='feature' component={RequireAuth(Feature)} />
      <Route path='tumblr' component={RequireAuth(Store)} />
      <Route path='pbn' component={RequireAuth(Store)} />
      <Route path='faq' component={FAQPage} />
      <Route path='privacy' component={PrivacyPolicy} />
      <Route path='user'>
        <Route path='profile' component={RequireAuth(Profile)} />
        <Route path='orders' component={RequireAuth(Orders)} />
        <Route path='purchases' component={RequireAuth(Purchases)} />
        <Route path='credits' component={RequireAuth(Credits)} />
        <Route path='messages' component={RequireAuth(Messages)} />
      </Route>
      <Route path='profile' component={RequireAuth(Profile)} />
      <Route path='order' component={RequireAuth(Order)}>
        <Route path='execute' component={RequireAuth(OrderExecute)} />
        <Route path='receipt' component={RequireAuth(OrderReceipt)} />
        <Route path='cancel' component={RequireAuth(OrderCancel)} />
        <Route path='error' component={RequireAuth(OrderError)} />
      </Route>
      <Route path='credit' component={RequireAuth(Credit)}>
        <Route path='execute' component={RequireAuth(CreditExecute)} />
        <Route path='receipt' component={RequireAuth(CreditReceipt)} />
        <Route path='cancel' component={RequireAuth(CreditCancel)} />
        <Route path='error' component={RequireAuth(CreditError)} />
      </Route>
      <Route path="/verify/:token" component={Verify}/>
    </Route>
    </Router>
  </Provider>
  , app)
