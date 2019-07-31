import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper/lib/ReactIdSwiper.full';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import publishImg from '../assets/publish.png';
import negotiateImg from '../assets/negotiate.png';
import rateImg from '../assets/rate.png';
import noMoneyImg from '../assets/no-money.png';

export default @connect(state => ({

}))

class Splash extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {

    const userIsLogged = localStorage.getItem('loggedUser') != null;

    if (userIsLogged) {
      return <Redirect push={false} to={'/home'} />;
    }

    return (
      <div>
        <header class="masthead">
          <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
              <div class="col-lg-10 align-self-end">
                <h1 class="text-uppercase text-white font-weight-bold">Coopify</h1>
                <hr class="divider my-4" />
              </div>
              <div class="col-lg-8 align-self-baseline">
                <p class="text-white-75 font-weight-light mb-5">Welcome to Coopify! The service exchange platform for you</p>
                <Link to="/login" className="btn btn-light btn-landing-xl js-scroll-trigger">Get Started!</Link>
              </div>
            </div>
          </div>
        </header>

        <section class="page-section bg-primary" id="about">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8 text-center">
                <h2 class="text-white mt-0">We've got what you need!</h2>
                <hr class="divider light my-4" />
                <p class="text-white-50 mb-4">Coopify is a service exchange platform where users can publish and consume services without barriers.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="page-section" id="services">
          <div class="container">
            <h2 class="text-center mt-0">All your needs</h2>
            <hr class="divider my-4" />
            <div class="row">
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <img src={publishImg} />
                  <h3 class="h4 mb-2">Publish your service</h3>
                  <p class="text-muted mb-0">Publish your service and get to know yourself in the community</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <img src={negotiateImg} />
                  <h3 class="h4 mb-2">Negotiate with others</h3>
                  <p class="text-muted mb-0">Negotiate with different providers within an embedded chat</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <img src={rateImg} />
                  <h3 class="h4 mb-2">Review a service</h3>
                  <p class="text-muted mb-0">Review both a service received and the provider</p>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-center">
                <div class="mt-5">
                  <img src={noMoneyImg} />
                  <h3 class="h4 mb-2">No real money</h3>
                  <p class="text-muted mb-0">All transactions are done via virtual coins -Coopi- regulated with blockchain technologies</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="page-section bg-primary" id="contact">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-8 text-center">
                <h2 class="text-white mt-0">Contact us</h2>
                <hr class="divider light my-4" />
                <p class="text-white-50 text-muted mb-5">Send us an email and we will get back to you as soon as possible!</p>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 mr-auto text-center contact-mail">
                <i class="fa fa-envelope fa-3x mb-3 text-muted"></i>
                <a class="d-block" href="mailto:hello@createthrive.com">hello@createthrive.com</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }
}

export { Splash }
