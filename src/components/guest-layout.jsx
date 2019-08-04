import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import Header from './header';
import Footer from './footer';
import 'react-toastify/dist/ReactToastify.css';
import { Loading } from './loading';
import {
  resetNotificationFlagsUser,
  resetNotificationFlagsConversations,
  resetNotificationFlagsGoals,
  resetNotificationFlagsReviews,
  resetNotificationFlagsProposals,
  resetNotificationFlagsService,
} from '../actions/user';

export default class GuestLayout extends React.Component {
  // eslint-disable-next-line
  static propTypes = {
    dispatch: PropTypes.func,
    children: PropTypes.any,
  };

  static defaultProps = {
    dispatch: () => {
    },
  };

  resetNotifications() {
    const { dispatch } = this.props;
    console.log('reseting notifications...' + new Date(Date.now()).toISOString());
    dispatch(resetNotificationFlagsUser());
    dispatch(resetNotificationFlagsConversations());
    dispatch(resetNotificationFlagsGoals());
    dispatch(resetNotificationFlagsReviews());
    dispatch(resetNotificationFlagsProposals());
    dispatch(resetNotificationFlagsService());
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        <Loading>
          <ToastContainer autoClose={3000} onClose={this.resetNotifications()} />
          <Header />   
          <div style={{ paddingBottom: '60px' }} />
          {children}
          <br />
          <Footer />
        </Loading>
      </div>
    );
  }
}
