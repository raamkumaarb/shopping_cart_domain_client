import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
// import '../../style/checkoutBox.scss'

class CheckoutBox extends React.Component {


  render() {
    return (
      <div className="checkoutBox">
        <div className="card">
          <div className="card-header">
            Checkout
          </div>
          <div className="card-block">
            <table className="table">
              <thead>
                <tr>
                  <th>Metrics</th>
                  <th>Quantity</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">TF 5+</th>
                  <td>2</td>
                  <td>$5</td>
                </tr>
                <tr>
                  <th scope="row">UR 20+</th>
                  <td>1</td>
                  <td>$18</td>
                </tr>
                <tr>
                  <th scope="row">TF 15+</th>
                  <td>2</td>
                  <td>$20</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.store.message }
}

export default connect(mapStateToProps, actions)(CheckoutBox)