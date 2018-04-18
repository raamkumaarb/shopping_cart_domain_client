import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'

class Cancel extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    /*
    order_id: '1111',
    paymentId: 'PAY-xxxxx',
    token: 'EC-xxxx',
    PayerID: 'UUxxxx'
     */
    this.props.cancelOrder(this.props.location.query)
  }

  render() {
    console.log('params: ', this.props.location.query)
    return <div>Canceling Payment...</div>
  }
}


function mapStateToProps(state) {
  return { status: state.store.paymentStatus }
}

export default connect(null, actions)(Cancel)