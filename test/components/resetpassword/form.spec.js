import {renderComponent, expect} from '../../test_helper'
import ResetPassword from '../../../src/components/auth/resetPassword/ResetPassword'

describe('ResetPassword', () => {
  let component

  beforeEach(() => {
    component = renderComponent(ResetPassword)
  })
  it('loads', () => {
    expect(component).to.exist
  })

  it('contains email textbox', () => {
    expect(component.find('form input')).to.exist
  })

  it('allows text in textbox', () => {
    component.find(component.find('form input')).simulate('change', 'test')
  })
})