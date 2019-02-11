
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie';
import Authenticator from './fake-authenticator';
import { attemptSignUpAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loader from 'react-loader-spinner'

export default @connect(state => ({
  loggedUser: _.get(state.userReducer, 'user', {}),
}))

class Signup extends React.Component {
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

  render() {
    const {loading} = this.props
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
                  {loading ?
                  <Loader type="Puff" color="#00BFFF" height="100" width="100"/> :  
                    <button type="submit" className="button is-link">Sign Up</button>}
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

export { Signup }
