import {renderComponent, expect} from '../test_helper'
import Signup from '../../src/components/auth/Signup'

const TEST_EMAIL = 'testUser@sesprout.com'
const TEST_USER = 'testUser@sesprout.com'
const TEST_PASSWORD = 'test1234'
const TEST_PASSWORD2 = 'test12345'

describe('Signup', () => {
  let component

  beforeEach(() => {
    component = renderComponent(Signup)
  })
  it('loads', () => {
    expect(component).to.exist
  })

  it('has the correct class', () => {
    expect(component).to.have.class('signup')
  })

  it('renders sign box', () => {
    expect(component.find('form')).to.have.class('sign-box')
  })

  it('renders password textbox', () => {
    expect(component.find('input.password-textbox')).to.exist
  })


  describe('email textbox', () => {
    beforeEach(() => {
      component.find('input.email-textbox').simulate('change', TEST_EMAIL)
    })

    it('renders username textbox', () => {
      expect(component.find('input.email-textbox')).to.exist
    })

    it('shows text in textarea', () => {
      expect(component.find('input.email-textbox')).to.have.value(TEST_EMAIL)
    })


  })

  describe('bhwname textbox', () => {
    beforeEach(() => {
      component.find('input.bhwname-textbox').simulate('change', TEST_USER)
    })

    it('renders username textbox', () => {
      expect(component.find('input.bhwname-textbox')).to.exist
    })

    it('shows text in textarea', () => {
      expect(component.find('input.bhwname-textbox')).to.have.value(TEST_USER)
    })
  })

  describe('password textbox', () => {
    let passwordSelector = 'input.password-textbox'
    beforeEach(() => {
      component.find(passwordSelector).simulate('change', TEST_PASSWORD)
    })

    it('renders password textbox', () => {
      expect(component.find(passwordSelector)).to.exist
    })

    it('shows text in textarea', () => {
      expect(component.find(passwordSelector)).to.have.value(TEST_PASSWORD)
    })
  })

  describe('password confirm textbox', () => {
    let passwordSelector = 'input.passwordConfirm-textbox'
    beforeEach(() => {
      component.find(passwordSelector).simulate('change', TEST_PASSWORD2)
    })

    it('renders password confirm textbox', () => {
      expect(component.find(passwordSelector)).to.exist
    })

    it('shows text in textarea', () => {
      expect(component.find(passwordSelector)).to.have.value(TEST_PASSWORD2)
    })
  })    
  
})