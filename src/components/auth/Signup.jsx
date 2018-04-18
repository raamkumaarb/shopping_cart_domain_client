import React from 'react'
import {reduxForm} from 'redux-form'
import * as actions from '../../actions'
import Alert from '../AlertBox'
import Helmet from 'react-helmet'
import Recaptcha from 'react-recaptcha'
import { Link } from 'react-router'
import { notie, sweetAlert } from '../../utils'
import config from '../../config.js'




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
      notie('danger', 'Invalid Captcha', 3)
      return
    }
    formProps.captcha = this.cResponse
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

  componentDidUpdate() {
    if(this.props.message) {
      notie(this.props.type, this.props.message, 3)
    }
  }

  componentDidMount() {
    window.setTimeout(() => this.setState({ renderRecaptcha: true }), 1000);
  }

  verifyCallback = (response) => {
    this.cResponse = response
  }

  captchaLoadCallback = (obj) => {
    console.log('done loading!')
    $('div#g-recaptcha div').removeAttr('style');
  }

  captchaStyle = {
    transform: 'scale(0.92)',
    WebkitTransform: 'scale(0.92)',
    transformOrigin: '0 0'
  }

  RECAPTCHA_SITEKEY = config.RECAPTCHA_SITEKEY

  render() {
     const {handleSubmit, fields: { bhwname, email, password, passwordConfirm, captcha}} = this.props
    return (
      <div>
        <Helmet title='SESprout: Register' />
          <div className="page-center">
            <div className="page-center-in">
                <div className="container-fluid">
                    <form className="sign-box" onSubmit={handleSubmit(this.handleFormSubmit)}>
                       {/* <div className="sign-avatar no-photo">+</div>*/}
                        <header className="sign-title">Sign Up</header>
                        <div className={(email.touched && email.error) ? 'form-group form-group-error' : 'form-group'}>
                            <input type="text" {...email} className="form-control" placeholder="E-Mail" required/>
                             {email.touched && email.error &&<small class="text-muted">{email.error}</small>}
                        </div>
                        <div className={(bhwname.touched && bhwname.error) ? 'form-group form-group-error' : 'form-group'}>
                            <input type="text" {...bhwname} className="form-control" placeholder="Forum Username" required/>
                            {bhwname.touched && bhwname.error &&<small class="text-muted">{bhwname.error}</small>}
                        </div>
                        <div className={(password.touched && password.error) ? 'form-group form-group-error' : 'form-group'}>
                            <input type="password" {...password} className="form-control" placeholder="Password" required/>
                            {password.touched && password.error &&<small class="text-muted">{password.error}</small>}
                        </div>
                        <div className={(passwordConfirm.touched && passwordConfirm.error) ? 'form-group form-group-error' : 'form-group'}>
                            <input type="password" {...passwordConfirm} className="form-control" placeholder="Repeat password" required/>
                            {passwordConfirm.touched && passwordConfirm.error &&<small class="text-muted">{passwordConfirm.error}</small>}
                        </div>
                        <div className="signupCaptchaClass">
                        <Recaptcha {...captcha} render = 'explicit'
                              sitekey={this.RECAPTCHA_SITEKEY}
                              verifyCallback={this.verifyCallback}
                              data-size="compact"
                              onloadCallback={this.captchaLoadCallback}
                              style={this.captchaStyle}
                              size='small' />
                        </div>
                        <button type="submit" className="btn btn-rounded btn-success sign-up">Sign up</button>
                        <p className="sign-note">Already have an account? <Link to='/signin'>Sign in</Link></p>
                    </form>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {}
  let emailRegex = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$")
  let usernameRegex = new RegExp("^(?=.*[a-z0-9]$)(?=.{3,})")
  let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})")
  
  if(!emailRegex.test(formProps.email)) {
    errors.email = 'Please enter valid email'
  }

  if(!usernameRegex.test(formProps.bhwname)) {
    errors.bhwname = 'Username must contain 3 characters and only contain characters and numbers'
  }

  if(!passwordRegex.test(formProps.password))
    errors.password = 'Password must contain 8 characters and 1 numeric character.'

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
    message: state.app.notie,
    type: state.app.notie_type,
    delay: state.app.notie_delay
  }
}
export default reduxForm({
  form: 'signup',
  fields: ['bhwname', 'email', 'password', 'passwordConfirm', 'captcha'],
  validate
}, mapStateToProps, actions)
  (Signup)