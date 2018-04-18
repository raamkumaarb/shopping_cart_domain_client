import React from 'react'
import { Component } from 'react'
import PageLayout from './PageLayout'
import HomePageLayout from './landingPage/PageLayout'

export default class App extends Component {

  render() {
    return (
        <PageLayout location={this.props.location.pathname}>
          {this.props.children}
        </PageLayout>
      )
  }
}
