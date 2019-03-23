

import React from 'react';
import { attemptSignUpAction } from '../../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';

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
      userDidSignUp: false
    };
  }


  handleSubmit(e) {
    if (e && e.preventDefault) { //Evita refresh al pepe
      e.preventDefault();
    }
    const { dispatch } = this.props;
    const signUpData = new FormData(e.target);

    const name = signUpData.get('name');
    const email = signUpData.get('email');
    const password = signUpData.get('password');
    const repeatedPassword = signUpData.get('repeatPassword');

    const userSignUpData = 
    {
      name: name,
      email: email,
      password: password,
      repeatedPassword: repeatedPassword
    };

    dispatch(attemptSignUpAction(userSignUpData));
  }

   async handleSocialSignUp(e) {
    const socialSelected = e.target.value;
    const response = await getUrlSocialAPICall(socialSelected);
    const url = response.data;
    window.location = url;
  }

  render() {
    const {error, userDidSignUp} = this.props
    const placeHolderDate = new Date(Date.now()).toISOString().substring(0,10);
    if(error.length > 0) this.notify(error, true)

    return (
        <div className="columns is-centered p-t-xl p-r-md p-l-md">   
        <div className="column is-half">
          <h1 className="title">Exchange Method</h1>
          
          <Form>

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
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Coopi"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
      </Col>
    </Form.Group>
  </fieldset>

    <fieldset>
    <Form.Group as={Row}>
    <Form.Label as="legend" column sm={6} style={{textAlign:"left"}}>
        Exchange instance
    </Form.Label>
    </Form.Group>

    <Form.Group as={Row}>
      <Col sm={4}>
        <Form.Check
          type="checkbox"
        />
      </Col>
      <Form.Label as="legend" column sm={4}>
        Hour
      </Form.Label>
      <Col sm={4}>
      <Form.Control type="number" placeholder="0" />
    </Col>

      <Col sm={4}>
        <Form.Check
          type="checkbox"
        />
      </Col>
      <Form.Label as="legend" column sm={4}>
        Session
      </Form.Label>
      <Col sm={4}>
      <Form.Control type="number" placeholder="0" />
    </Col>

      <Col sm={4}>
        <Form.Check
          type="checkbox"
        />
      </Col>
      <Form.Label as="legend" column sm={4}>
        Final product
      </Form.Label>
      <Col sm={4}>
      <Form.Control type="number" placeholder="0" />
    </Col>
    </Form.Group>
    </fieldset>

  <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      Start Date
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="date" value={placeHolderDate}/>
    </Col>
  </Form.Group>

    <Form.Group as={Row} controlId="formHorizontalEmail">
    <Form.Label column sm={2}>
      End Date
    </Form.Label>
    <Col sm={10}>
      <Form.Control type="date" value={placeHolderDate} />
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