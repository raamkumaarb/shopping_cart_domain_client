import React from 'react'
import { reduxForm } from 'redux-form'
import { Link } from 'react-router'
import * as actions from '../../actions'
import Alert from '../AlertBox'
import Helmet from 'react-helmet'
import { notie } from '../../utils'
import LoadingIcon from '../LoadingIcon'
// import '../../style/signin.scss'

import avatarImg from '../../static/img/avatar-sign.png'

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = { showLogin: true}
  }

  handleFormSubmit = ({ email, password }) => {
    this.setState({ showLogin: false });    
    this.props.signinUser({ email, password })
  }

  componentDidUpdate() {
      if(this.props.message) {
        notie(this.props.type, this.props.message, this.props.delay)
      }
      this.state = { showLogin: true}
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
      <div className="page-center signin">
        <div className="page-center-in">
            <div className="container-fluid">
              <form className="sign-box" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <div className='back-button-icon'>
                  <Link to='/'>
                    <i className="font-icon fa fa-arrow-circle-left" aria-hidden="true"></i>
                  </Link>
                </div>
                    <div className="sign-avatar">
                        <img src={avatarImg} alt="" />
                    </div>
                    <header className="sign-title">Sign In</header>
                    <div className="form-group">
                        <input {...email} type="text" className="form-control email-textbox" placeholder="E-Mail"/>
                    </div>
                    <div className="form-group">
                        <input {...password} type="password" className="form-control password-textbox" placeholder="Password"/>
                    </div> 
                    <div>                   
                    { this.state.showLogin ? <button type="submit" className="btn btn-rounded">Sign in</button> : <LoadingIcon /> }
                    </div>
                    <p className="sign-note">New to our website? <Link to='/signup'>Sign up</Link></p>
                    <p className="sign-note">Forgot your password? <Link to='/resetpassword/form'>Reset password</Link></p>
                </form>
            </div>
        </div>
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.app.notie,
    type: state.app.notie_type,
    delay: state.app.notie_delay
  }
}
export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)