import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import * as utils from '../../utils'

class UserOrders extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.fetchUserOrders()
  }

  exportUserOrders = () => {
    this.props.exportUserOrders()
  }

  render() {
    return (
      <div>
      <div className='row'>
        <div className='col-sm-12'>
          <table className="table user-orders">
            <thead>
              <tr>
                <th>Date</th>
                <th>Order Id</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {this.props.orders.map((item, ind) => {
              return (
                <tr key={ind}>
                  <th scope='row'>{item.order_date}</th>
                  <td>{item.order_id}</td>
                  <td>{item.state}</td>
                  <td>${item.amount}</td>
                </tr>
              )
            })}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  let orders = state.user.orders.map(order => {
    return {...order, order_date: utils.formatMongoDate(order.order_date)}
  })
  return { orders }
}

export default connect(mapStateToProps, actions)(UserOrders)