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

          const showFooter = loading ? 'none' : 'block';
          return (

            <footer id="myFooter" style={{ display: showFooter }}>
            <div class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <h2 class="logo"><a href="#"> <img src={logo}/> </a></h2>
                    </div>
                    <div class="col-sm-2">
                        <h5>Get started</h5>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Sign up</a></li>
                            <li><a href="#">Downloads</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-2">
                        <h5>About us</h5>
                        <ul>
                            <li><a href="#">Company Information</a></li>
                            <li><a href="#">Contact us</a></li>
                            <li><a href="#">Reviews</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-2">
                        <h5>Support</h5>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Help desk</a></li>
                            <li><a href="#">Forums</a></li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <div class="social-networks">
                            <a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
                            <a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
                            <a href="#" class="google"><i class="fa fa-instagram"></i></a>
                        </div>
                        <button type="button" class="btn btn-default">Contact us</button>
                    </div>
                </div>
            </div>
            <div class="footer-copyright">
                <p>© 2019 Coopify </p>
            </div>
          </footer>
          );
      }
  }

  export { Footer };