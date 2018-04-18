import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class CheckoutItem extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <tr>
        <th scope="row">xxx.tumblr.com</th>
        <td>5</td>
        <td>5</td>
        <td>5</td>
        <td>Gardening</td>
        <td>$5</td>
      </tr>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.store.message }
}

export default connect(mapStateToProps, actions)(StoreItem)