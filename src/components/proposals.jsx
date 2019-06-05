import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'react-table/react-table.css';
import LoadingScreen from 'react-loading-screen';
import { Proposal } from './proposal';
import Protected from './protected';
import styles from '../css/profile.scss';
import { resetError, attemptProposalsAction } from '../actions/user';
import GuestLayout from './guest-layout';
import GridView from './gridview';

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  proposals: state.proposals,
  countProposals: state.countProposals,
  loggedUser: state.user,
  width: state.width,
}))

class Proposals extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    proposals: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    width: PropTypes.number,
  };

  static defaultProps = {
    dispatch: () => {
    },
    proposals: [],
    loading: false,
    width: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      width: window.innerWidth,
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { limit } = this.state;
    const userToken = localStorage.getItem('token');
    const reqAttributes = {
      limit,
      page: 0,
      token: userToken,
    };

    dispatch(attemptProposalsAction(reqAttributes));
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  notify = (message, isError) => {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetError());
    } else {
      toast.success(message);
    }
  }

  updateDimensions() {
    this.setState(state => ({ ...state, width: window.innerWidth }));
  }

  changePage(pageIndex) {
    const { dispatch } = this.props;
    const { limit } = this.state;
    const userToken = localStorage.getItem('token');
    const reqAttributes = {
      limit,
      page: pageIndex,
      token: userToken,
    };

    dispatch(attemptProposalsAction(reqAttributes));
  }

  changeSize(pageSize) {
    this.setState(state => ({ ...state, limit: pageSize }));
  }

  render() {
    const { proposals, loading } = this.props;
    const getTitleFromElement = proposal => proposal.purchasedOffer.title;
    return (
      <Protected>
        <GuestLayout>

          <LoadingScreen
            loading={loading}
            bgColor="rgba(255, 255, 255, .5)"
            spinnerColor="#BE1931"
            textColor="#BE1931"
            text="Loading..."
          >

            <div className={styles.container}>
              <form>

                <h2 style={{ textAlign: 'center' }}> Proposals </h2>

                <div style={{
                  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: 'white',
                }}
                >
                  <GridView
                    elements={proposals}
                    getImageFromElement={proposal => (proposal.purchasedOffer.images
                      && proposal.purchasedOffer.images[0]
                      ? proposal.purchasedOffer.images[0].url : '')}
                    getAlternativeTextForImageFromElement={p => p.purchasedOffer.title}
                    getTitleFromElement={getTitleFromElement}
                    getSubtitleFromElement={proposal => `by: ${proposal.proposer.name}`}
                    shouldRedirect={false}
                    selectItem={selectedProposal => (
                      <Proposal
                        proposal={selectedProposal}
                        buttonText={selectedProposal.purchasedOffer.title}
                        isInfo
                      />
                    )
                    }
                  />
                </div>

              </form>
              <ToastContainer autoClose={3000} />
            </div>

          </LoadingScreen>
        </GuestLayout>
      </Protected>
    );
  }
}

export { Proposals };
