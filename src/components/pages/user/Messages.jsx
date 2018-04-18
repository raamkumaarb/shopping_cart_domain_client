import React from 'react'
import {reduxForm} from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Alert from '../../AlertBox'
import * as actions from '../../../actions'
import Helmet from 'react-helmet'
import Wallet from './Wallet'

class Messages extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchUserData()
  }

  handleFormSubmit = (formProps) => {
    console.log('form submit: ', formProps)
    this.props.changePassword(formProps)
  }



  renderAlert = () => {
    if(this.props.message) {
      return (
        <Alert type={this.props.message_type} page='Messages'>
          {this.props.message}
        </Alert>
      )
    }
  }

  render() {

    return (
      <div>
        <Helmet title='SESprout: Messages' />
        <section className='card'>
          <div className='card-header'>
            Messages
          </div>
          <div className='card-block' id='user-details'>
            <div className='col-sm-6 col-xl-4'>
          <form>

          </form>
        </div>
        </div>
      </section>
    </div>
    )
  }
}



function mapStateToProps(state) {
  return {
    message: state.user.message,
    message_type: state.user.message_type,
    email: state.user.info.email,
    bhwname: state.user.info.bhwname
  }
}

export default connect(mapStateToProps, actions)(Messages)