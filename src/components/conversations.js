import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {
  Button, Input, Row, Col,
} from 'react-bootstrap';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import { loadScript } from '@pawjs/pawjs/src/utils/utils';
import StepZilla from 'react-stepzilla';
import { loadStyle } from '@pawjs/pawjs/src/utils/utils';
import { ChatList } from 'react-chat-elements';
import LoadingScreen from 'react-loading-screen';
import BasicData from './offerCreation/basicData';
import ExchangeMethod from './offerCreation/exchangeMethod';
import Protected from './protected';
import styles from '../css/profile.scss';
import { resetError, attemptGetUserConversations } from '../actions/user';
import Authenticator from './fake-authenticator';
import GuestLayout from './guest-layout';


export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  conversations: state.conversations,
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
      offer: {},
    };
  }

  displayChat(e) {
    this.props.history.push(`/user/conversations/${e.conversationId}`);
  }

  componentDidMount() {
    // fetch conversations data ...
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');

    const payload = {
      token,
    };
    dispatch(attemptGetUserConversations(payload));
  }

  render() {
    const {
      loading, error, loggedUser, conversations,
    } = this.props;
    const { offer, categories } = this.state;

    return (
      <Protected>
        <GuestLayout>

          <LoadingScreen
            loading={this.props.loading}
            bgColor="rgba(255, 255, 255, .5)"
            spinnerColor="#BE1931"
            textColor="#BE1931"
            text="Loading..."
          >


            <ChatList
              className="chat-list"
              dataSource={

              conversations.map((c) => {
                const user = c.from.id === loggedUser.id ? c.to : c.from;
                const response = {
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
              onClick={e => this.displayChat(e)}
            />

          </LoadingScreen>
        </GuestLayout>
      </Protected>
    );
  }
}

export { ConversationList };
