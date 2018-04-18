import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import Helmet from 'react-helmet'
// import '../../style/checkout.scss'

class Receipt extends React.Component {
  constructor(props) {
    super(props)
    this.subTotal = 0
    this.props.cart.map(item => {
      this.subTotal += parseInt(item.price)
    })
    this.state = { message: '' }
  }
  componentWillMount() {

  }

  render() {
    return (
      <div>
      <Helmet title='SESprout: Error' />
       <div className="page-header">
         <h1>Order: Error</h1>
       </div>
       <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-block">
              <div className='row'>
                <div className='col-sm-12'>
                  {this.props.errorMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    )
  }
}


function mapStateToProps(state) {
  return {
    errorMessage: state.cart.error,
    status: state.cart.payment_status,
    cart: state.cart.receipt.cart,
    promo_discount: state.cart.receipt.promo_discount,
    promo_code: state.cart.receipt.promo_code,
    totalCost: state.cart.receipt.totalCost
  }
}

export default connect(mapStateToProps, actions)(Receipt)