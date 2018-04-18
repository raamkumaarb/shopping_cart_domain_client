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
import LoadingIcon from '../../LoadingIcon'

class ResetPassword extends React.Component {

  constructor(props) {
    super(props)
    this.cResponse = ''
    this.state = { showResults: false}
  }

  handleFormSubmit = ({ email }) => {
    if(this.cResponse.length < 256) {
      notie('danger', 'Invalid Captcha', 3)
      return
    }
    this.setState({ showResults: true });
    this.props.resetPassword({ email })
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
    const {handleSubmit, fields: { email }} = this.props
    return (
      <div className="page-center">
        <div className="page-center-in">
            <div className="container-fluid">
                <form className="sign-box" onSubmit={handleSubmit(this.handleFormSubmit)}>
                    <header className="sign-title">Reset Password</header>
                    <div className="form-group">
                        <input {...email} type="text" className="form-control" placeholder="E-Mail"/>
                    </div>
                    <div className="resetCaptchaClass">
                    <Recaptcha sitekey={this.RECAPTCHA_SITEKEY}
                      render = 'explicit'
                      verifyCallback={this.verifyCallback}
                      data-size="compact"
                      onloadCallback={this.captchaLoadCallback}
                      style={this.captchaStyle}
                      size='small' />
                      </div>
                    { this.state.showResults ? <LoadingIcon /> : <button type="submit" className="btn btn-rounded">Reset Password</button> }
                </form>
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
  fields: ['email']
}, mapStateToProps, actions)(ResetPassword)