import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import StoreItem from './StoreItem'
import CheckoutBox from './CheckoutBox'

class FormView extends React.Component {

  renderAlert = () => {
    if(this.props.message) {
      return (
        <Alert type='success'>
          {this.props.message}
        </Alert>
      )
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              Buy Form
            </div>
            <div className="card-block">
              <form>
                <fieldset className="form-group">
                  <label for="category"><b>Select Category</b></label>
                  <select className="form-control" id="category">
                    <option value="all">All</option>
                    <option value="arts">Arts</option>
                    <option value="adult">Adult</option>
                    <option value="business">Business</option>
                    <option value="computers">Computers</option>
                    <option value="games">Games</option>
                    <option value="health">Health</option>
                    <option value="home">Home</option>
                    <option value="news">News</option>
                    <option value="reference">Reference</option>
                    <option value="regional">Regional</option>
                    <option value="science">Science</option>
                    <option value="shopping">Shopping</option>
                    <option value="society">Society</option>
                    <option value="sports">Sports</option>
                  </select>
                </fieldset>
                <div className="form-group row">
                  <label className="col-sm-2"><b>Metrics</b></label>
                  <div className="col-sm-5">
                    <StoreItem value='tf5' text='TF 5+' price='3'/>
                    <StoreItem value='tf10' text='TF 10+'price='6'/>
                    <StoreItem value='tf15' text='TF 15+'price='10'/>
                    <StoreItem value='tf20' text='TF 20+'price='18'/>
                  </div>
                  <div className="col-sm-5">
                    <StoreItem value='ur10' text='UR 10+'price='1'/>
                    <StoreItem value='ur12' text='UR 12+'price='3'/>
                    <StoreItem value='ur15' text='UR 15+'price='10'/>
                    <StoreItem value='ur20' text='UR 20+'price='18'/>
                  </div>
                </div>
                <div className='row'>
                  <button type="submit" className="btn btn-primary">Check out &raquo;</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <CheckoutBox />
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return { message: state.store.message }
}


export default connect(mapStateToProps, actions)(FormView)