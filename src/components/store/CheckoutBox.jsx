import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'

class CheckoutBox extends React.Component {

  constructor(props) {
    super(props)
  }
  handleCheckoutClick = () => {
    console.log('whyyy')
    browserHistory.push('/checkout')
  }

  render() {
    return (
      <div className="checkoutBox">
        <div className="card">
          <div className="card-header">
            Checkout
          </div>
          <div className="card-block">
            <button className='checkout-btn btn btn-primary' onClick={this.handleCheckoutClick}>Checkout</button>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.store.message }
}

export default connect(mapStateToProps, actions)(CheckoutBox)