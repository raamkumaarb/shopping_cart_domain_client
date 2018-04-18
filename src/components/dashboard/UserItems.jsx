import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { browserHistory } from 'react-router'
import * as utils from '../../utils'
// import '../../style/userOrders.scss'

class UserItems extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.fetchUserItems()
  }

  exportUserItems = () => {
    this.props.exportUserItems()
  }

  render() {
    return (
      <div {...this.props}>
      <div className='row'>
        <div className='col-sm-12'>
          <table className="table user-items">
            <thead>
              <tr>
                <th>Date</th>
                <th>URL</th>
                <th>Username</th>
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
                  <td>{item.username}</td>
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
            <button className='btn btn-success btn-small' onClick={this.exportUserItems}>Export</button>
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

export default connect(mapStateToProps, actions)(UserItems)