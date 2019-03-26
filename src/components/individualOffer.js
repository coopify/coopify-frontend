
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { resetError, attemptPublishOffer } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import styles from '../css/profile.scss';
import { Button, Input, Row, Col } from 'react-bootstrap';
import Switch from "react-switch";
import Protected from './protected';
import { Link } from 'react-router-dom';
import {loadScript} from "@pawjs/pawjs/src/utils/utils";

import StepZilla from "react-stepzilla";
import {loadStyle} from "@pawjs/pawjs/src/utils/utils";
import BasicData from './offerCreation/basicData.js';
import ExchangeMethod from './offerCreation/exchangeMethod.js';


export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
}))

class IndividualOffer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {}
    };
    this.handleChangeStep1 = this.handleChangeStep1.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChangeStep2 = this.handleChangeStep2.bind(this);
    this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
  }

  notify(message, isError){
    const {dispatch} = this.props;
    if(isError){
      toast.error(message);
      dispatch(resetError());
    }
    else{
      toast.success(message)
    }
  }

  componentDidMount(){
    //loadStyle("../css/stepZilla.css").then((res) => {console.log('cargo css')} ).catch(err => {console.log('fallo carga css: ' + err)});
  }

  handleChangeStep1(e){

    const offer = {...this.state.offer }
    offer.title = e.title;
    offer.description = e.description;
    offer.category = e.category;
    this.setState({offer});

  }

  handleImageChange(e){

    const offer = {...this.state.offer }
    const imgs = 
    [
      {
        url: e,
        default: true
      }
    ]
    offer.images = imgs;
    this.setState({offer});

  }

  handleChangeStep2(e){

    const offer = {...this.state.offer }
    offer.paymentMethod = e.paymentMethod;
    offer.prices = e.exchangeMethod;
    offer.startDate = e.startDate;
    offer.finishDate = e.endDate;
    offer.status = 'Started';
    this.setState({offer});

  }

  handleFinalSubmit(e){
    const offer = this.state.offer;
    const { dispatch, loggedUser } = this.props;

    const token = localStorage.getItem("token");
    offer.userId = loggedUser.id;
    this.setState({offer});
    
    const payload = {
      userToken: token,
      offer: offer
    }

    dispatch(attemptPublishOffer(payload));
  }


  render() {
    const { loading, error, loggedUser, balance } = this.props
    const { offer } = this.state
    const steps =
    [
      { 
        name: 'Basic data', 
        component: 
          <BasicData offer={offer} 
          onOfferInputChangeStep1={this.handleChangeStep1} //nothign, asociar evento onMount y que tomen de las props
          onOfferImageChange={this.handleImageChange}
          isReadOnly = "true">
          </BasicData>
      },
      {
        name: 'Exchange method', 
        component: 
          <ExchangeMethod offer={offer}
          onOfferInputChangeStep2={this.handleChangeStep2}
          onFinalStepSubmit={this.handleFinalSubmit}
          isReadOnly = "true">
          </ExchangeMethod>
      }
    ]

    return (
      <Protected>
      <GuestLayout>

      <div className='step-progress'>
        <StepZilla
              steps={steps}
              preventEnterSubmission={true}
              nextTextOnFinalActionStep={"Next"}
          />
      </div>

      </GuestLayout>
     </Protected>
    );
  }
}

export { IndividualOffer }