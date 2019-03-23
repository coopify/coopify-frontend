
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { resetError, attemptCheckBalanceAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
import '../css/form-elements.css'
import 'font-awesome/css/font-awesome.min.css';
import styles from '../css/profile.scss';
import { Button, Input, Row, Col } from 'react-bootstrap';
import Switch from "react-switch";
import Protected from './protected';
import { Link } from 'react-router-dom';
import {loadScript} from "@pawjs/pawjs/src/utils/utils";

export default @connect(state => ({
  loggedUser: state.user, //el state.user es el nuevo state que devuelve el reducer, y loggedUser el definido aca, se uso para mapear ambos y actualziarlos
  balance: state.balance,
  error: state.error,
  loading: state.loading,
}))

class CoopiesAccount extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    balance: PropTypes.string
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    balance: "-",
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      balance: "-",
      error: ''
    };
  }

  notify(message, isError){
    const {dispatch} = this.props;
    if(isError){
      toast.error(message);
      dispatch(resetError());
    }
    else{
      toast.success(message)
    }
  }

  componentDidMount(){
    const { dispatch, loggedUser } = this.props;
    const token = localStorage.getItem("token");

    const reqAttributes = {
      userId: loggedUser.id,
      userToken: token,
    }

    dispatch(attemptCheckBalanceAction(reqAttributes));
  }


  render() {
    const { loading, error, loggedUser, balance } = this.props
    if(error.length > 0) this.notify(error, true)

    return (
      <Protected>
      <GuestLayout>
        <div className={styles.container}>
        <form >
        <Row>
            <Col sm={12}>

              <h2 style={{textAlign: 'center'}}> Coopies Account </h2>
                
            </Col>
        </Row>

          <Row style={{marginTop: '2%'}}>
            <Col sm={3}>

              <div className="field">
                <label className="label" htmlFor="name">Available Coopies (CPI): {balance}</label>
              </div> 

            </Col>
          </Row>
        </form>
        </div>
        <ToastContainer autoClose={3000}/>
      </GuestLayout>
     </Protected>
    );
  }
}

export { CoopiesAccount }