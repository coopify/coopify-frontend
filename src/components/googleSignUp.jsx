import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import LoadingScreen from 'react-loading-screen';
import { attemptSocialSignUpAction } from '../actions/user';
import GuestLayout from './guest-layout';
import SingletonPusher from './singletonPusher';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  error: state.user.error,
  loading: state.user.loading,
  socialUserDidSignUp: state.user.socialUserDidSignUp,
}))

class GoogleSignUp extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    gotCode: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: true,
    error: '',
    gotCode: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.verifyAuthCode();
  }

  verifyAuthCode() {
    const { dispatch } = this.props;
    let { gotCode } = this.props;
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');

    if (!gotCode && codeFromUrl) {
      gotCode = true;
      const payload = {
        code: codeFromUrl,
        provider: 'google',
      };
      dispatch(attemptSocialSignUpAction(payload));
    }
  }

  render() {
    const {
      error, loading, loggedUser, dispatch,
    } = this.props;
    const { socialUserDidSignUp } = this.state;
    if (socialUserDidSignUp && error.length > 0) {
      return <Redirect to="/signup" />;
    }
    if (socialUserDidSignUp && error.length === 0) {
      SingletonPusher.getInstance().createPusherChannel(loggedUser, dispatch);
      return <Redirect to="/home" />;
    }

    return (
      <GuestLayout>
        <LoadingScreen
          loading={loading}
          bgColor="rgba(255, 255, 255, .5)"
          spinnerColor="#BE1931"
          textColor="#BE1931"
             // logoSrc='/logo.png'
          text="Autenticando... Por favor, aguarde unos instantes."
        />
      </GuestLayout>
    );
  }
}

export { GoogleSignUp };
