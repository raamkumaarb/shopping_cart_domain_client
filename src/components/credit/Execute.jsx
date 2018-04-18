import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import LoadingIcon from '../LoadingIcon'
class Execute extends React.Component {
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
    this.props.executeCredit(this.props.location.query)
  }

  render() {
    return <div>Processing Payment... <LoadingIcon /></div>
  }
}


function mapStateToProps(state) {
  return { status: state.store.paymentStatus }
}

export default connect(null, actions)(Execute)