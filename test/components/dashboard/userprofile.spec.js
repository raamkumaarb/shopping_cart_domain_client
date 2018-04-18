import {renderComponent, expect} from '../../test_helper'
import UserProfile from '../../../src/components/pages/user/Profile'

describe('My Profile', () => {
  let component

  beforeEach(() => {
    component = renderComponent(UserProfile)
  })
  it('loads', () => {
    expect(component).to.exist
  })
  
})