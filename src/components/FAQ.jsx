import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Alert from './AlertBox'
import Helmet from 'react-helmet'
// import '../style/landingPage.scss'

class FAQ extends React.Component {


  render() {
    return (
      <div>
      <Helmet title='SESprout: FAQ' />
          <section className="box-typical faq-page">
            <section className="faq-page-questions">
              <h2>Common questions</h2>
              <div className="row">
                <div className="col-md-6">
                  <article className="faq-page-quest">
                    <header className="faq-page-quest-title">
                      <a href="#">Can I export all of my accounts?</a>
                    </header>
                    <p>Yes, you can export all accounts by going to your <Link to='/dashboard'>dashboard</Link> and selecting the "Purchased Items" tab. At the button is a button to export your accounts in .csv format. </p>
                  </article>
                </div>
                <div className="col-md-6">
                  <article className="faq-page-quest">
                    <header className="faq-page-quest-title">
                      <a href="#">Why is my order processing? I thought these were delivered instantly?</a>
                    </header>
                    <p>Some orders require additional verification to prevent fraud. All orders will be processed within 24 hours. </p>
                  </article>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <article className="faq-page-quest">
                    <header className="faq-page-quest-title">
                      <a href="#">Why is there a cap on how much I can buy?</a>
                    </header>
                    <p>We need to verify additional information if you reach a certain cap to prevent fraud.</p>
                  </article>
                </div>
                <div className="col-md-6">
                  <article className="faq-page-quest">
                    <header className="faq-page-quest-title">
                      <a href="#">How can I contact you?</a>
                    </header>
                    <p>Support@sesprout.com or via live support.</p>
                  </article>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <article className="faq-page-quest">
                    <header className="faq-page-quest-title">
                      <a href="#">How can I tell when my order is processed?</a>
                    </header>
                    <p>By going to your <Link to='/dashboard'>dashboard </Link> and selecting the "Orders" tab.</p>
                  </article>
                </div>
              </div>
              </section>
              <section className="faq-page-questions">
              <h2>Filters Explained</h2>
              <div className='row'>
                <div className="col-md-6">
                  <article className="faq-page-quest">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Filter</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>TF</td>
                          <td>Trust Flow, a metric created by Majestic</td>
                        </tr>
                        <tr>
                          <td>CF</td>
                          <td>Citation Flow, a metric created by Majestic</td>
                        </tr>
                        <tr>
                          <td>UR</td>
                          <td>URL Rating, a metric created by Ahrefs</td>
                        </tr>
                        <tr>
                          <td>RD</td>
                          <td>Majestic Referring Domains, the number of referring domains as reported by Majestic</td>
                        </tr>
                        </tbody>
                    </table>
                  </article>
                </div>
                <div className="col-md-6">
                  <article className="faq-page-quest">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Filter</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>A-RD</td>
                          <td>Ahrefs Reffering Domains, the number of referring domains as reported by Ahrefs</td>
                        </tr>
                        <tr>
                          <td>Main Category</td>
                          <td>Majestic determined primary category for the domain</td>
                        </tr>
                        <tr>
                          <td>Sub Category</td>
                          <td>Majestic determined secondary category for the domain</td>
                        </tr>
                        <tr>
                          <td>Price</td>
                          <td>Cost per account, generated by metrics</td>
                        </tr>
                        </tbody>
                    </table>
                  </article>
                </div>
              </div>
            </section>
          </section>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message }
}

export default connect(mapStateToProps, actions)(FAQ)