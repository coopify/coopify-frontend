
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingOverlay from 'react-loading-overlay';
import PulseLoader from 'react-spinners/PulseLoader';

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
  };

  static defaultProps = {
    loadingUserReducer: false,
    loadingServiceReducer: false,
    loadingReviewReducer: false,
    loadingProposalReducer: false,
    loadingConversationReducer: false,
    loadingGoalReducer: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { loadingUserReducer,
      loadingServiceReducer,
      loadingReviewReducer,
      loadingProposalReducer,
      loadingConversationReducer,
      loadingGoalReducer,
      children,
      } = this.props;

    const loading = loadingUserReducer || 
    loadingServiceReducer || 
    loadingReviewReducer || 
    loadingProposalReducer || 
    loadingConversationReducer || 
    loadingGoalReducer;

    const bgColor = '#FFFF00';

    return (
      <LoadingOverlay
        active={loading}
        spinner={
          <PulseLoader 
            color={bgColor}
            sizeUnit={"px"}
            size={30}
          />
        }
      >
        {children}

      </LoadingOverlay>
    );
  }
}

export { Loading };
