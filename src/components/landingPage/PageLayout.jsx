import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import LoadingIcon from '../LoadingIcon'
import Header from '../Header'
// import '../style/vendor/bootstrap.min.css'
// import '../style/main.scss'

class PageLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentWillMount() {
  //   this.props.setLoading(true)
  // }

  componentDidMount() {
    console.log('we are: ', this.props)
  }

  render() {
    return (
    <div>
    <Header />
        {this.props.children}
    </div>
    )
  }
}


function mapStateToProps(state) {
  return { loading: state.app.loading }
}

export default connect(mapStateToProps, actions)(PageLayout)