import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import { attemptSocialSignUpAction } from '../actions/user';
import SingletonPusher from './singletonPusher';
import GuestLayout from './guest-layout';

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
    error: PropTypes.string,
    gotCode: PropTypes.bool,
    socialUserDidSignUp: PropTypes.bool,
    
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    error: '',
    gotCode: false,
    socialUserDidSignUp: false,
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
      error, loggedUser, dispatch, socialUserDidSignUp,
    } = this.props;

    if (socialUserDidSignUp && error.length > 0) {
      return <Redirect to="/signup" />;
    }

    if (socialUserDidSignUp && error.length === 0) {
      SingletonPusher.getInstance().createPusherChannel(loggedUser, dispatch);
      return <Redirect to="/home" />;
    }

    // This screen has one responsability, to redirect the user after completing the OAuth flow.
    return (
      <GuestLayout />
    );
  }
}

export { GoogleSignUp };
