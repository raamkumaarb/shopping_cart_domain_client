import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
// import '../style/alertBox.scss'
/**
 * props : {
 *   type = 'danger'
 * }
 **/

 class AlertBox extends React.Component {

  constructor(props) {
    super(props)
    console.log('props: ', props)
  }

  clearMessage = (event) => {
    event.preventDefault()
    switch(this.props.page) {
    case 'store':
      this.props.clearStoreMessage()
      break
    case 'checkout':
      this.props.clearCheckoutMessage()
      break
    case 'home':
      this.props.clearHomeMessage()
      break
    case 'dashboard':
      this.props.clearUserMessage()
      break
    case 'signin':
      this.props.clearLoginMessage()
      break
    case 'signup':
      this.props.clearSignupMessage()
      break
    default:
    }
  }

  render() {
    let classString = `alert alert-${this.props.type}`
  return (
    <div className={classString} {...this.props}>
      <button type="button" className="close" onClick={this.clearMessage}>
        <span aria-hidden="true">&times;</span>
      </button>
        {this.props.children}
    </div>
    )
  }
}

export default connect(null, actions)(AlertBox)