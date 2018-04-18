import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Alert from '../AlertBox'
import Helmet from 'react-helmet'
import { notie, sweetAlert } from '../../utils'
// import '../style/landingPage.scss'
import homepageImage from '../../static/img/homepage-image.png'
class Home extends React.Component {

  componentWillMount() {
    // this.props.fetchAuthMessage()
  }

    componentDidUpdate() {
    if(this.props.message) {
      notie(this.props.type , this.props.message, this.props.delay)
    }

    if(this.props.alert.text) {
        sweetAlert(this.props.alert)
      }
  }

  render() {
    return (
      <div id='lp'>
      <Helmet title='SESprout: Home' />
        <section className="section-promo">
        <div className="container">
          <div className="section-promo-txt">
            <h1>Expired Tumblr Accounts</h1>
            <p>Browse our selection of re-registered niche specific web 2.0 accounts with high SEO metrics including PA, TF/CF, UR and referring domains.</p>
            <div className="btns-group">
              <Link to='/signup' className="btn btn-fill call-to-action">Register an account</Link>
            </div>
          </div>
          <div className="section-promo-pic">
            <img src={homepageImage} />
          </div>
        </div>
      </section>
      <section className="section"  id="section-5">
        <div className="container">
          <header className="title-section">
            <h3>Store Features</h3>
          </header>
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <article className="icon-txt-item">
                <i className="font-icon fa fa-bar-chart" aria-hidden="true"></i>
                <h4>SEO Metrics</h4>
                <p>We offer accounts with a variety of SEO metrics including PA, TF/CF, UR, referring domains and more.</p>
              </article>
            </div>
            <div className="col-lg-3 col-sm-6">
              <article className="icon-txt-item">
                <i className="font-icon fa fa-sitemap" aria-hidden="true"></i>
                <h4>Niche Specific</h4>
                <p>Our TF accounts are broken down by niche category and organized accordingly. You can easily filter accounts to meet your specific needs.</p>
              </article>
            </div>
            <div className="clearfix hidden-lg-up"></div>
            <div className="col-lg-3 col-sm-6">
              <article className="icon-txt-item">
                <i className="font-icon fa fa-paper-plane" aria-hidden="true"></i>
                <h4>Instant Delivery</h4>
                <p>We know time is money and getting access to your accounts in a timely fashion in critical. We developed a platform that delivers your accounts instantly.</p>
              </article>
            </div>
            <div className="col-lg-3 col-sm-6">
              <article className="icon-txt-item">
                <i className="font-icon fa fa-file-excel-o" aria-hidden="true"></i>
                <h4>Export</h4>
                <p>We built custom functionality that allows you to easily export your accounts in .csv.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <section className="section-fill">
        <div className="container">
          <div className="tbl txt-btn-block">
            <div className="tbl-row">
              <div className="tbl-cell">
                <h3>What would you like to see in our next update?</h3>
                <p>We're always trying to improve our service and welcome any suggests you may have!</p>
              </div>
              <div className="tbl-cell tbl-cell-action">
                <a href="mailto:contact@sesprout.com" className="btn btn-inverse-colored">Give us feedback</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    message: state.app.notie,
    type: state.app.notie_type,
    delay: state.app.notie_delay,
    alert: state.app.sweet_alert
  }
}

export default connect(mapStateToProps, actions)(Home)