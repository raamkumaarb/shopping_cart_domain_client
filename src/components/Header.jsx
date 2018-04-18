import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import domainSelector from '../selectors/checkout_store_items'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.state = { selected: location.pathname.substring(1)}
  }

  setFilter= (filter) => {
    this.setState({selected  : filter})
  }

  isActive= (value) => {
    return ((value===this.state.selected) ?'active':'default');
  }

  renderUserButton() {
    if(this.props.authenticated)
      return (
        <div className="site-header-shown">
          <div className="dropdown user-menu">
              <button className="dropdown-toggle" id="dd-user-menu" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className='profile-header-icon'></span>
              </button>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dd-user-menu">
                  <Link className="dropdown-item" to='/user/profile' onClick={this.setFilter.bind(this, 'myProfile')}><span className="font-icon glyphicon glyphicon-user"></span>My Profile</Link>
                  <Link className="dropdown-item" to='/user/messages' onClick={this.setFilter.bind(this, 'messages')}><span className="font-icon glyphicon glyphicon-envelope"></span>Messages</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to='/user/purchases' onClick={this.setFilter.bind(this, 'purchasedItems')}><i className="font-icon font-icon-cart"></i>Purchased Items</Link>
                  <Link className="dropdown-item" to='/user/orders' onClick={this.setFilter.bind(this, 'pastOrders')}><span className="font-icon glyphicon glyphicon-list-alt"></span>Past Orders</Link>
                  <Link className="dropdown-item" to='/user/credits' onClick={this.setFilter.bind(this, 'creditHistory')}><i className="font-icon font-icon-cart"></i>Credit History</Link>
                  <div className="dropdown-divider"></div>
                  <Link to='//sesprout.zendesk.com' target="_blank" className="dropdown-item" id="dd-header-support"><span className="font-icon glyphicon glyphicon-list-alt"></span>Support</Link>
                  <Link className="dropdown-item" id="dd-header-faq" to='/faq' onClick={this.setFilter.bind(this, 'help')}><span className="font-icon glyphicon glyphicon-question-sign"></span>Help</Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to='/signout'><span className="font-icon glyphicon glyphicon-log-out"></span>Logout</Link>
              </div>
          </div>
      </div>
      )
    else
      return (<div />)
  }

  renderUserItems = () => {
    if(this.props.authenticated)
        return (

          <nav className="navbar navbar-light bg-faded secondary-header">
            <ul className="nav navbar-nav container">
               <li className={'header-item nav-item '+ this.isActive('tumblr')} onClick={this.setFilter.bind(this, 'tumblr')} key='tumblrs'>
                <Link to='/tumblr'><i className="font-icon font-icon-cart"></i>Web 2.0 Marketplace</Link>
               </li>
               <li className={'header-item nav-item '+ this.isActive('pbn')} onClick={this.setFilter.bind(this, 'pbn')} key='pbn'>
                <Link to='/pbn' ><i className="font-icon font-icon-cart"></i>Expired Domains</Link>
               </li>
            </ul>
          </nav>
        )
  }
  renderCheckoutButton() {
    if(this.props.authenticated)
      return (
        <div className='site-header-shown'>
          <div className="dropdown checkout-menu">
            <Link className="header-item" id='header-dd-checkout' to='/checkout' onClick={this.setFilter.bind(this, 'checkout')}>
               {this.props.cart.length==0?<h4><span className="label label-default zerobadge"> </span></h4>:<h4><span className="label label-default badgeLbl">{this.props.cart.length}</span></h4>}
                <div className="cartDiv"><i className="font-icon fa fa-shopping-cart" aria-hidden="true"></i></div>
            </Link>
          </div>
        </div>
      )
    else
      return (<div />)
  }

  renderSignupLoginItems() {
    if(!this.props.authenticated)
      return [
              <div key="1">

                        <div className="header-item pull-right nav navbar-nav">
                          <Link className="nav-item" id="dd-header-store" to='/signin'>
                              <span className="lbl">Sign In</span>
                          </Link>
                        </div>
                        <div className="header-item pull-right nav navbar-nav">
                          <Link className="nav-item" id="dd-header-store" to='/signup'>
                              <span className="lbl">Register</span>
                          </Link>
                        </div>
                      </div>

      ]
    else
      return (<div />)
  }

  render() {
   return (
        <nav className="navbar navbar-light bg-faded">
          <header className="site-header">
            <div className="container">
                <Link to='/' onClick={this.setFilter.bind(this, 'header')}>
                    <div id='header-logo'></div>
                </Link>
                <button className="hamburger hamburger--htla" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span>toggle menu</span></button>
                <div className="site-header-content">
                  <div className="site-header-content-in">
                      <div className="collapse navbar-toggleable-md" id="navbarResponsive">
                       <div className="mobile-menu-right-overlay"></div>
                      {this.renderUserButton()}
                      {this.renderCheckoutButton()}
                      {this.renderSignupLoginItems()}
                     </div>
                  </div>
              </div>
            </div>
             {this.renderUserItems()}
          </header>
        </nav>
  )
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, cart: domainSelector(state)}
}

export default connect(mapStateToProps)(Header)