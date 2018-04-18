import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'

class Signout extends React.Component {

  componentWillMount() {
    this.props.signoutUser()
  }

  componentDidMount() {
    this.props.setNotie('Successfully signed out.', 'info')
    browserHistory.push('/')
  }

  render() {
    return( <div> </div> )
  }
}

export default connect(null, actions)(Signout)