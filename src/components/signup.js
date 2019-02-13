
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie';
import Authenticator from './fake-authenticator';
import { attemptSignUpAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
import '../css/form-elements.css'
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { FACEBOOK, GOOGLE } from '../constants/constants';
import { getUrlSocialAPICall } from '../api';

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading
}))

class Signup extends React.Component {
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
    const signUpData = new FormData(e.target);

    const name = signUpData.get('name');
    const email = signUpData.get('email');
    const password = signUpData.get('password');
    const repeatedPassword = signUpData.get('repeatPassword');

    const userSignUpData = 
    {
      name: name,
      email: email,
      password: password,
      repeatedPassword: repeatedPassword
    };

    dispatch(attemptSignUpAction(userSignUpData));
  }

   async handleSocialSignUp(e) {
    const socialSelected = e.target.value;
    const response = await getUrlSocialAPICall(socialSelected);
    const url = response.data;
    console.log(url);
    switch (socialSelected) {
      case FACEBOOK:
        //dispatch(attemptSocialSignUpAction(FACEBOOK));
        
        break;

        case GOOGLE:
        //dispatch(attemptSocialSignUpAction(GOOGLE));
        break;
    }
  }

  render() {
    const {error, loggedUser} = this.props
    if(error.length > 0) this.notify(error, true)
    if(loggedUser.length > 0) this.notify("El usuario se ha registrado exitosamente, se enviara un mail de confirmacion en breve.", false)

    return (
        <GuestLayout>
                   <div className="columns is-centered p-t-xl p-r-md p-l-md">
          <div className="column is-half">
            <div className="box">

              <h1 className="title">Sign Up</h1>
              <form onSubmit={e => this.handleSubmit(e)}>


                 <div className="field">
                  <label className="label" htmlFor="username">
                    Name
                    <div className="control">
                      <input
                        id="name"
                        name="name"
                        className={`input`}
                        type="text"
                        placeholder="Name..."
                      />
                    </div>
                  </label>
                </div>

                <div className="field">
                  <label className="label" htmlFor="username">
                    Email
                    <div className="control">
                      <input
                        id="email"
                        name="email"
                        className={`input`}
                        type="text"
                        placeholder="Email..."
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
                        placeholder="Password..."
                      />
                    </div>
                  </label>
                </div>

                 <div className="field">
                  <label className="label" htmlFor="username">
                    Repeat Password
                    <div className="control">
                      <input
                        id="repeatPassword"
                        name="repeatPassword"
                        className={`input`}
                        type="password"
                        placeholder="Repeat Password..."
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
                    <hr className="my-auto flex-grow-1"/>
                    <div className="px-4">or register an account with:</div>
                    <hr className="my-auto flex-grow-1"/>
                </div>

                <div className="social-login-buttons">
                <button className="btn btn-link-1 btn-link-1-facebook" value="facebook" onClick={e => this.handleSocialSignUp(e)}>
                <i className="fa fa-facebook"></i> Facebook
                </button>
                <button className="btn btn-link-1 btn-link-1-google-plus" value="google" onClick={e => this.handleSocialSignUp(e)}>
                <i className="fa fa-google-plus"></i> Google
                </button>
                </div>
                </div>
                <div>
                Already have an account? <Link to='/login'>Login here</Link>
                </div>

            </div>
            <ToastContainer autoClose={3000}/>
          </div>
        </div>
        </GuestLayout>

    );
  }
}

export { Signup }
