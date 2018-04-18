import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { browserHistory } from 'react-router'
import * as utils from '../../../utils'

class UserCredits extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.fetchUserCreditHistory()
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
                <th>Credit Id</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
            {this.props.credits.map((item, ind) => {
              return (
                <tr key={ind}>
                  <th scope='row'>{item.credit_date}</th>
                  <td>{item.credit_id}</td>
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
  let credits = state.user.credits.map(credit => {
    return {...credit, credit_date: utils.formatMongoDate(credit.credit_date)}
  })
  return { credits }
}

export default connect(mapStateToProps, actions)(UserCredits)