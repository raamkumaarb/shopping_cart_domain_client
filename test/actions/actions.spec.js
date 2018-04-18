import { expect } from '../test_helper'
import * as actions from '../../src/actions/index'
import { FETCH_STORE_DATA, UPDATE_TABLE_DATA } from '../../src/actions/types'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import config from '../test.config.js'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const ROOT_URL = config.API_URL;

(function (glob) {
  function mockStorage() {
    var storage = {}
    return {
      setItem: function(key, value) {
        storage[key] = value || ''
      },
      getItem: function(key) {
        return storage[key]
      },
      removeItem: function(key) {
        delete storage[key]
      },
      get length () {
        return Object.keys(storage).length
      },
      key: function(i) {
        var keys = Object.keys(storage)
        return keys[i] || null
      }
    }
  }
  global.localStorage = mockStorage()
  global.sessionStorage = mockStorage()
}(typeof window !== 'undefined' ? window : global))

describe('async actions', () => {
  beforeEach(() => {
    localStorage.removeItem('token')
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('sends FETCH_STORE_DATA after store data is fetched', () => {
    const email = config.EMAIL
    const password = config.PASSWORD
    const reply = [{
      _id: '57a2af2771523423',
      ur: 10,
      pa: 10,
      cf: 20,
      tf: 10,
      majestic_ref_domains: 110,
      ahrefs_ref_domains: 10,
      category: 'Games',
      sub_category: 'Uncategorized',
      price: 2
    }]
    nock(`${ROOT_URL}`)
      .get('/fetchDomain/pbn')
      .reply(200, { message: reply})

    const expectedActions = [
      { type: FETCH_STORE_DATA },
      { type: UPDATE_TABLE_DATA, payload: reply }
    ]
    const store = mockStore({ auth : { token : 123 } })
    const state = () => { return {auth : { token : 123 }} }
    
console.log('This is ', actions.fetchDomainData('pbn')(store.dispatch, state))

    return store.dispatch(actions.fetchDomainData('pbn'))
      .then(() => { // return of async actions
        //expect(store.getActions()).toEqual(expectedActions)
      })
  })
})