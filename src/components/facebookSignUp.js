
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie';
import Authenticator from './fake-authenticator';
import { attemptSocialSignUpAction } from '../actions/user';
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
import LoadingScreen from 'react-loading-screen';

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading
}))

class FacebookSignUp extends React.Component {

    componentDidMount(){
        this.verifyAuthCode();
    }

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
    loading: true,
    error: ''
  };

  onLoginRedirectUrl = '/dashboard';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: true,
      error: ''
    };
  }

  verifyAuthCode() {

    const { dispatch } = this.props;
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    const payload = {
        code: codeFromUrl,
        provider: 'facebook'
    };

    dispatch(attemptSocialSignUpAction(payload));
  }

  render() {
    const { loading, error } = this.props
    if(loading && error.length > 0){
        //return <Redirect to='/signup'/>
    }
    else if(loading && error.length == 0){
        //return <Redirect to='/login'/>
    }

    return (
      <GuestLayout>
          <LoadingScreen
              loading={loading}
              bgColor='#f1f1f1'
              spinnerColor='#9ee5f8'
              textColor='#676767'
             // logoSrc='/logo.png'
              text= {"Autenticando... Por favor, aguarde unos instantes."}> 
            </LoadingScreen>
      </GuestLayout>
    );
  }
}

export { FacebookSignUp }