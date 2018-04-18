// Store item selector
// Takes store data and combines with cart (ids)

import { createSelector } from 'reselect'
import _ from 'lodash'

// create function to pick off pieces of state
const tumblrDataSelector = state => state.tumblr.data
const cartSelector = state => state.cart.cart

const getDomains = (domains, cart) => {
  const selectedItems =_.filter(
    domains,
    domain => !_.includes(cart, domain._id)
    )
  return selectedItems
}

export default createSelector(
  tumblrDataSelector, // pick off piece of state
  cartSelector, // pick off piece of state
  getDomains // last argument always has selector logic function
)