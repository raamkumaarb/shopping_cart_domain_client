import React from 'react'
import Header from './Header'
import Footer from './Footer'
import LandingPageFooter from './landingPage/Footer'
import { connect } from 'react-redux'
import * as actions from '../actions'
import LoadingIcon from './LoadingIcon'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { notie, sweetAlert } from '../utils'

class PageLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentWillMount() {
  //   this.props.setLoading(true)
  // }

  componentDidMount() {
    // console.log('we are: ', this.props)
  }

  componentDidUpdate() {
    if(this.props.message) {
      notie(this.props.type, this.props.message, this.props.delay)
    }
    if(this.props.sweet_alert.text) {
      sweetAlert(this.props.sweet_alert)
    }
  }

  renderLayout = () => {
    switch(this.props.location) {
    case '/signin':
    case '/signup':
    case '/passwordreset/submit':
      return (
      <div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}
        >
        <div className='container'>
          {this.props.children}
        </div>
      <Footer />
      </ReactCSSTransitionGroup>
    </div>
      )
      break
    case '/':
      return (
        <div>
        <Header />
        <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}
        >
          {this.props.children}
          <Footer />
      <LandingPageFooter />
      </ReactCSSTransitionGroup>
    </div>
        )
      break
    default:
      return (
      <div>
      <Header />
      <div className='container'>
      <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={2000}
          transitionLeaveTimeout={2000}
        >
          <div className='page-content'>
            <div className='container'>
              {this.props.children}
            </div>
          </div>
          </ReactCSSTransitionGroup>
          </div>
        <Footer />
      </div>
      )
      break
    }
  }

  render() {
    return this.renderLayout()
  }
}


function mapStateToProps(state) {
  return {
    loading: state.app.loading,
    message: state.app.notie,
    type: state.app.notie_type,
    delay: state.app.notie_delay,
    sweet_alert: state.app.sweet_alert
  }
}

export default connect(mapStateToProps, actions)(PageLayout)