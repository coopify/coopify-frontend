

import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { resetError, attemptPublishOffer } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import styles from '../css/profile.scss';
import { Button, Input, Row, Col } from 'react-bootstrap';
import Switch from "react-switch";
import Protected from './protected';
import { Link } from 'react-router-dom';
import {loadScript} from "@pawjs/pawjs/src/utils/utils";
import StepZilla from "react-stepzilla";
import {loadStyle} from "@pawjs/pawjs/src/utils/utils";
import BasicData from './offerCreation/basicData.js';
import ExchangeMethod from './offerCreation/exchangeMethod.js';
import { ChatList } from 'react-chat-elements'
import { MessageList } from 'react-chat-elements'


export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading
}))

class Chat extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
    };
  }

  render() {
    const { loading, error, loggedUser } = this.props
    const { offer, categories } = this.state

    return (
      <Protected>
      <GuestLayout>
     
        <MessageList
            className='message-list'
            lockable={true}
            toBottomHeight={'100%'}
            dataSource={[
                {
                    position: 'right',
                    type: 'text',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    date: new Date(),
                },
                {
                    position: 'left',
                    type: 'text',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    date: new Date(),
                },
                {
                    position: 'right',
                    type: 'text',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    date: new Date(),
                },
                {
                    position: 'left',
                    type: 'text',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                    date: new Date(),
                },
            ]} />

      </GuestLayout>
     </Protected>
    );
  }
}

export { Chat }