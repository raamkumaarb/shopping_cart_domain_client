import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Alert from '../AlertBox'
import * as actions from '../../actions'
import UserDetails from './UserDetails.jsx'
import UserItems from './UserItems.jsx'
import UserOrders from './Orders.jsx'
import Helmet from 'react-helmet'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
  }

  renderAlert = () => {
    if(this.props.message) {
      return (
        <Alert type={this.props.message_type} page='UserProfile'>
          {this.props.message}
        </Alert>
      )
    }
  }

  componentWillMount() {
    // this.props.fetchUserData()
    console.log('mountin')
  }

  render() {
    return (
      <div>
        <Helmet title='SESprout: My Profile' />
          {this.renderAlert()}
        <section className='card'>
          <div className='card-header'>
            My Profile
          </div>
          <div className='card-block' id='user-details'>
            <UserDetails />
        </div>
      </section>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.user.message,
    message_type: state.user.message_type
  }
}

export default connect(mapStateToProps, actions)(UserProfile)