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
      return (<div className='text-center processing-message'><b>Payment Successful.</b> <Link to='/tumblr'>Click here</Link> to start purchase domains.</div>)
  }
  

  render() {
    return (
      <div>
      <Helmet title='SESprout: Receipt' />
       <div className="page-header">
         <h1>Deposit: {this.props.status}</h1>
       </div>
       <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              Receipt
            </div>
            <div className="card-block">
              <div className='row'>
                <div className='col-sm-12'>
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
    totalCost: state.cart.receipt.totalCost
  }
}

export default connect(mapStateToProps, actions)(Receipt)