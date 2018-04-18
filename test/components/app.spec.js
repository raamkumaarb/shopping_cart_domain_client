import {renderComponent, expect} from '../test_helper'
import App from '../../src/components/App'

const SIGNIN_ROUTE = '/signin'
const SIGNUP_ROUTE = '/signup'
const STORE_ROUTE = '/store'
const FORGOT_PASSWORD_ROUTE = ''

describe('App', () => {

  it('loads', () => {
    let props = { location: { pathname: '/' }}
    const component = renderComponent(App, props)
    expect(component).to.exist
  })

  it('renders the page layout', () => {
    let props = { location: { pathname: '/' }}
    const component = renderComponent(App, props)
    expect(component.find('.container')).to.exist
  })
})