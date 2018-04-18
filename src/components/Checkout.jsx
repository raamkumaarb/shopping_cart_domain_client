import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Alert from './AlertBox'
import domainSelector from '../selectors/checkout_store_items'
import LoadingIcon from './LoadingIcon'
import Helmet from 'react-helmet'
import { notie } from '../utils'
import swal from 'sweetalert'
import config from '../config.js'
// import '../style/checkout.scss'

class Checkout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { message: '',
                   isTosChecked: false
                 }
  }
  componentWillMount() {
      console.log('fetching store data')
      this.props.fetchDomainData('all')
  }

  componentDidMount() {
    // Check if there is a cart in local storage
    if(this.props.cart.length < 1) {
      // this.props.getCartFromLocalStorage()
      this.calculateCost()
    }
  }

  updatePrice = (price) => {
    console.log('updating subtotal: ', this.subTotal)
    this.subTotal -= price
    this.calculateCost()
  }

  componentDidUpdate() {
    if(this.props.message) {
      notie(this.props.type, this.props.message, this.props.delay)
    }
  }

  calculateCost = () => {
      this.subTotal = 0
      this.props.cart.map(item => {
        this.subTotal += parseInt(item.price)
      })
    let subtotal = this.subTotal
    console.log('subtotal: ', subtotal)
    let discount = this.props.promo_discount
    console.log('discount: ', discount)
    let total = subtotal - discount
    console.log('total: ', total)
    return { subtotal, total: (total >= 0) ? total : 0}
  }

  handlePaypalPurchase = () => {
    if(this.props.cart.length > 0) {
      this.props.processOrder()
    } else if(!this.tosIsChecked) {
      notie('info', config.MESSAGEDATA.AGREE_INFO, 2)
    } else {
      notie('info', config.MESSAGEDATA.ORDER_CANCEL_INFO, 2)
    }
  }

  handleCheckoutClick = () => {
    if(this.props.cart.length > 0) {
      this.showCheckoutMessage()
    } else {
      notie('info', config.MESSAGEDATA.ORDER_CANCEL_INFO, 2)
    }
  }

  showCheckoutMessage = () => {
    let message = {}
    message.html = true
    message.text = config.MESSAGEDATA.TERMS_AND_CONDITIONS
    message.title = config.MESSAGEDATA.TERMS_AND_CONDITIONS_TITLE
    message.confirmButtonClass = 'success'
    message.confirmButtonText = 'Checkout'
    message.showCancelButton = true
    message.cancelButtonText = "Cancel"
    message.closeOnConfirm = false
    message.closeOnCancel = true
    message.showLoaderOnConfirm = true
    message.customClass = "sweet-alert-checkout-terms"
    swal(message, (isConfirm) => {
      if(isConfirm) {
        swal("Redirecting", config.MESSAGEDATA.PAYPAL_REDIRECT_INFO, "success")
        this.props.processOrder()
      }
    })
  }

  handleDeleteItem = (event) => {
    event.preventDefault()
    let id = event.target.getAttribute('data-id')
    let cost = event.target.getAttribute('data-cost')
    this.props.removeFromCart(id)
    this.calculateCost()
  }

  updatePromoCode = (e) => {
    this.props.updatePromoCode(e.target.value)
  }
  submitPromoCode = (e) => {
    e.preventDefault()
    this.props.submitPromoCode(this.props.promo_code, this.props.promo_id)
    return false
  }

  handleCheckbox = (e) => {
    event.preventDefault()
     this.setState({
      tosIsChecked: !this.state.tosIsChecked // flip boolean value
    })
  }

  isPromoCodeValid = () => {
    return this.props.promo_id
  }

  renderPromoCode = () => {
    if(this.props.promo_id)
      return (
        <div className="form-group has-success">
          <div className="input-group">
            <input type="text" className="form-control form-control-success" placeholder='Promo Code'
            onChange={this.updatePromoCode} value={this.props.promo_code} disabled={this.props.promo_id}/>
            <div className="input-group-btn">
              <button type="button" className="btn btn-success" onClick={this.submitPromoCode} disabled={this.props.promo_id}>
                Submit
              </button>
            </div>
          </div>
          <label className="form-label row" htmlFor="inputSuccess1">Promo code applied!</label>
        </div>
      )
    else if(this.props.promo_invalid && !this.props.promo_id)
      return (
        <div className="form-group has-danger">
          <div className="input-group">
            <input type="text" className="form-control form-control-danger" placeholder='Promo Code'
            onChange={this.updatePromoCode} value={this.props.promo_code} disabled={this.props.promo_id}/>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default" onClick={this.submitPromoCode} disabled={this.props.promo_id}>
                Submit
              </button>
            </div>
          </div>
          <label className="form-label failed-promo-label row" htmlFor="">Invalid promo code!</label>
        </div>
      )
    else
      return (
        <div className="form-group">
          <div className="input-group">
            <input type="text" className="form-control" placeholder='Promo Code'
            onChange={this.updatePromoCode} value={this.props.promo_code} disabled={this.props.promo_id}/>
            <div className="input-group-btn">
              <button type="button" className="btn btn-default" onClick={this.submitPromoCode} disabled={this.props.promo_id}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )
  }

  isActive = () => {
    console.log('activated: ', this.props.promo_id)
    return 'discount-row ' + ((this.props.promo_id) ? 'show' : 'hide')
  }

  render() {
    return (
      <div>
      <Helmet title='SESprout: Checkout' />
       {this.props.isLoading ? <LoadingIcon /> :
       <div className="row checkout-page">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              Checkout
            </div>
            <div className="card-block">
              <div className='row'>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>PA</th>
                        <th>DA</th>
                        <th>TF</th>
                        <th>CF</th>
                        <th>UR</th>
                        <th>RD</th>
                        <th>Main Category</th>
                        <th className="hidden-md-down">Sub Category</th>
                        <th>Price</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.props.cart.map((item, ind) => {
                      return (
                        <tr key={item._id}>
                          <td className='light-gray'>{ind+1}</td>
                          <td>{item.pa}</td>
                          <td>{item.da}</td>
                          <td>{item.tf}</td>
                          <td>{item.cf}</td>
                          <td>{item.ur}</td>
                          <td>{item.majestic_ref_domains}</td>
                          <td>{item.category}</td>
                          <td className="hidden-md-down">{item.sub_category}</td>
                          <td>${item.price}</td>
                          <td><i className="fa fa-times" aria-hidden="true" data-id={item._id} data-cost={item.price} onClick={this.handleDeleteItem}></i></td>
                        </tr>
                      )
                    })}

                      <tr className="blank-row">
                        <td colSpan='11'></td>
                      </tr>
                      <tr className="subtotal-row">
                        <td colSpan='8' className="hidden-xs-down"></td>
                        <td className='pull-right'><b>Subtotal:</b></td>
                        <td>${this.calculateCost().subtotal}</td>
                        <td></td>
                      </tr>
                      <tr className={this.isActive()}>
                        <td colSpan='8' className="hidden-xs-down"></td>
                        <td className='pull-right'><b>Discount:</b></td>
                        <td>
                          <div className='discount-box'>
                            <i className="fa fa-minus" aria-hidden="true"></i>${this.props.promo_discount}
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr className='last-row'>
                        <td colSpan='8' className="hidden-xs-down"></td>
                        <td className='pull-right'><b>Total:</b></td>
                        <td>
                        ${this.calculateCost().total}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card-block">
              </div>
              <form onSubmit={this.submitPromoCode} className="form-inline">
              <div className='row'>
                  <div className='col-sm-4'>
                    <div className="form-group">
                      <div className="input-group">
                        {this.renderPromoCode()}
                      </div>
                    </div>
                  </div>
                </div>
                  <div className='row'>
                    <div className='col-sm-4 col-sm-offset-4 text-center'>
                      {/*<img src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif" id='pp-buy-button' onClick={this.handleCheckoutClick}/>*/}
                      <button type="button" className="btn btn-primary" onClick={this.handleCheckoutClick}>Checkout</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
    )
  }
}

const checkoutForm = (props) => {

}


function mapStateToProps(state) {
  return {
    cart: domainSelector(state),
    store: state.store.data,
    message: state.app.notie,
    type: state.app.notie_type,
    delay: state.app.notie_delay,
    promo_code: state.cart.promo_code,
    promo_discount: state.cart.promo_discount,
    promo_id: state.cart.promo_id,
    promo_invalid: state.cart.promo_code_invalid,
    isLoading: state.app.loading
     }
}

export default connect(mapStateToProps, actions)(Checkout)