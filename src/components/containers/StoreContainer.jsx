import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Store from '../Store.jsx'

class StoreContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Store />
    )
  }
}

export default StoreContainer

