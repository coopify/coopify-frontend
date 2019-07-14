
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import LoadingScreen from 'react-loading-screen';

export default @connect(state => ({
  loadingUserReducer: state.user.loading,
  loadingServiceReducer: state.service.loading,
  loadingReviewReducer: state.review.loading,
  loadingProposalReducer: state.proposal.loading,
  loadingConversationReducer: state.conversation.loading,
  loadingGoalReducer: state.goal.loading,
}))

class Loading extends React.Component {
  static propTypes = {
    loadingUserReducer: PropTypes.bool,
    loadingServiceReducer: PropTypes.bool,
    loadingReviewReducer: PropTypes.bool,
    loadingProposalReducer: PropTypes.bool,
    loadingConversationReducer: PropTypes.bool,
    loadingGoalReducer: PropTypes.bool,
    children: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    loadingUserReducer: false,
    loadingServiceReducer: false,
    loadingReviewReducer: false,
    loadingProposalReducer: false,
    loadingConversationReducer: false,
    loadingGoalReducer: false,
    children: {},
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      loadingUserReducer,
      loadingServiceReducer,
      loadingReviewReducer,
      loadingProposalReducer,
      loadingConversationReducer,
      loadingGoalReducer,
      children,
    } = this.props;

    const loading = loadingUserReducer
    || loadingServiceReducer || loadingReviewReducer
    || loadingProposalReducer || loadingConversationReducer
    || loadingGoalReducer;

    const bgColor = 'rgba(20,20,20,0.5)';
    const textColor = '#f9c733';

    return (
      <LoadingScreen
        loading={loading}
        bgColor={bgColor}
        spinnerColor={textColor}
        textColor={textColor}
        text="Loading"
      >
        {children}

      </LoadingScreen>
    );
  }
}

export { Loading };
