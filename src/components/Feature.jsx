import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Feature extends React.Component {
  componentWillMount() {
    this.props.fetchAuthMessage()
  }

  render() {
    return (
      <div>{this.props.message}</div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(null, actions)(Feature)