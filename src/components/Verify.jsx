import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { browserHistory } from 'react-router'

class Verify extends React.Component {
  componentWillMount() {
    const token = this.props.params.token
    this.props.verifyEmailAddress(token)
  }

  render() {
    return <div>Verifying email address...</div>
  }
}


function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(null, actions)(Verify)