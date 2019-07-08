
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import { Loading } from './loading';
import { attemptSocialSignUpAction, attemptSyncFB } from '../actions/user';
import GuestLayout from './guest-layout';
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
    loading: PropTypes.bool,
    error: PropTypes.string,
    gotCode: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: true,
    gotCode: false,
    error: '',
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
        <Loading/>
      </GuestLayout>
    );
  }
}

export { FacebookSignUp };
