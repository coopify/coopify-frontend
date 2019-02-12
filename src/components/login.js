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

export default @connect(state => ({
  loggedUser: state.user, //el state.user es el nuevo state que devuelve el reducer, y loggedUser el definido aca, se uso para mapear ambos y actualziarlos
  error: state.error,
  loading: state.loading
}))

class Login extends React.Component {

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

  onLoginRedirectUrl = '/dashboard';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: ''
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
                  <a className="btn btn-link-1 btn-link-1-facebook" href="#">
                    <i className="fa fa-facebook"></i> Facebook
                  </a>
                  <a className="btn btn-link-1 btn-link-1-google-plus" href="#">
                    <i className="fa fa-google-plus"></i> Google
                  </a>
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
