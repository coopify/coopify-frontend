
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { resetError, attemptGetUserConversations } from '../actions/user';
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


export default @connect(state => ({//obtener todos los mensajes y chats en este componente, en el chat simplemente se obtienen del state de la store.
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  conversations: state.conversations
}))

class ConversationList extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object,
    conversations: PropTypes.array,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {},
    conversations: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {}
    };
  }

  displayChat(e){
    this.props.history.push(`/user/conversations/${e.conversationId}`);
  }

  componentDidMount(){
      const { dispatch } = this.props;
      const token = localStorage.getItem('token');

      const payload = 
      {
        token: token
      };
      dispatch(attemptGetUserConversations(payload));
  }

  render() {
    const { loading, error, loggedUser, conversations } = this.props
    const { offer, categories } = this.state

    return (
      <Protected>
      <GuestLayout>

        <ChatList
            className='chat-list'
            dataSource={
              
              conversations.map((c) => {
                const user = c.from.id === loggedUser.id ? c.to : c.from;
                const response = 
                {   
                  avatar: user.pictureURL,
                  title: user.name,
                  date: new Date(c.createdAt),
                  unread: 0,
                  userId: user.id,
                  conversationId: c.id,
                };
                return response;
              })
          }
            onClick={e => this.displayChat(e)} />

      </GuestLayout>
     </Protected>
    );
  }
}

export { ConversationList }