import React from 'react'
import { Link } from 'react-router'

const LandingFooter = (props) => {
  return (
    <div id='landing-footer'>
      <footer className="site-footer">
        <section className="footer-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
               {/* <header className="footer-title">About us</header>
                <p>SESprout is a platform that distributes high quality SEO-related products in an efficient, clean interface. We believe the SEO industry lacks a marketplace with high levels of client protection, quality of services rendered and competetive pricing; SESprout aims to bridge this gap.</p>*/}
              </div>
            </div>
          </div>
        </section>

        <section className="footer-bottom">
          <div className="container">
            <div className='row'>
              <div className='col-sm-4 col-sm-offset-4'>
                <div className="copy">&copy; 2016 seSprout, all rights reserved</div>
              </div>
              <div className='col-sm-4 pull-right privacy-policy'>
                <Link to='/privacy'>Privacy Policy</Link>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </div>
  )
}

export default LandingFooter