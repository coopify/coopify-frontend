

import React from 'react';
import { attemptSignUpAction } from '../../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import _ from 'lodash';
import { BARTER_PAYMENT, COOPI_PAYMENT, HOUR_EXCHANGE, SESSION_EXCHANGE, PRODUCT_EXCHANGE } from './offerEnums';

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  userDidSignUp: state.userDidSignUp
}))

class ExchangeMethod extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    userDidSignUp: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    userDidSignUp: false
  };

  onLoginRedirectUrl = '/home';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      userDidSignUp: false,
      showEI: false,
      showHours: false,
      showSessions: false,
      showFinalProduct: false,
    };
  }

  handleInputChange(e){

    const isRadioButton = e.target.type == "radio";
    const isCheckbox = e.target.type == "checkbox";

      if(isRadioButton){
        const canShow = e.target.id == COOPI_PAYMENT;
        this.setState({showEI : canShow});
      }
      if(isCheckbox){

          if(e.target.name == HOUR_EXCHANGE){
            this.setState({showHours: e.target.checked })
          }

          else if(e.target.name == SESSION_EXCHANGE){
            this.setState({showSessions: e.target.checked })
          }

          else if(e.target.name == PRODUCT_EXCHANGE){
              this.setState({showFinalProduct: e.target.checked })
        }
      }

    const data = new FormData(e.target.form);
    
    const { showHours, showSessions, showFinalProduct, showEI } = this.state;

    const hoursCoopi = data.get('hoursCoopi');
    const sessionsCoopi = data.get('sessionsCoopi');
    const productCoopi = data.get('productCoopi');

    const paymentMethod = showEI ? COOPI_PAYMENT : BARTER_PAYMENT;

    const exchangeMethod =
     [
         {selected: showHours ,frequency: HOUR_EXCHANGE, price: hoursCoopi},
         {selected: showSessions ,frequency: SESSION_EXCHANGE, price: sessionsCoopi},
         {selected: showFinalProduct ,frequency: PRODUCT_EXCHANGE, price: productCoopi}
     ];
    const startDate = data.get('startDate');
    const endDate = data.get('endDate');

    const newOffer =
    {
        paymentMethod: paymentMethod,
        exchangeMethod: exchangeMethod,
        startDate: startDate,
        endDate: endDate
    };

    this.props.onOfferInputChangeStep2(newOffer);
  }

  handleFinalSubmit(e){
    if (e && e.preventDefault) {
        e.preventDefault();
      }
    this.props.onFinalStepSubmit(e);
  }

  render() {
    const {error, offer} = this.props
    const showEI = this.state.showEI ? 'block' : 'none';
    const showHours =this.state.showHours ? 'block' : 'none';
    const showSessions = this.state.showSessions  ? 'block' : 'none';
    const showFinalProduct = this.state.showFinalProduct  ? 'block' : 'none';

    const placeHolderStartDate = offer.startDate ? offer.startDate.substring(0,10) : new Date(Date.now()).toISOString().substring(0,10);
    const placeHolderEndDate = offer.finishDate ? offer.finishDate.substring(0,10) : new Date(Date.now()).toISOString().substring(0,10);

    return (
        <div className="columns is-centered p-t-xl p-r-md p-l-md">   
        <div className="column is-half">
          <h1 className="title">Exchange Method</h1>
          
          <Form onSubmit={e => this.handleFinalSubmit(e)}>

  <fieldset>

    <Form.Group as={Row}>
        <Form.Label as="legend" column sm={6} style={{textAlign:"left"}}>
        Payment instance
        </Form.Label>
    </Form.Group>

    <Form.Group as={Row}>
      <Col sm={4}>
        <Form.Check
          type="radio"
          label="Barter"
          name="formHorizontalRadios"
          id={BARTER_PAYMENT}
          onChange={e => this.handleInputChange(e)}
        />
        <Form.Check
          type="radio"
          label="Coopi"
          name="formHorizontalRadios"
          id={COOPI_PAYMENT}
          onChange={e => this.handleInputChange(e)}
        />
      </Col>
    </Form.Group>
  </fieldset>

    <fieldset style={{display: showEI}}>
    <Form.Group as={Row}>
    <Form.Label as="legend" column sm={6} style={{textAlign:"left"}}>
        Exchange instance
    </Form.Label>
    </Form.Group>

    <Form.Group as={Row}>
      <Col sm={4}>
        <Form.Check
          type="checkbox"
          name={HOUR_EXCHANGE}
          onChange={e => this.handleInputChange(e)}
        /> Hour
      </Col>
      <Col sm={4} style={{display: showHours}}>
      <Form.Control type="number" value={offer.prices != undefined ? offer.prices[0].price : 0} name="hoursCoopi" onChange={e => this.handleInputChange(e)}/>
    </Col>
    </Form.Group>

     <Form.Group as={Row}>
      <Col sm={4}>
        <Form.Check
          type="checkbox"
          name={SESSION_EXCHANGE}
          onChange={e => this.handleInputChange(e)}
        /> Session
      </Col>
      <Col sm={4} style={{display: showSessions}}>
      <Form.Control type="number" value={offer.prices !=undefined ? offer.prices[1].price : 0} name="sessionsCoopi" onChange={e => this.handleInputChange(e)}/>
    </Col>
    </Form.Group>

 <Form.Group as={Row}>
      <Col sm={4}>
        <Form.Check
          type="checkbox"
          name={PRODUCT_EXCHANGE}
          onChange={e => this.handleInputChange(e)}
        /> Final Product
      </Col>
      <Col sm={4} style={{display: showFinalProduct}}>
      <Form.Control type="number" value={offer.prices != undefined ? offer.prices[2].price : 0} name="productCoopi" onChange={e => this.handleInputChange(e)}/>
    </Col>
    </Form.Group>
    </fieldset>

  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Start Date
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="date" name="startDate" value={placeHolderStartDate} onChange={e => this.handleInputChange(e)}/>
    </Col>
  </Form.Group>

    <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      End Date
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="date" name="endDate" value={placeHolderEndDate} onChange={e => this.handleInputChange(e)}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row}>
    <Col sm={{ span: 10, offset: 2 }}>
      <Button type="submit">Create</Button>
    </Col>
  </Form.Group>
</Form>;
</div>
      </div>

    );
  }
}

export { ExchangeMethod }