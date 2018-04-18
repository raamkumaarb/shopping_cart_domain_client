import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import FormView from './FormView'
import TableView from './TableView'
import CheckoutBox from './CheckoutBox'
import Alert from '../AlertBox'
import LoadingIcon from '../LoadingIcon'
import Helmet from 'react-helmet'
import { notie } from '../../utils'
class Dashboard extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    console.log('this.props.message: ' , this.props.message)
    if(this.props.message) {
      notie(this.props.message_type, this.props.message, this.props.message_delay)
    }
  }

  render() {
    return (
      <div>
      <Helmet title='SESprout: Store' />
        <TableView domainType={this.props.location.pathname.substring(1)}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {  message: state.app.notie,
            message_type: state.app.notie_type,
            message_delay: state.app.notie_delay
          }
}

export default connect(mapStateToProps, actions)(Dashboard)