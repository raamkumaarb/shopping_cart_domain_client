import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../actions'
import { browserHistory, Link} from 'react-router'
import * as utils from '../../../utils'
import LoadingIcon from '../../LoadingIcon'
// import '../../style/userOrders.scss'
var domainType='tumblr'

class Purchases extends React.Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.props.fetchUserItems('tumblr')
  }

  handleTabClick = (event) => {
    event.preventDefault()
    domainType = event.target.getAttribute('data-domainType')
    this.props.fetchUserItems(domainType)
  }

  tableSize = {
    height: window.innerHeight - 245
  }

  exportUserItems = () => {
    this.props.exportUserItems(domainType)
  }

  anyPurchasesAvailable = () => {
    return (!this.props.items.length)
  }
  render() {
    return (
      <div>
      <div className='card'>
        <div className='card-block'>
          <ul className="nav nav-tabs">
            <li className='nav-item'>
              <a className="nav-link active" data-toggle="tab" data-domainType='tumblr' onClick={this.handleTabClick} href="#tumblrs">Tumblrs</a>
            </li>
            <li className='nav-item'>
              <a className="nav-link" data-toggle="tab" data-domainType='pbn'onClick={this.handleTabClick} href="#pbns">Expired Domains</a>
            </li>
          </ul>
          </div>
        <div className="tab-content container-fluid purchase-panel-body">
          <div className='tab-pane active' id='tumblrs' role='tabpanel'>
          <div className='row purchases-page'>
          {!this.props.isLoading ? <BootstrapTable data={this.props.items}
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
              <TableHeaderColumn  dataSort={true} dataField="order_date" width='60'>
                <em className="pa-header">Date</em>
              </TableHeaderColumn>
              <TableHeaderColumn  dataSort={true} dataField="url" width='210'>
                <em className="tf-header">URL</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="pa" width='45'>
                <em className="ur-header">PA</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="tf" width='45'>
                <em className="ur-header">TF</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="cf" width='45'>
                <em className="ur-header">CF</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="ur" width='45'>
                <em className="ur-header">UR</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="category" width='100'>
                <em className="category-header">Main Category</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="sub_category" width='100'>
                <em className="subcategory-header">Sub Category</em>
              </TableHeaderColumn>
            </BootstrapTable> : <LoadingIcon />}
      </div>
      </div>
          <div className='tab-pane' id='pbns' role='tabpanel'>
           <div className='row purchases-page'>
            {!this.props.isLoading ? <BootstrapTable data={this.props.items}
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
              <TableHeaderColumn  dataSort={true} dataField="order_date" width='60'>
                <em className="pa-header">Date</em>
              </TableHeaderColumn>
              <TableHeaderColumn  dataSort={true} dataField="url" width='210'>
                <em className="tf-header">URL</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="pa" width='45'>
                <em className="ur-header">PA</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="tf" width='45'>
                <em className="ur-header">TF</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="cf" width='45'>
                <em className="ur-header">CF</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="ur" width='45'>
                <em className="ur-header">UR</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="category" width='100'>
                <em className="category-header">Main Category</em>
              </TableHeaderColumn>
              <TableHeaderColumn dataSort={true} dataField="sub_category" width='100'>
                <em className="category-header">Sub Category</em>
              </TableHeaderColumn>
            </BootstrapTable> : <LoadingIcon />}
            </div>
          </div>
          <hr />
        <div className='row export-buttons-row'>
          <div className='col-sm-12'>
            <button className='btn btn-success btn-small' onClick={this.exportUserItems} disabled={this.anyPurchasesAvailable()}>Export All</button>
          </div>
        </div>
        </div>
      </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  let loadingState = { isLoading: state.app.loading}
  if(!state.user.items) {
    return {...loadingState, items: []}
  }
  let items = state.user.items.map(order => {
    return {...order, order_date: utils.formatMongoDate(order.order_time)}
  })
  return { ...loadingState, items }
}

export default connect(mapStateToProps, actions)(Purchases)