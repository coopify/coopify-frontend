import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { ChatList } from 'react-chat-elements';
import { Loading } from './loading';
import { Protected } from './protected';
import { attemptGetUserConversations } from '../actions/user';
import GuestLayout from './guest-layout';
import styles from '../resources/css/profile.scss';
import {
  Button, Row, Col, ListGroup, Form,
} from 'react-bootstrap';
import { Chat } from './individualChat';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  error: state.conversation.error,
  loading: state.conversation.loading,
  conversations: state.conversation.conversations,
}))

class ConversationList extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    conversations: PropTypes.arrayOf(PropTypes.object),
    history: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    conversations: [],
    history: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      active: true,
    };
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

  displayChat(e) {
    this.setState({
      ...this.state,
      conversationId: e.conversationId,
      active: false,
    });
  }

  displayChatList(e){
    this.setState({
      ...this.state,
      active: true,
    });
  }

  render() {
    const { loggedUser, conversations, loading } = this.props;
    const { active, conversationId } = this.state;

    return (
      <Protected>
        <GuestLayout>

          <Loading>

<Row>
  <Col sm={4} className={active ? 'generalchat active' : 'generalchat inactive'}>
  <div className={styles.containerChat}>
              <ChatList
                className={"chat-list"}
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
            </div>
  </Col>

  <Col sm={8} className={active ? 'specificchat inactive' : 'specificchat active'}>
  <Chat conversationid={conversationId} onChatLeave={e => this.displayChatList(e)}/>
  </Col>
</Row>

          </Loading>
        </GuestLayout>
      </Protected>
    );
  }
}

export { ConversationList };
