
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import { attemptSocialSignUpAction, attemptSyncFB } from '../actions/user';
import SingletonPusher from './singletonPusher';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  error: state.user.error,
  loading: state.user.loading,
  socialUserDidSignUp: state.user.socialUserDidSignUp,
}))

class FacebookSignUp extends React.Component {
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
    gotCode: false,
    error: '',
    socialUserDidSignUp: false,
  };

  onLoginRedirectUrl = '/dashboard';

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.verifyAuthCode();
  }

  verifyAuthCode() {
    let { gotCode } = this.props;
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('code');
    const userToken = localStorage.getItem('token');

    if (!gotCode && codeFromUrl) {
      gotCode = true;

      if (userToken && userToken.length > 0) {
        this.handleSyncFB(codeFromUrl);
      } else {
        this.handleCreateNewUser(codeFromUrl);
      }
    }
  }

  handleSyncFB(code) {
    const { dispatch } = this.props;
    const userToken = localStorage.getItem('token');
    const payload = {
      userToken,
      fbToken: code,
    };

    dispatch(attemptSyncFB(payload));
  }

  handleCreateNewUser(code) {
    const { dispatch } = this.props;
    const payload = {
      code,
      provider: 'facebook',
    };
    dispatch(attemptSocialSignUpAction(payload));
  }

  render() {
    const {
      error, loggedUser, dispatch, socialUserDidSignUp,
    } = this.props;

    if (socialUserDidSignUp && error.length === 0) {
      SingletonPusher.getInstance().createPusherChannel(loggedUser, dispatch);
    }

    // This screen has one responsability, to redirect the user after completing the OAuth flow.
    return (
      socialUserDidSignUp && error.length === 0 ? <Redirect to="/home" /> : <Redirect to="/signup" />
    );
  }
}

export { FacebookSignUp };
