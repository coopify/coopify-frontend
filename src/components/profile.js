
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie';
import Authenticator from './fake-authenticator';
import { attemptLoginAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
import '../css/form-elements.css'
import {Link} from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import styles from '../css/profile.scss';

export default @connect(state => ({
  loggedUser: state.user, //el state.user es el nuevo state que devuelve el reducer, y loggedUser el definido aca, se uso para mapear ambos y actualziarlos
  error: state.error,
  loading: state.loading
}))

class Profile extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: ''
    };
  }


  handleSubmit(e) {
    if (e && e.preventDefault) { //Evita refresh al pepe
      e.preventDefault();
    }
    const { dispatch } = this.props;
    const loginData = new FormData(e.target);
    const username = loginData.get('username');
    const password = loginData.get('password');

    const userLoginData = 
    {
      email: username,
      password: password
    };

    dispatch(attemptLoginAction(userLoginData));
  }

  render() {
    const { loading, error, loggedUser } = this.props
    if(error.length > 0) this.notify(error, true)

    return (
      <GuestLayout>
        <div className={styles.container}>
        <form onSubmit={this.handleSubmit(e)}>
          <Row>
            <Col sm={2}>
              <img className={styles.picture} src={loggedUser.pictureURL} />
            </Col>
            <Col sm={5}>
              <TextInput field={loggedUser.name} placeholder={formatMessage(messages.loggedUser.name.placeholder)}>
                <FormErrorMessages field={loggedUser.name} minLength={validations.loggedUser.name.minLength} />
              </TextInput>        

              <TextInput field={loggedUser.email} type="email" placeholder={formatMessage(messages.loggedUser.email.placeholder)}>
                <FormErrorMessages field={loggedUser.email} />
              </TextInput>

              <Input type="checkbox" label={formatMessage(messages.emailVerified.label)} {...emailVerified} />        

            </Col>
            <Col sm={5}>
              <Row>
                <Col sm={3}>
                  <TextInput field={age} type="number" placeholder={formatMessage(messages.age.placeholder)}>
                    <FormErrorMessages field={age} min={validations.age.min} max={validations.age.max} />
                  </TextInput>
                </Col>
                <Col sm={9}>
                  <HorizontalRadioGroup field={gender} values={genderValues} />
                </Col>
              </Row>
              <DropDown label={formatMessage(messages.locale.label)} field={locale} values={locales} />
              <Input type="textarea" label={formatMessage(messages.notes.label)} {...notes} />
            </Col>
          </Row>
          <Row>
            <Col sm={2} />
            <Col sm={10}>
              <Button
                bsStyle="primary"
                onClick={this.onUpdateClick}
                disabled={this.isUpdateButtonDisabled()}
              >
                <FormattedMessage {...messages.save.label} />
              </Button>&nbsp;
              {
                // Need to include the preceding non-breaking space, because when React renders the HTML,
                // there is no gap in the markup between the buttons - which results in the buttons being
                // flush up against each other.
              }
              <Button
                bsStyle="default"
                onClick={this.onResetClick}
                disabled={this.isResetButtonDisabled()}
              >
                <FormattedMessage {...messages.reset.label} />
              </Button>
            </Col>
          </Row>
        </form>
        </div>
      </GuestLayout>
    );
  }
}

export { Profile }