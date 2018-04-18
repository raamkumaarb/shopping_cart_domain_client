import React from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import * as actions from '../../actions'
import Alert from '../AlertBox'
import Helmet from 'react-helmet'
// import '../../style/signin.scss'

class Signin extends React.Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.signinUser({ email, password })
  }

  renderAlert = () => {
    if(this.props.message) {
      return (
        <Alert type={ this.props.type } page='signin'>
          <strong>Oops!</strong> {this.props.message}
        </Alert>
      )
    }
  }
  render() {
    const {handleSubmit, fields: { email, password }} = this.props
    return (
      <div className="main-login">
      <Helmet title='SESprout: Sign in' />
        <div className="row">
          <div className="col-md-4 col-md-offset-2">
            <div className="card">
              <div className="card-block">
                <form>
                  <h2 className="form-signin-heading">
                    <span className="fa fa-user-plus"></span>&nbsp;
                    Register
                  </h2>
                  <Link to='signup' className='register-btn'>
                  <button className="btn btn-lg btn-danger btn-block" type="submit">
                    <span className="fa fa-user-plus"></span>&nbsp;
                    Register
                  </button>
                  </Link>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <div className="card-block">
                <form className='form-signin' onSubmit={handleSubmit(this.handleFormSubmit)}>
                  <h2 className="form-signin-heading">
                    <span className="fa fa-lock"></span>&nbsp;
                    User Login
                  </h2>
                  {this.renderAlert()}
                  <label for="inputEmail" className="sr-only">Email address</label>
                  <input {...email} type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
                  <label for="inputPassword" className="sr-only">Password</label>
                  <input {...password} type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                  <button className="btn btn-lg btn-danger btn-block" type="submit">
                    <span className="fa fa-sign-in"></span>&nbsp;
                    Sign in
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

function mapStateToProps(state) {
  return {
    message: state.auth.login_message,
    type: state.auth.login_message_type
  }
}
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)