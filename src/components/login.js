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
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Protected from './protected';

export default @connect(state => ({
  loggedUser: state.user, //el state.user es el nuevo state que devuelve el reducer, y loggedUser el definido aca, se uso para mapear ambos y actualziarlos
  error: state.error,
  loading: state.loading,
  userDidLog: state.userDidLog
}))

class Login extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    userDidLog: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    userDidLog: false
  };

  onLoginRedirectUrl = '/dashboard';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      userDidLog: false
    };
  }

  notify(message, isError){
    if(isError){
      toast.error(message);
    }
    else{
      toast.success(message)
    }
  }

  responseFacebook = (response) => {
    console.log(response);
  }

  responseGoogle = (response) => {
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

    const userLoginData = 
    {
      email: username,
      password: password
    };

    dispatch(attemptLoginAction(userLoginData));
  }

  render() {
    const { loading, error, loggedUser, userDidLog } = this.props
    if(error.length > 0) this.notify(error, true)

    if(userDidLog){
      return <Redirect to='/home'/>
    }

    return (
      <GuestLayout>
        <div className="columns is-centered p-t-xl p-r-md p-l-md">
          <div className="column is-half">
            <div className="box">


              <h1 className="title">Login</h1>
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="field">
                  <label className="label" htmlFor="username">
                    Email
                    <div className="control">
                      <input
                        id="username"
                        name="username"
                        className={`input`}
                        type="text"
                        placeholder="Username input"
                      />
                    </div>
                  </label>
                </div>
                <div className="field">
                  <label className="label" htmlFor="password">
                    Password
                    <div className="control">
                      <input
                        id="password"
                        name="password"
                        className={`input`}
                        type="password"
                        placeholder="********"
                      />
                    </div>
                  </label>
                </div>
                <div className="field is-grouped">
                  <div className="control"> 
                    <button type="submit" className="button is-link">Login</button>
                  </div>
                </div>
              </form>

                <div className="social-login">

                      <div className="d-flex">
                          <hr className="my-auto flex-grow-1"/>
                          <div className="px-4">or login with:</div>
                          <hr className="my-auto flex-grow-1"/>
                      </div>

                <div className="social-login-buttons">
                <FacebookLogin appId={global.FB_APP_ID} autoLoad={true} fields="name,email,picture"  callback={this.responseFacebook} />
                <GoogleLogin clientId={global.GOOGLE_APP_ID} buttonText="Login" onSuccess={this.responseGoogle} onFailure={this.responseGoogle} />
                </div>
              </div>
              <div>
                Don't have an account? <Link to='/signup'>Register here</Link>
                </div>
            </div>
            <ToastContainer autoClose={3000}/>
          </div>
        </div>
      </GuestLayout>
    );
  }
}

export { Login }
