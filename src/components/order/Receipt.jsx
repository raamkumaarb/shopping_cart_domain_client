import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory, Link } from 'react-router'
import Helmet from 'react-helmet'
// import '../../style/checkout.scss'

class Receipt extends React.Component {
  constructor(props) {
    super(props)
    this.subTotal = 0
    this.props.cart.map(item => {
      this.subTotal += parseInt(item.price)
    })
    this.state = { message: ''}
  }
  componentWillMount() {
  }

  renderMessage() {
    if(this.props.status === 'Processing')
      return (
        <div className='text-center processing-message'><b>This order requires manual processing.</b> <i>Reason: {this.props.status_message} </i></div>
      )
    else
      return (<div className='text-center processing-message'>You can view your newly purchased accounts on the <Link to='/user/purchases'>Purchased Items</Link> page.</div>)
  }
  isActive = () => {
    return 'discount-row ' + ((this.props.promo_discount > 0) ? 'show' : 'hide')
  }

  render() {
    return (
      <div>
      <Helmet title='SESprout: Receipt' />
       <div className="page-header">
         <h1>Order: {this.props.status}</h1>
       </div>
       <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              Receipt
            </div>
            <div className="card-block">
              <div className='row'>
                <div className='table-responsive'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>TF</th>
                        <th>CF</th>
                        <th>UR</th>
                        <th>RD</th>
                        <th>Main Category</th>
                        <th>Sub Category</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.props.cart.map((item, ind) => {
                      return (
                        <tr key={ind+1}>
                          <td className='light-gray'>{ind+1}</td>
                          <td>{item.domain_type=='tumblr'?'Tumblr':'Expired Domain'}</td>
                          <td>{item.tf}</td>
                          <td>{item.cf}</td>
                          <td>{item.ur}</td>
                          <td>{item.majestic_ref_domains}</td>
                          <td>{item.category}</td>
                          <td>{item.sub_category}</td>
                          <td>${item.price}</td>
                        </tr>
                      )
                    })}
                      <tr className="blank-row">
                        <td colSpan='9'></td>
                      </tr>
                      <tr className="subtotal-row">
                        <td colSpan='7' className="hidden-xs-down"></td>
                        <td className='pull-right'><b>Subtotal:</b></td>
                        <td>${this.subTotal}</td>
                        <td></td>
                      </tr>
                      <tr className={this.isActive()}>
                        <td colSpan='7' className="hidden-xs-down"></td>
                        <td className='pull-right'><b>Discount:</b></td>
                        <td>
                          <div className='discount-box'>
                            <i className="fa fa-minus" aria-hidden="true"></i>${this.props.promo_discount}
                          </div>
                        </td>
                        <td></td>
                      </tr>
                      <tr className='last-row'>
                        <td colSpan='7' className="hidden-xs-down"></td>
                        <td className='pull-right'><b>Total:</b></td>
                        <td>
                        ${this.props.totalCost}
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                  {this.renderMessage()}
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
    status: state.cart.paymentStatus,
    status_message: state.cart.paymentStatusMessage,
    cart: state.cart.receipt.cart,
    promo_discount: state.cart.receipt.promo_discount,
    promo_code: state.cart.receipt.promo_code,
    totalCost: state.cart.receipt.totalCost
  }
}

export default connect(mapStateToProps, actions)(Receipt)