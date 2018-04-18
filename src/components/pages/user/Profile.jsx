import React from 'react'
import {reduxForm} from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Alert from '../../AlertBox'
import * as actions from '../../../actions'
import Helmet from 'react-helmet'
import Wallet from './Wallet'

class UserProfile extends React.Component {
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
        <Alert type={this.props.message_type} page='UserProfile'>
          {this.props.message}
        </Alert>
      )
    }
  }

  render() {
    const {handleSubmit, fields: { currentPassword, newPassword, passwordConfirm }} = this.props
    return (
      <div>
        <Helmet title='SESprout: My Profile' />          
        <section className='card'>
          <div className='card-header'>
            My Profile
          </div>
          <div className='card-block' id='user-details'>
            <div className='col-sm-6 col-xl-4'>
          <form>
            <fieldset className="form-group row">
              <label className='col-sm-4 form-control-label' htmlFor="email-address">Email Address</label>
              <div className='col-sm-8'>
                <p className='form-control-static'>
                  <input type="email" className="form-control" id="email-address" value={this.props.email || ''} placeholder="" readOnly={true}/>
                </p>
              </div>
            </fieldset>
            <fieldset className="form-group row">
              <label className='col-sm-4 form-control-label' htmlFor="first-name">Forum Username</label>
              <div className='col-sm-8'>
                <p className='form-control-static'>
                  <input type="email" className="form-control" id="bhw-name" value={this.props.bhwname || ''} placeholder="" readOnly={true}/>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
        </div>
      </section>
      <Helmet title='SESprout: My Wallet' />
      <Wallet amount={this.props.amount}/>
      <Helmet title='SESprout: Change Password' />
        <section className='card'>
          <div className='card-header'>
            Change Password
          </div>
          <div className='card-block' id='user-details'>
            <div className='col-sm-6 col-xl-4'>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <fieldset className="form-group row">
              
              <div className={(currentPassword.touched && currentPassword.error) ? 'form-group form-group-error' : 'form-group'}>
                  <input type="password" {...currentPassword} className="form-control" placeholder="Current Password" required/>
                  {currentPassword.touched && currentPassword.error &&<small className="text-muted">{currentPassword.error}</small>}
              </div>
              <div className={(newPassword.touched && newPassword.error) ? 'form-group form-group-error' : 'form-group'}>
                  <input type="password" {...newPassword} className="form-control" placeholder="New Password" required/>
                  {newPassword.touched && newPassword.error &&<small className="text-muted">{newPassword.error}</small>}
              </div>
              <div className={(passwordConfirm.touched && passwordConfirm.error) ? 'form-group form-group-error' : 'form-group'}>
                  <input type="password" {...passwordConfirm} className="form-control" placeholder="Confirm New password" required/>
                  {passwordConfirm.touched && passwordConfirm.error &&<small className="text-muted">{passwordConfirm.error}</small>}
              </div>
            </fieldset>
            <fieldset className="form-group row">
              <button type="submit" className="btn btn-rounded">Submit</button>
            </fieldset>
          </form>
        </div>
        </div>
      </section>
    </div>
    )
  }
}

function validate(formProps) {
  const errors = {}
  let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})")
  
  if(!passwordRegex.test(formProps.newPassword))
    errors.newPassword = 'Password must contain 8 characters and 1 numeric character.'

  if(!formProps.currentPassword) {
    errors.currentPassword = 'Please enter your current password'
  }

  if(!formProps.newPassword) {
    errors.newPassword = 'Please enter your new password'
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if(formProps.newPassword !== formProps.passwordConfirm) {
    errors.newPassword = 'Passwords must match'
  }
  return errors
}

function mapStateToProps(state) {
  return {
    message: state.user.message,
    message_type: state.user.message_type,
    email: state.user.info.email,
    bhwname: state.user.info.bhwname,
    amount: state.user.info.amount
  }
}

export default reduxForm({
  form: 'myprofile',
  fields: ['currentPassword','newPassword', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)
  (UserProfile)