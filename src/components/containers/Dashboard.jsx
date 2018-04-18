import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Alert from '../AlertBox'
import * as actions from '../../actions'
import UserDetails from '../UserDetails.jsx'

import '../../style/dashboard.scss'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  renderAlert = () => {
    if(this.props.message) {
      return (
        <Alert type='info'>
          {this.props.message}
        </Alert>
      )
    }
  }

  componentWillMount() {
    this.props.fetchUserData()
  }

  componentWillReceiveProps() {
    console.log('we got props yo')
    console.log('this.props: ', this.props)
  }

  render() {
    return (
      <div>
        <div className='page-header'>
        <h1>Dashboard</h1>
        </div>
        {this.renderAlert}
      <div className='card'>
      <div className='card-block'>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#details">Details</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#purchases">Purchases</a>
          </li>
        </ul>
        </div>
      <div className="tab-content container">
        <UserDetails className='tab-pane active' id='details' role='tabpanel' data={this.props.userData}/>
        <div className="tab-pane" id="purchases" role="tabpanel">Purchases Tab</div>
      </div>
      </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { userData: state.user.info }
}

export default connect(null, actions)(Dashboard)