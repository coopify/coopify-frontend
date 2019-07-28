
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading } from './loading';
import { ToastContainer, toast } from 'react-toastify';
import GuestLayout from './guest-layout';
import { attemptSignUpAction } from '../actions/user';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import { getUrlSocialAPICall } from '../api';
import SingletonPusher from './singletonPusher';
import ReactJoyride from 'react-joyride';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  error: state.user.error,
  loading: state.user.loading,
  userDidSignUp: state.user.userDidSignUp,
  referalCode: state.user.referalCode,
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
      showRefTextField: false,
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

  handleCheckBoxClick(e){
    const checked = e.target.checked;
    this.setState({
      ...this.state,
      showRefTextField: checked
    });
  }

  render() {
    const {
      error, userDidSignUp, loggedUser, dispatch, referalCode, loading
    } = this.props;
    const { showRefTextField } = this.state;
    if (error.length > 0) this.notify(error, true);
    if (userDidSignUp) {
      this.notify('El usuario se ha registrado exitosamente, se enviara un mail de confirmacion en breve.', false);
      SingletonPusher.getInstance().createPusherChannel(loggedUser, dispatch);
      return <Redirect to="/home" />;
    }
    const refCode = referalCode.length > 0 ? referalCode : null;
    const showRefCode = showRefTextField ? 'block' : 'none';

    const steps = [
      {
        target: '.traditional-signup',
        content: 'This is the traditional sign up...',
      },
      {
        target: '.social-login',
        content: 'Here you can sign up with social networks...',
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

          <div>
            <div style={{width: 'max-content', margin: 'auto'}}>
              <div className="box">

              <Avatar style={{margin: 'auto', backgroundColor: '#f50057'}}>
                  <LockOutlinedIcon />
              </Avatar>

                <h1 className="title">Sign up</h1>
                <form onSubmit={e => this.handleSubmit(e)} className="traditional-signup">

                      <div className="control controlIcon">
                        <input
                          id="name"
                          name="name"
                          className="input"
                          type="text"
                          placeholder="Name"
                        />
                        <i class="fa fa-address-card"/>
                      </div>

                      <div className="control controlIcon">
                        <input
                          id="email"
                          name="email"
                          className="input"
                          type="text"
                          placeholder="Email"
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

                      <div className="control controlIcon">
                        <input
                          id="repeatPassword"
                          name="repeatPassword"
                          className="input"
                          type="password"
                          placeholder="Repeat Password"
                        />
                        <i class="fa fa-lock"/>
                      </div>

                      <FormControlLabel style={{textAlign: 'left'}}
                        control={<Checkbox value="remember" color="primary" onClick={e => this.handleCheckBoxClick(e)}/>}
                        label="I have a referal code!"
                      />

                      <div className="control controlIcon" style={{display: showRefCode}}>
                        <input
                          id="refCode"
                          name="refCode"
                          className="input"
                          type="text"
                          placeholder="Referal Code"
                          value={refCode}
                          enabled={refCode == null}
                        />
                        <i class="fa fa-ticket"/>
                      </div>

                  <div className="field is-grouped">
                    <div className="control" style={{width: "100%"}}>
                      <button type="submit" style={{width: "100%"}} className="button is-link">SIGN UP</button>
                    </div>
                  </div>
                </form>
                <div className="social-login">

                  <div className="d-flex">
                    <hr className="my-auto flex-grow-1" />
                    <div className="px-4">or register an account with</div>
                    <hr className="my-auto flex-grow-1" />
                  </div>

                  <div className="social-login-buttons">
                    <button type="button" className="btn btn-link-1 btn-link-1-facebook" value="facebook" onClick={e => this.handleSocialSignUp(e)} style={{width: '100%', marginBottom: '3%'}}>
                      <i className="fa fa-facebook" />
                      {' '}
                      <div>Facebook</div>
                    </button>
                    <button type="button" className="btn btn-link-1 btn-link-1-google-plus" value="google" onClick={e => this.handleSocialSignUp(e)} style={{width: '100%', marginBottom: '3%'}}>
                      <i className="fa fa-google-plus" />
                      {' '}
                      <div>Google</div>
                    </button>
                  </div>
                </div>
                <div style={{fontSize: '11px', textAlign: 'center'}}>

                  <div>Already have an account?</div>
                  <Link to="/login">Login here</Link>
                </div>

              </div>      
            </div>
          </div>
      </GuestLayout>

    );
  }
}

export { Signup };
