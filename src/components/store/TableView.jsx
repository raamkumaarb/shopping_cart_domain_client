import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import StoreItem from './StoreItem'
import CheckoutBox from './CheckoutBox'
import LoadingIcon from '../LoadingIcon'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { browserHistory } from 'react-router'
import _ from 'lodash'
import domainSelector from '../../selectors/available_store_items'
import tumblrSelector from '../../selectors/available_tumblr_items'
import pbnSelector from '../../selectors/available_pbn_items'
import '../../static/plugins/ion-range-slider/ion.rangeSlider.js'
import { notie } from '../../utils'

const MIN_PRICE = 1
const MAX_PRICE = 40
var hideColumn
class TableView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {'filter': {
        'pa': {"value":{"number":-1,"comparator":">"},"type":"NumberFilter"},
        'tf': {"value":{"number":-1,"comparator":">"},"type":"NumberFilter"},
        'cf': {"value":{"number":-1,"comparator":">"},"type":"NumberFilter"},
        'ur': {"value":{"number":-1,"comparator":">"},"type":"NumberFilter"},
        'majestic_ref_domains': {"value":{"number":-1,"comparator":">"},"type":"NumberFilter"},
        'ahrefs_ref_domains': {"value":{"number":-1,"comparator":">"},"type":"NumberFilter"},
        'price': {'value': {'number': MIN_PRICE, 'comparator':'>'}, 'type': 'NumberFilter',
        'options': [1,2,3,4,5]},
        category: ''
      },
      selectedRows: []
    }
    this.priceFilter = 0

    hideColumn=this.props.domainType=="tumblr"
 }

  componentWillMount() {
      this.props.fetchDomainData(this.props.domainType)
  }

  componentDidMount() {
    this.setupRangeSliders()
  }

  componentDidUpdate() {
    console.log('message: ', this.props.message)
    if(this.props.message) {
      notie(this.props.message_type, this.props.message, this.props.message_delay)
    }
  }

  setupRangeSliders = () => {

    $("#price-filter-slider").ionRangeSlider({
      type: "double",
      grid: true,
      min: MIN_PRICE,
      max: MAX_PRICE,
      from: MIN_PRICE,
      to: MAX_PRICE,
      step: 1,
      prefix: "$",
      onFinish: this.updatePriceFilter
    })
  }

  updatePriceFilter = (data) => {
    let currentFilter = {'price': {'value':{'minNumber':data.from, 'maxNumber': data.to},'type':'NumberRangeFilter'}}
    this.setState({...this.state, filter: {...this.state.filter, ...currentFilter}})
    let newFilterState = {...this.state, filter: {...this.state.filter, ...currentFilter}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }


  getSelectedRowKeys = () => {
    console.log('get selected: ', this.state.selectedRows)
    let ids = this.refs.table.state.selectedRowKeys
    let cart = this.props.cart
    ids = _.filter(ids, id => {
      return !_.includes(cart, id)
    })
    if(ids.length > 0) {
      this.props.addToCart(ids)
      notie('info', `Added ${ids.length} item(s) to cart`, 2)
    }
    // browserHistory.push('/checkout')
  }

  selectRowProp = {
    mode: "checkbox",  //checkbox for multi select, radio for single select.
    clickToSelect: true,   //click row will trigger a selection on that row.
    bgColor: "rgba(67, 194, 97, 0.21)"  //selected row background color
  }

  optionsProp = {
    sizePerPage: 30,
    afterColumnFilter: this.filterColumnFilter
  }

  formatToUsd = (cell, row) => {
    return '$ ' + cell;
  }

  dateFormatter = (cell, row) => {
    let lookup_time=moment(row.last_date_whoischeck).fromNow()
    return `${lookup_time}`;
  }

  filterTf = (e) => {
    let val = e.target.value - 1
    let filterConds = {'tf': {"value":{"number":val,"comparator":">"},"type":"NumberFilter"}}
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})

    //for some reason state doesn't update in time, so create deep copy to pass through
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }

  filterPa = (e) => {
    let val = e.target.value - 1
    let filterConds = {'pa': {"value":{"number":val,"comparator":">"},"type":"NumberFilter"}}
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})

    //for some reason state doesn't update in time, so create deep copy to pass through
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }

  filterDa = (e) => {
    let val = e.target.value - 1
    let filterConds = {'da': {"value":{"number":val,"comparator":">"},"type":"NumberFilter"}}
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})

    //for some reason state doesn't update in time, so create deep copy to pass through
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }

  filterCf = (e) => {
    let val = e.target.value - 1
    let filterConds = {'cf': {"value":{"number":val,"comparator":">"},"type":"NumberFilter"}}
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})

    //for some reason state doesn't update in time, so create deep copy to pass through
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }

  filterUr = (e) => {
    let val = e.target.value - 1
    let filterConds = {'ur': {"value":{"number":val,"comparator":">"},"type":"NumberFilter"}}
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})

    //for some reason state doesn't update in time, so create deep copy to pass through
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }

  filterMRd = (e) => {
    let val = e.target.value - 1
    let filterConds = {'majestic_ref_domains': {"value":{"number":val,"comparator":">"},"type":"NumberFilter"}}
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})

    //for some reason state doesn't update in time, so create deep copy to pass through
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }

  filterARd = (e) => {
    let val = e.target.value - 1
    let filterConds = {'ahrefs_ref_domains': {"value":{"number":val,"comparator":">"},"type":"NumberFilter"}}
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})

    //for some reason state doesn't update in time, so create deep copy to pass through
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.refs.table.handleFilterData(newFilterState)
  }

  filterColumnFilter = (filterConds, result) => {
    console.log('Filter Conditions: ');
    for (const prop in filterConds) {
      console.log('Filter column= ' + prop + ', Filter value= ' + filterConds[prop]);
    }
    console.log('Result is:');
    for (let i = 0; i < result.length; i++) {
      console.log('Product: ' + result[i].id + ', ' + result[i].name + ', ' + result[i].price);
    }
  }

  loadCategories = () => {
    if(this.props.domainType =="tumblr"){
      return  _.uniqBy(this.props.tumblrData.map(domain => {
      return domain.category
      })).sort()
    }
    else{
      return  _.uniqBy(this.props.pbnData.map(domain => {
      return domain.category
      })).sort()
    }
  }

  onCategoryChange = (e) => {
    let category = e.target.value
    if(category == 'all') {
      category = ''
    }
    let filterConds = { category }
    let newFilterState = {...this.state, filter: {...this.state.filter, ...filterConds}}.filter
    this.setState({...this.state, filter: {...this.state.filter, ...filterConds}})
    this.refs.table.handleFilterData(newFilterState)
  }

  render() {
    return (
      <div>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='card'>
            <div className='card-header'>
              {this.props.domainType =="tumblr" ? 'Tumblrs' : 'Expired Domains'} for sale
            </div>
            <div className='container-fluid'>
              <div className='row filter-row'>
                <div id="table-filters">
                  <div className='card card-block'>
                    <form className='form'>
                      <div className='row'>
                        <div className='col-sm-6'>
                            <label><b>Minimum Value: </b></label>
                        </div>
                        <div className='col-sm-6'>
                            <label><b>Categories: </b></label>
                        </div>
                      </div>
                      <div className='row'>
                      <div className='col-sm-2'>
                      <div className="form-group row">
                              <label className='form-control-label col-sm-4' htmlFor="pa_filter">PA</label>
                              <div className='col-sm-8'>
                                <input type="number" className="form-control" id="pa_filter" placeholder="PA" onChange={this.filterPa} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className='form-control-label col-sm-4' htmlFor="ur_filter">DA</label>
                              <div className='col-sm-8'>
                                <input type="number" className="form-control" id="ur_filter" placeholder="DA" onChange={this.filterDa} />
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-2'>
                            <div className="form-group row">
                              <label className='form-control-label col-sm-4' htmlFor="tf_filter">TF</label>
                              <div className='col-sm-8'>
                                <input type="number" className="form-control" id="tf_filter" placeholder="TF" onChange={this.filterTf} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className='form-control-label col-sm-4' htmlFor="cf_filter">CF</label>
                              <div className='col-sm-8'>
                                <input type="number" className="form-control" id="cf_filter" placeholder="CF" onChange={this.filterCf} />
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-2'>
                          <div className="form-group row">
                              <label className='form-control-label col-sm-4' htmlFor="ur_filter">UR</label>
                              <div className='col-sm-8'>
                                <input type="number" className="form-control" id="ur_filter" placeholder="UR" onChange={this.filterUr} />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className='form-control-label col-sm-4' htmlFor="da_filter">RD</label>
                              <div className='col-sm-8'>
                                <input type="number" className="form-control" id="rd_filter" placeholder="RD" onChange={this.filterMRd} />
                              </div>
                            </div>
                          </div>
                          <div className='col-sm-6'>
                            <div className="form-group row">
                                <label className='form-control-label col-sm-4 col-xl-3'>Main Category</label>
                                <div className='col-sm-8 col-xl-9'>
                                  <CategorySelectBox categories={this.loadCategories()} onChange = {this.onCategoryChange}/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className='form-control-label col-sm-4 col-xl-3'>Price</label>
                                <div className='col-sm-8 col-xl-9'>
                                  <input type="text" id="price-filter-slider" name="Price Filter" value='' />
                                </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            {!this.props.isLoading ? <BootstrapTable data={this.props.domainType=="tumblr" ? this.props.tumblrData : this.props.pbnData}
              sortable={true}
              pagination={true}
              search={false}
              selectRow={this.selectRowProp}
              options={this.optionsProp}
              exportCsv={true}
              condensed={true}
              hover={true}
              paginationShowsTotal={ true }
              className="table" id="table" ref='table'>
              <TableHeaderColumn dataField="_id" hidden={true} isKey={true} >
              </TableHeaderColumn>
              <TableHeaderColumn  dataSort={true} dataField="pa" width='80'>
                <em className="pa-header">PA</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='da' width="80" hidden={hideColumn}>
                <em className="da-header">DA</em>
              </TableHeaderColumn>
              <TableHeaderColumn  dataSort={true} dataField="tf" width='80'>
                <em className="tf-header">TF</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="cf" width='80'>
                <em className="cf-header">CF</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="ur" width='80'>
                <em className="ur-header">UR</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="majestic_ref_domains" width='80'>
                <em className="ur-header">RD</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="category" width="140">
                <em className="category-header">Main Category</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="sub_category" columnClassName="hidden-md-down" className="hidden-md-down" width="140">
                <em className="category-header">Sub Category</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="price" dataFormat={this.formatToUsd} width='60'>
                <em className="price-header">Price</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField='last_date_whoischeck' columnClassName="hidden-md-down" className="hidden-md-down"  dataFormat={this.dateFormatter} width="160" hidden={hideColumn}>
                <em className="last-updated">Last Updated</em>
              </TableHeaderColumn>
            </BootstrapTable> : <LoadingIcon />}
          </div>
        </div>
        </div>
        <div className='row'>
        <div className='container'>
        <div className='col-sm-2 col-sm-offset-10'>
          <div className="checkoutBox">
            <div className="card">
              <div className='card-header'>
                Checkout
              </div>
              <div className="card-block">
                <button className='checkout-btn btn btn-primary' onClick={this.getSelectedRowKeys}><i className='fa fa-plus'></i> Add To Cart</button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      </div>
      )
    }
  }


const CategorySelectBox = (props) => {
  return (
    <select className='c-select' onChange={props.onChange}>
    <option value='all'>All</option>
      {props.categories.map(category => {
        return (<option key={category} value={category}>{category}</option>)
      })}
    </select>
  )
}

function mapStateToProps(state) {
  return {
    storeData: domainSelector(state),
    tumblrData: tumblrSelector(state),
    pbnData: pbnSelector(state),
    isLoading: state.app.loading,
    message: state.app.notie,
    message_delay: state.app.notie_delay,
    message_type: state.app.notie_type,
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps, actions)(TableView)