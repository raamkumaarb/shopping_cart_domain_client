import React, {PropTypes} from 'react'
import { connect } from 'react-redux'

export default function(ComposedComponent) {

  class Admin extends React.Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(!this.props.isAdmin)
        this.context.router.push('/')
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAdmin)
        this.context.router.push('/')
    }

    render() {
        return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {isAdmin: state.auth.isAdmin }
  }
  return connect(mapStateToProps)(Admin)
}