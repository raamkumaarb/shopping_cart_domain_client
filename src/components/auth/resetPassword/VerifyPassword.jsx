import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { browserHistory } from 'react-router'
import LoadingIcon from '../../LoadingIcon'

class ResetPasswordVerify extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    const token = this.props.params.token
    this.props.verifyResetPassword(token)
  }

  render() {
    return <LoadingIcon />
  }
}


function mapStateToProps(state) {
  return { status: state.store.paymentStatus }
}

export default connect(null, actions)(ResetPasswordVerify)