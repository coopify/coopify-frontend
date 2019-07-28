import React, { PureComponent } from 'react';
import logo from '../assets/logo.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default @connect(state => ({
  loadingUserReducer: state.user.loading,
  loadingServiceReducer: state.service.loading,
  loadingReviewReducer: state.review.loading,
  loadingProposalReducer: state.proposal.loading,
  loadingConversationReducer: state.conversation.loading,
  loadingGoalReducer: state.goal.loading,
}))

class Footer extends PureComponent {
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

    render() {
      const {
        loadingUserReducer,
        loadingServiceReducer,
        loadingReviewReducer,
        loadingProposalReducer,
        loadingConversationReducer,
        loadingGoalReducer,
      } = this.props;

      const loading = loadingUserReducer || loadingServiceReducer
      || loadingReviewReducer
      || loadingProposalReducer
      || loadingConversationReducer
      || loadingGoalReducer;

      const showFooter = loading ? 'none' : 'block';
      return (

        <footer id="myFooter" style={{ display: showFooter }}>
          <div className="container">
            <div className="row">
              <div className="col-sm-3" style={{ margin: 'auto' }}>
                <h2 className="footer-logo"><img alt="logo" src={logo} /></h2>
              </div>
              <div className="col-sm-3">
                <div className="social-networks">
                  <a href="https://twitter.com" className="twitter"><i className="fa fa-twitter" /></a>
                  <a href="https://facebook.com" className="facebook"><i className="fa fa-facebook" /></a>
                  <a href="https://instagram.com" className="instagram"><i className="fa fa-instagram" /></a>
                </div>
                <button type="button" className="btn btn-default">Contact us</button>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>© 2019 Coopify </p>
          </div>
        </footer>
      );
    }
}

export { Footer };
