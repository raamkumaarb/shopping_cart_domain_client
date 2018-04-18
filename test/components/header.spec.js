import React from 'react'
//import TestUtils from 'react-addons-test-utils'
import {renderComponent, expect} from '../test_helper'
import Header from '../../src/components/Header'

describe('Header', () => {
  let component

  beforeEach(() => {
   // component = renderComponent(Header)
    var markup = React.renderToStaticMarkup(<Header />);

    /*this.component = TestUtils.renderIntoDocument(<Header initialName="my first test" />);
    this.renderedDOM = () => React.findDOMNode(this.component);*/
  })
  it('loads', () => {
    expect(component).to.exist
  })

  it('has the correct class', () => {
    expect(component).to.have.class('site-header')
  })

  it('has a logo', () => {
    expect(component.find('#header-logo')).to.exist
  })

  it('has header items (logged out)', () => {
    expect(component.find('.header-item')).to.have.length(3)
  })
})