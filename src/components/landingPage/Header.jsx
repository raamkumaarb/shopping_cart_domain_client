import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class LandingPageHeader extends React.Component {

  render() {
    return (
      <header className="site-header-container" id="section-1">
        <div className="site-header">
          <div className="site-header-collapsed">
            <div className="site-header-collapsed-in">
              <div className="container">
                <div className="site-logo">Start<span>UI</span></div>
                <div className="site-header-right">
                  <nav className="site-menu" id="page-nav">
                    <ul>
                      <li><a href="#section-1"><span>Main</span></a></li>
                      <li><a href="#section-2"><span>Concept</span></a></li>
                      <li><a href="#section-3"><span>Extra</span></a></li>
                      <li><a href="#section-4"><span>Landing</span></a></li>
                      <li><a href="#section-5"><span>Tools</span></a></li>
                      <li><a href="#section-6"><span>Video</span></a></li>
                      <li><a href="#section-7"><span>Pricing</span></a></li>
                    </ul>
                  </nav>
                  <a href="#" className="btn btn-sm btn-fill">Purchase</a>
                </div>
              </div>
            </div>
          </div>
          <div className="site-header-clone">
            <div className="container">
              <div className="site-logo">Start<span>UI</span></div>
              <button type="button" className="burger">
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated }
}

export default connect(mapStateToProps)(LandingPageHeader)