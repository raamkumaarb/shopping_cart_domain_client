import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Alert from './AlertBox'
import Helmet from 'react-helmet'
// import '../style/landingPage.scss'

class Home extends React.Component {

  componentWillMount() {
    // this.props.fetchAuthMessage()
  }

  renderAlert = () => {
    if(this.props.message) {
      return (
        <Alert type='info' page='home'>
          {this.props.message}
        </Alert>
      )
    }
  }

  render() {
    return (
      <div>
      <Helmet title='SESprout: Home' />
       {this.renderAlert()}
        <div className="jumbotron">
          <h1>The best expired tumblr domains, sorted by niche.</h1>
          <p className="lead">Choose from thousands of expired tumblr domains, grouped by category.</p>
          <p><a className="btn btn-lg btn-success" href="#" role="button">Start Shopping</a></p>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <h2>Automated Delivery</h2>
            <p>No more waiting for the seller to get back to you. Youll receive your domains and login information instantly</p>
            <p><a className="btn btn-primary" href="#" role="button">View details &raquo;</a></p>
          </div>
          <div className="col-lg-4">
            <h2>Up to 25 TF</h2>
            <p>Our premium domains include TF 25+, UR 20+, PA/DA 35+</p>
         </div>
          <div className="col-lg-4">
            <h2>Spam Free</h2>
            <p>We manually check the archive.org history for each domain.</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(mapStateToProps, actions)(Home)