import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class StoreItem extends React.Component {

  constructor(props) {
    super(props)
    this.MIN = 0
    this.MAX = 20
    this.state = {isChecked: false, quantity: 0, name: this.props.value}
  }

  onChangeCheckbox = (event) => {
    this.setState({isChecked: !this.state.isChecked});
  }

  onChangeQuantity = (event) => {
    let quantity = this.filterValue(event.target.value)
    this.setState({quantity});
  }

  filterValue = (quantity) => {
    let returnVal = (quantity <= this.MAX) ? quantity : this.MAX
    return (returnVal >= this.MIN) ? returnVal : 0
  }

  render() {
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" value={this.props.value} onChange={this.onChangeCheckbox}/> <b>{this.props.text}</b> (${this.props.price})
        </label>
        {this.state.isChecked ? <QuantityInput for={this.props.value} onChange={this.onChangeQuantity} value={this.state.quantity}/> : null}
      </div>
    )
  }
}

const QuantityInput = (props) => (
  <input {...props} type="number" className="form-control" placeholder="Quantity"/>
)

function mapStateToProps(state) {
  return { message: state.store.message }
}

export default connect(mapStateToProps, actions)(StoreItem)