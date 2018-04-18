import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions'

export default class UserDetails extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.fetchUserData()
  }

  render() {
    return (
        <div {...this.props}  className='col-sm-6'>
          <form>
            <fieldset className="form-group">
              <label htmlFor="email-address">Email Address</label>
              <input type="email" className="form-control" id="email-address" value={this.props.email} placeholder="" readonly/>
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="first-name">BHW Username</label>
              <input type="text" className="form-control" id="first-name" placeholder="" value={this.props.bhwname} readonly/>
            </fieldset>
          </form>
        </div>
   )
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.info.email,
    bhwname: state.user.info.bhwname,
  }
}

connect(mapStateToProps, actions)(UserDetails)

