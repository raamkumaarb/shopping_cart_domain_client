import React from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import * as actions from '../../../actions'
import Alert from '../../AlertBox'
import Helmet from 'react-helmet'
import { notie } from '../../../utils'
import Recaptcha from 'react-recaptcha'
// import '../../style/resetPassword.scss'
import config from '../../../config.js'

class ResetPassword extends React.Component {

  constructor(props) {
    super(props)
    this.cResponse = ''
  }

  handleFormSubmit = ({ password, passwordConfirm }) => {
    if(this.cResponse.length < 256) {
      notie('danger', 'Invalid Captcha', 3)
      return
    }
    this.props.submitNewPassword(password, passwordConfirm)
  }

componentWillMount() {
    this.captchaLoadCallback()
  }

componentDidUpdate() {
    if(this.props.message) {
      notie(this.props.type, this.props.message, this.props.delay)
    }
  }

  verifyCallback = (response) => {
    this.cResponse = response
  }

  captchaLoadCallback = (obj) => {
  }

  captchaStyle = {
    transform: 'scale(0.92)',
    WebkitTransform: 'scale(0.92)',
    transformOrigin: '0 0'
  }

  RECAPTCHA_SITEKEY = config.RECAPTCHA_SITEKEY

  render() {
    const {handleSubmit, fields: { password, passwordConfirm }} = this.props
    return (
      <div className="page-center">
        <div className="page-center-in">
            <div className="container-fluid">
                <form className="sign-box" onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <header className="sign-title">Reset Password</header>
                    <div className={(password.touched && password.error) ? 'form-group form-group-error' : 'form-group'}>
                            <input type="password" {...password} className="form-control" placeholder="Password" required/>
                            {password.touched && password.error &&<small class="text-muted">{password.error}</small>}
                        </div>
                        <div className={(passwordConfirm.touched && passwordConfirm.error) ? 'form-group form-group-error' : 'form-group'}>
                            <input type="password" {...passwordConfirm} className="form-control" placeholder="Repeat password" required/>
                            {passwordConfirm.touched && passwordConfirm.error &&<small class="text-muted">{passwordConfirm.error}</small>}
                        </div>
                    <div style={this.captchaStyle}>
                    <Recaptcha sitekey={this.RECAPTCHA_SITEKEY}
                      render = 'explicit'
                      verifyCallback={this.verifyCallback}
                      data-size="compact"
                      onloadCallback={this.captchaLoadCallback}
                      style={this.captchaStyle}
                      size='small' />
                      </div>
                    <button type="submit" className="btn btn-rounded">Reset Password</button>
                </form>
            </div>
        </div>
    </div>
    )
  }
}

function validate(formProps) {
  const errors = {}
  let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})")
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
  form: 'resetPassword',
  fields: ['password', 'passwordConfirm'],
  validate
}, mapStateToProps, actions)(ResetPassword)