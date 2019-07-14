
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import StepZilla from 'react-stepzilla';
import { Loading } from './loading';
/* eslint-disable import/extensions */
/* eslint-disable import/no-named-as-default */
import BasicData from './offerCreation/basicData.jsx';
import ExchangeMethod from './offerCreation/exchangeMethod.js';
import Protected from './protected';
/* eslint-enable import/no-named-as-default */
/* eslint-disable import/extensions */
import { resetNotificationFlags, attemptPublishOffer } from '../actions/user';
import GuestLayout from './guest-layout';


export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  error: state.service.error,
  loading: state.service.loading,
  categories: state.service.categories,
}))

class OfferCreation extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
      categories: [''],
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
    const { offer } = this.state;
    offer.title = e.title;
    offer.description = e.description;
    this.setState({ offer });
  }

  handleCategoriesChange(e) {
    const { offer } = this.state;
    const newCategories = e;
    offer.categories = newCategories;
    this.setState({ offer });
  }

  handleImageChange(e) {
    const { offer } = this.state;
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
    const { offer } = this.state;
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

  handleFinalSubmit() {
    const { offer } = this.state;
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
    const { offer } = this.state;
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

          <Loading>

            <div className="step-progress">
              <StepZilla
                steps={steps}
                preventEnterSubmission
                nextTextOnFinalActionStep="Next"
              />
            </div>
          </Loading>

        </GuestLayout>
      </Protected>
    );
  }
}

export { OfferCreation };
