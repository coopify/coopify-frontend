import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import { Link } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import LoadingScreen from 'react-loading-screen';
import Protected from './protected';
import SingletonPusher from './singletonPusher';
import { attemptLoginAction, attemptSocialLoginAction } from '../actions/user';
import GuestLayout from './guest-layout';
import ReactJoyride from 'react-joyride';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export default @connect(state => ({
  userDidLog: state.userDidLog,
  loggedUser: state.user, // el state.user es el nuevo state que devuelve el reducer, y loggedUser el definido aca, se uso para mapear ambos y actualziarlos
  error: state.error,
  loading: state.loading,
  userDidLog: state.userDidLog,
}))

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    userDidLog: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    userDidLog: false,
  };

  onLoginRedirectUrl = '/home';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      userDidLog: false,
    };
  }

  notify(message, isError) {
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }

  responseFacebook = (response) => {
    const { dispatch } = this.props;
    dispatch(attemptSocialLoginAction({ provider: 'facebook', facebookId: response.id }));
  }

  responseGoogle = (response) => {
    const { dispatch } = this.props;
    dispatch(attemptSocialLoginAction({ provider: 'google', googleId: response.googleId }));
  }

  errorGoogle = (response) => {
    console.log(response);
  }

  handleSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { dispatch } = this.props;
    const loginData = new FormData(e.target);
    const username = loginData.get('username');
    const password = loginData.get('password');

    const userLoginData = {
      email: username,
      password,
    };

    dispatch(attemptLoginAction(userLoginData));
  }

  render() {
    const {
      loading, error, loggedUser, userDidLog, dispatch,
    } = this.props;
    if (error.length > 0) this.notify(error, true);
    if (loading) {
      // show spinner
    } else {
      // hide spinner
    }
    if (userDidLog) {
      SingletonPusher.getInstance().createPusherChannel(loggedUser, dispatch);
      return <Redirect push={false} to={this.onLoginRedirectUrl} />;
    }

    const steps = [
      {
        target: '.traditional-login',
        content: 'This is the traditional log in...',
      },
      {
        target: '.social-login',
        content: 'Here you can log in with social networks...',
      },
      {
        target: '.btn-link-1-facebook',
        content: 'You can use your Facebook account...',
      },
      {
        target: '.btn-link-1-google-plus',
        content: 'Or you can use your Google account.',
      },
    ]

    return (
      <GuestLayout>

<ReactJoyride
          continuous
          steps={steps}
          run={true}
          showSkipButton
          styles={{
            options: {
              arrowColor: '#fff',
              backgroundColor: '#fff',
              beaconSize: 36,
              overlayColor: 'rgba(0, 0, 0, 0.5)',
              primaryColor: '#499be7',
              spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
              textColor: '#333',
              width: undefined,
              zIndex: 100,
            }
          }}
        />

        <LoadingScreen
          loading={this.props.loading}
          bgColor={global.loadingBgColor}
          spinnerColor={global.loadingFontColor}
          textColor={global.loadingFontColor}
          text="Loading..."
        >

          <div>
            <div style={{width: 'max-content', margin: 'auto'}}>
              <div className="box">

                <Avatar style={{margin: 'auto', backgroundColor: '#f50057'}}>
                  <LockOutlinedIcon />
              </Avatar>

              <h2 className="title">Log in</h2>

                <form onSubmit={e => this.handleSubmit(e)} className="traditional-login">

                  <div className="control controlIcon">              
                    <input
                      id="username"
                      name="username"
                      className="input"
                      type="text"
                      placeholder="Username"
                    />
                    <i class="fa fa-user"/>
                  </div>

                  <div className="control controlIcon">
                    <input
                      id="password"
                      name="password"
                      className="input"
                      type="password"
                      placeholder="Password"
                    />
                    <i class="fa fa-lock"/>
                  </div>

                  <div className="field is-grouped">
                    <div className="control" style={{width: "100%"}}>
                      <button type="submit" style={{width: "100%"}} className="button is-link">LOG IN</button>
                    </div>
                  </div>
                </form>

                <div className="social-login">

                  <div className="d-flex">
                    <hr className="my-auto flex-grow-1" />
                    <div className="px-4">or login with</div>
                    <hr className="my-auto flex-grow-1" />
                  </div>

                  <div className="social-login-buttons">

                    <FacebookLogin
                      appId={global.FB_APP_ID}
                      autoLoad={false}
                      ccsClass="btn btn-link-1 btn-link-1-facebook"
                      callback={this.responseFacebook}
                      render={renderProps => (
                        <button className="btn btn-link-1 btn-link-1-facebook" value="facebook" onClick={renderProps.onClick} style={{width: '100%', marginBottom: '3%'}}>
                          <i className="fa fa-facebook" />
                          {' '}
Facebook
                        </button>
                      )}
                    />

                    <GoogleLogin
                      clientId={global.GOOGLE_APP_ID}
                      autoLoad={false}
                      buttonText="Log In"
                      onSuccess={this.responseGoogle}
                      onFailure={this.errorGoogle}
                      render={renderProps => (
                        <button className="btn btn-link-1 btn-link-1-google-plus" value="google" onClick={renderProps.onClick} style={{width: '100%',  marginBottom: '3%'}}>
                          <i className="fa fa-google-plus" />
                          {' '}
Google
                        </button>
                      )}
                    />

                  </div>
                </div>
                <div style={{fontSize: '11px', textAlign: 'right'}}>
                  <Link to="/signup">Don't have an account? Sign up</Link>
                </div>
              </div>
              <ToastContainer autoClose={3000} />
            </div>
          </div>

        </LoadingScreen>
      </GuestLayout>
    );
  }
}

export { Login };
