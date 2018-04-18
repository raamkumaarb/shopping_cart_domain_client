import React from 'react'
import {reduxForm} from 'redux-form'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import swal from 'sweetalert'
import LoadingIcon from '../../LoadingIcon'
import Alert from '../../AlertBox'
import * as actions from '../../../actions'
import { notie } from '../../../utils'
import config from '../../../config.js'

class CreditSystem extends React.Component {
  constructor(props) {
    super(props)
  }

  handleFormSubmit = (formProps) => {
       console.log('formProps', formProps);
      this.showCheckoutMessage(formProps.creditAmount)

  }

  showCheckoutMessage = (creditAmount) => {
    let message = {}
    message.html = true
    message.text = config.MESSAGEDATA.TERMS_AND_CONDITIONS
    message.title = config.MESSAGEDATA.TERMS_AND_CONDITIONS_TITLE
    message.confirmButtonClass = 'success'
    message.confirmButtonText = 'Deposit'
    message.showCancelButton = true
    message.cancelButtonText = "Cancel"
    message.closeOnConfirm = false
    message.closeOnCancel = true
    message.showLoaderOnConfirm = true
    swal(message, (isConfirm) => {
      if(isConfirm) {
        swal("Redirecting", config.MESSAGEDATA.PAYPAL_REDIRECT_INFO, "success")
        this.props.processCredit(creditAmount)
      }
    })
  }

  render() {
    const {handleSubmit, fields: { creditAmount }} = this.props
  return (
        <section className='card'>
          <div className='card-header'>
            My Wallet
          </div>
          <div className='card-block' id='user-details'>
            <div className='col-sm-6 col-xl-4'>
          <form onSubmit={handleSubmit(this.handleFormSubmit)}>
            <fieldset className="form-group row">
                <div className={(creditAmount.touched && creditAmount.error) ? 'form-group form-group-error' : 'form-group'}>
                  <input type="text" {...creditAmount} className="form-control wallet" id="creditAmount" placeholder="Amount in Dollar" required/>
                  {creditAmount.touched && creditAmount.error &&<small className="text-muted">{creditAmount.error}</small>}
                </div>
            </fieldset>
            <fieldset className="form-group row">
              <button type="submit" className="btn btn-rounded">Deposit</button>
            </fieldset>
          </form>
        </div>
        <div className='col-sm-6 col-xl-4 walletAmount'>
             <h3>Current Balance : ${this.props.amount}</h3>
           </div>
        </div>

      </section>
  )
}
}

function validate(formProps) {
  const errors = {}
  let walletRegex = new RegExp("^(?=.*[0-9])")

  if(!formProps.creditAmount) {
    errors.creditAmount = 'Please enter your wallet amount'
  }

  if(!walletRegex.test(formProps.creditAmount) || formProps.creditAmount == 0)
    errors.creditAmount = 'Please enter valid amount.'

  return errors
}

export default reduxForm({
  form: 'credit',
  fields: ['creditAmount'],
  validate
}, null,actions)(CreditSystem)