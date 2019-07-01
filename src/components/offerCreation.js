
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  Button, Input, Row, Col,
} from 'react-bootstrap';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import { loadScript } from '@pawjs/pawjs/src/utils/utils';
import StepZilla from 'react-stepzilla';
import { loadStyle } from '@pawjs/pawjs/src/utils/utils';
import LoadingScreen from 'react-loading-screen';
import BasicData from './offerCreation/basicData.jsx';
import ExchangeMethod from './offerCreation/exchangeMethod.js';
import Protected from './protected';
import styles from '../resources/css/profile.scss';
import { resetNotificationFlags, attemptPublishOffer } from '../actions/user';
import GuestLayout from './guest-layout';


export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  categories: state.categories,
}))

class OfferCreation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
      categories: ['algo'],
    };
    this.handleChangeStep1 = this.handleChangeStep1.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleChangeStep2 = this.handleChangeStep2.bind(this);
    this.handleFinalSubmit = this.handleFinalSubmit.bind(this);
  }

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetNotificationFlags());
    } else {
      toast.success(message);
    }
  }

  handleChangeStep1(e) {
    const offer = { ...this.state.offer };
    offer.title = e.title;
    offer.description = e.description;
    this.setState({ offer });
  }

  handleCategoriesChange(e) {
    const offer = { ...this.state.offer };
    const newCategories = e;
    offer.categories = newCategories;
    this.setState({ offer });
  }

  handleImageChange(e) {
    const offer = { ...this.state.offer };
    const imgs = [
      {
        url: e,
        default: true,
      },
    ];
    offer.images = imgs;
    this.setState({ offer });
  }

  handleChangeStep2(e) {
    const offer = { ...this.state.offer };
    offer.paymentMethod = e.paymentMethod;
    offer.prices = e.exchangeMethod;
    offer.startDate = e.startDate;
    if (e.endDate !== '') { offer.finishDate = e.endDate; }
    offer.hourPrice = e.hourPrice;
    offer.sessionPrice = e.sessionPrice;
    offer.finalProductPrice = e.finalProductPrice;
    offer.exchangeMethod = e.exchangeMethod.filter(em => em.selected).map(em => em.frequency);
    offer.status = 'Started';
    offer.images = offer.images ? offer.images : [];
    this.setState({ ...this.state, offer });
  }

  handleFinalSubmit(e) {
    const offer = this.state.offer;
    const { dispatch, loggedUser } = this.props;

    const token = localStorage.getItem('token');
    offer.userId = loggedUser.id;
    this.setState({ offer });

    const payload = {
      userToken: token,
      offer,
    };

    dispatch(attemptPublishOffer(payload));
  }


  render() {
    const {
      loading, error, loggedUser, balance,
    } = this.props;
    const { offer, categories } = this.state;
    const steps = [
      {
        name: 'Basic data',
        component:
  <BasicData
    offer={offer}
    onOfferInputChangeStep1={this.handleChangeStep1}
    onOfferImageChange={this.handleImageChange}
    onCategoriesChange={this.handleCategoriesChange}
    isReadOnly={false}
  />,
      },
      {
        name: 'Exchange method',
        component:
  <ExchangeMethod
    offer={offer}
    onOfferInputChangeStep2={this.handleChangeStep2}
    onFinalStepSubmit={this.handleFinalSubmit}
    isReadOnly={false}
  />,
      },
    ];

    return (
      <Protected>
        <GuestLayout>

          <LoadingScreen
            loading={this.props.loading}
            bgColor={global.loadingBgColor}
            spinnerColor={global.loadingFontColor}
            textColor={global.loadingFontColor}
            text="Loading..."
          >

            <div className="step-progress">
              <StepZilla
                steps={steps}
                preventEnterSubmission
                nextTextOnFinalActionStep="Next"
              />
            </div>
          </LoadingScreen>

        </GuestLayout>
      </Protected>
    );
  }
}

export { OfferCreation };
