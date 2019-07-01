import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { ChatList } from 'react-chat-elements';
import LoadingScreen from 'react-loading-screen';
import { Protected } from './protected';
import { attemptGetUserConversations } from '../actions/user';
import GuestLayout from './guest-layout';
import styles from '../resources/css/profile.scss';

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  conversations: state.conversations,
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
    const { history } = this.props;
    history.push(`/user/conversations/${e.conversationId}`);
  }

  render() {
    const { loggedUser, conversations, loading } = this.props;
    return (
      <Protected>
        <GuestLayout>

          <LoadingScreen
            loading={loading}
            bgColor={global.loadingBgColor}
            spinnerColor={global.loadingFontColor}
            textColor={global.loadingFontColor}
            text="Loading..."
          >

            <div className={styles.containerChat}>
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
            </div>
          </LoadingScreen>
        </GuestLayout>
      </Protected>
    );
  }
}

export { ConversationList };
