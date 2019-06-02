
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingScreen from 'react-loading-screen';
import { ToastContainer, toast } from 'react-toastify';
import GuestLayout from './guest-layout';
import { attemptSignUpAction } from '../actions/user';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import { getUrlSocialAPICall } from '../api';
import SingletonPusher from './singletonPusher';

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  userDidSignUp: state.userDidSignUp,
  referalCode: state.referalCode,
}))

class Signup extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    userDidSignUp: PropTypes.bool,
    referalCode: PropTypes.string,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    userDidSignUp: false,
    referalCode: '',
  };

  onLoginRedirectUrl = '/home';

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  notify = (message, isError) => {
    if (isError) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }

  handleSocialSignUp = async (e) => {
    const socialSelected = e.target.value;
    const response = await getUrlSocialAPICall(socialSelected);
    const url = response.data;
    window.location = url;
  }

  handleSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { dispatch } = this.props;
    const signUpData = new FormData(e.target);

    const name = signUpData.get('name');
    const email = signUpData.get('email');
    const password = signUpData.get('password');
    const repeatedPassword = signUpData.get('repeatPassword');
    const referalCode = signUpData.get('refCode');

    let userSignUpData = {
      name,
      email,
      password,
      repeatedPassword,
    };

    if (referalCode.length > 0) {
      userSignUpData = {
        name,
        email,
        password,
        repeatedPassword,
        referalCode,
      };
    }

    dispatch(attemptSignUpAction(userSignUpData));
  }

  render() {
    const {
      error, userDidSignUp, loggedUser, dispatch, referalCode, loading,
    } = this.props;
    if (error.length > 0) this.notify(error, true);
    if (userDidSignUp) {
      this.notify('El usuario se ha registrado exitosamente, se enviara un mail de confirmacion en breve.', false);
      SingletonPusher.getInstance().createPusherChannel(loggedUser, dispatch);
      return <Redirect to="/home" />;
    }
    const refCode = referalCode.length > 0 ? referalCode : null;

    return (
      <GuestLayout>

        <LoadingScreen
          loading={loading}
          bgColor="rgba(255, 255, 255, .5)"
          spinnerColor="#BE1931"
          textColor="#BE1931"
          text="Loading..."
        >

          <div className="columns is-centered p-t-xl p-r-md p-l-md">
            <div className="column is-half">
              <div className="box">

                <h1 className="title">Sign Up</h1>
                <form onSubmit={e => this.handleSubmit(e)}>


                  <div className="field">
                    <label className="label" htmlFor="username">
                      <div>Name</div>
                      <div className="control">
                        <input
                          id="name"
                          name="name"
                          className="input"
                          type="text"
                          placeholder="Name..."
                        />
                      </div>
                    </label>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="username">
                      <div>Email</div>
                      <div className="control">
                        <input
                          id="email"
                          name="email"
                          className="input"
                          type="text"
                          placeholder="Email..."
                        />
                      </div>
                    </label>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="password">

                      <div>Password</div>
                      <div className="control">
                        <input
                          id="password"
                          name="password"
                          className="input"
                          type="password"
                          placeholder="Password..."
                        />
                      </div>
                    </label>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="username">

                      <div>Repeat Password</div>
                      <div className="control">
                        <input
                          id="repeatPassword"
                          name="repeatPassword"
                          className="input"
                          type="password"
                          placeholder="Repeat Password..."
                        />
                      </div>
                    </label>
                  </div>

                  <div className="field">
                    <label className="label" htmlFor="refCode">

                      <div>Referal Code</div>
                      <div className="control">
                        <input
                          id="refCode"
                          name="refCode"
                          className="input"
                          type="text"
                          placeholder="Referal Code..."
                          value={refCode}
                          enabled={refCode == null}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="field is-grouped">
                    <div className="control">
                      <button type="submit" className="button is-link">Sign Up</button>
                    </div>
                  </div>
                </form>
                <div className="social-login">

                  <div className="d-flex">
                    <hr className="my-auto flex-grow-1" />
                    <div className="px-4">or register an account with:</div>
                    <hr className="my-auto flex-grow-1" />
                  </div>

                  <div className="social-login-buttons">
                    <button type="button" className="btn btn-link-1 btn-link-1-facebook" value="facebook" onClick={e => this.handleSocialSignUp(e)}>
                      <i className="fa fa-facebook" />
                      {' '}
                      <div>Facebook</div>
                    </button>
                    <button type="button" className="btn btn-link-1 btn-link-1-google-plus" value="google" onClick={e => this.handleSocialSignUp(e)}>
                      <i className="fa fa-google-plus" />
                      {' '}
                      <div>Google</div>
                    </button>
                  </div>
                </div>
                <div>

                  <div>Already have an account?</div>
                  <Link to="/login">Login here</Link>
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

export { Signup };
