import {renderComponent, expect} from '../test_helper'
import FAQ from '../../src/components/FAQ'

describe('FAQ', () => {
  let component

  beforeEach(() => {
    component = renderComponent(FAQ)
  })
  it('loads', () => {
    expect(component).to.exist
  })

  it('has the correct class', () => {
    expect(component.find('section')).to.have.class('faq-page')
  })

  it('renders FAQ Questions', () => {
    expect(component.find('article.faq-page-quest')).to.exist
  }) 

})