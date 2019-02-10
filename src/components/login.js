import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie';
import Authenticator from './fake-authenticator';
import { attemptLoginAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loader from 'react-loader-spinner'

export default @connect(state => ({
  loggedUser: _.get(state.userReducer, 'user', {}),
}))

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false
  };

  onLoginRedirectUrl = '/dashboard';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false
    };
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
    const {loading} = this.props
    return (
      <GuestLayout>
        <div className="columns is-centered p-t-xl p-r-md p-l-md">
          <div className="column is-half">
            <div className="box">
              <h1 className="title">Login</h1>
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="field">
                  <label className="label" htmlFor="username">
                    username
                    <div className="control">
                      <input
                        defaultValue="demo"
                        id="username"
                        name="username"
                        className={`input is-danger`}
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
                        defaultValue="demo"
                        id="password"
                        name="password"
                        className={`input is-danger`}
                        type="password"
                        placeholder="********"
                      />
                    </div>
                  </label>
                </div>
                <div className="field is-grouped">
                  <div className="control">
                  {loading ?
                  <Loader type="Puff" color="#00BFFF" height="100" width="100"/> :  
                    <button type="submit" className="button is-link">Login</button>}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </GuestLayout>
    );
  }
}

export { Login }
