import React from 'react'
import {reduxForm} from 'redux-form'
import * as actions from '../../actions'
import Alert from '../AlertBox'
import Helmet from 'react-helmet'
import Recaptcha from 'react-recaptcha'

class Signup extends React.Component {

  constructor(props) {
    super(props)
    this.cResponse = ''
  }

  componentWillMount() {
    this.captchaLoadCallback()
  }

  handleFormSubmit = (formProps) => {
    if(this.cResponse.length < 256) {
      this.props.showSignupMessage('Invalid Captcha Response.', 'error')
      return
    }
    console.log('form submit: ', formProps)
    this.props.signupUser(formProps)
  }

  renderAlert = () => {
    if(this.props.message) {
      return (
        <Alert type={this.props.type} page='signup'>
          <strong>Oops!</strong> {this.props.message}
        </Alert>
      )
    }
  }

  componentDidMount() {

  }
  verifyCallback = (response) => {
    console.log('CAPTCHA RESPONSE: ', response)
    this.cResponse = response
  }

  captchaLoadCallback = (obj) => {
    console.log('done loading!')
  }

  render() {
     const {handleSubmit, fields: { bhwname, email, password, passwordConfirm}} = this.props
    return (
      <div className="main-register">
      <Helmet title='SESprout: Register' />
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div className="card">
              <div className="card-block">
                <form className='form-register' onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <h2 className="form-register-heading">
                    <span className="fa fa-user-plus"></span>&nbsp;
                    New Account
                  </h2>
                  {this.renderAlert()}

                  <label for="inputEmail" className="sr-only">Email address</label>
                  <input {...email} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                  {email.touched && email.error && <div className='error'>{email.error}</div>}
                  <label for="inputBhwUsername" className="sr-only">BHW Username</label>
                  <input {...bhwname} type="text" id="inputBhwUsername" className="form-control" placeholder="BHW Username" required autofocus />
                  <label for="inputPassword" className="sr-only">Password</label>
                  <input {...password} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                  {password.touched && password.error && <div className='error'>{password.error}</div>}
                  <label for="inputPasswordConfirm" className="sr-only" >Confirm Password:</label>
                  <input {...passwordConfirm} type='password' id="inputPasswordConfirm" className='form-control' placeholder="Confirm Password" required />
                  {passwordConfirm.touched && passwordConfirm.error && <div className='error'>{passwordConfirm.error}</div>}

                  <Recaptcha sitekey='6LfgMSETAAAAAECwuG3i-04WS58Kr9av8KYZ-Ved'
                              render = 'explicit'
                              verifyCallback={this.verifyCallback}
                              onloadCallback={this.captchaLoadCallback} />
                  <button className="btn btn-lg btn-danger btn-block" type="submit">
                    <span className="fa fa-sign-in"></span>&nbsp;
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {}

  if(!formProps.email) {
    errors.email = 'Please enter an email'
  }

  if(!formProps.password) {
    errors.password = 'Please enter a password'
  }

  if(!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation'
  }

  if(formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match'
  }
  return errors
}

function mapStateToProps(state) {
  return {
    message: state.auth.signup_message,
    type: state.auth.signup_message_type
  }
}
export default reduxForm({
  form: 'signup',
  fields: ['bhwname', 'email', 'password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)
  (Signup)