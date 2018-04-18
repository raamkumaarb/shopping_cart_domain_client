import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { browserHistory } from 'react-router'
import * as utils from '../../../utils'
// import '../../style/userOrders.scss'

class Purchases extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.fetchUserItems()
  }

  tableSize = {
    height: window.innerHeight - 245
  }

  exportUserItems = () => {
    this.props.exportUserItems()
  }

  anyPurchasesAvailable = () => {
    return (!this.props.items.length)
  }
  render() {
    return (
      <div {...this.props}>
      <div className='row'>
          <div className='resizing-table-container col-sm-12' style={this.tableSize}>
            <table className="table user-items">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>URL</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>TF</th>
                  <th>CF</th>
                  <th>UR</th>
                  <th>RD</th>
                  <th>Main Category</th>
                  <th>Sub Category</th>
                </tr>
              </thead>
              <tbody>
              {this.props.items.map(item => {
                return (
                  <tr key={item._id}>
                    <th scope='row'>{item.order_date}</th>
                    <td>{item.url}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.tf}</td>
                    <td>{item.cf}</td>
                    <td>{item.ur}</td>
                    <td>{item.ref_domains}</td>
                    <td>{item.category}</td>
                    <td>{item.sub_category}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className='row export-buttons-row'>
          <div className='col-sm-12'>
            <button className='btn btn-success btn-small' onClick={this.exportUserItems} disabled={this.anyPurchasesAvailable()}>Export</button>
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  if(!state.user.items) {
    return {items: []}
  }
  let items = state.user.items.map(order => {
    return {...order, order_date: utils.formatMongoDate(order.order_time)}
  })
  return { items }
}

export default connect(mapStateToProps, actions)(Purchases)