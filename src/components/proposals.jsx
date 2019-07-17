import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'react-table/react-table.css';
import { Loading } from './loading';
import { Proposal } from './proposal';
import { Protected } from './protected';
import styles from '../resources/css/profile.scss';
import { resetNotificationFlags, attemptProposalsAction } from '../actions/user';
import GuestLayout from './guest-layout';
import { GridView } from './gridview';
import noImage from '../assets/noImage.png';

export default @connect(state => ({
  error: state.proposal.error,
  loading: state.proposal.loading,
  proposals: state.proposal.proposals,
  countProposals: state.proposal.countProposals,
  loggedUser: state.user.loggedUser,
}))

class Proposals extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    proposals: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    loggedUser: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    dispatch: () => {
    },
    proposals: [],
    loading: false,
    loggedUser: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
    };
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
  }

  notify = (message, isError) => {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetNotificationFlags());
    } else {
      toast.success(message);
    }
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
    const { proposals, loading, loggedUser } = this.props;

    const getTitleFromElement = proposal => proposal.purchasedOffer.title;

    // const proposalsConfirmed = proposals.filter(proposal => proposal.status === 'Confirmed');
    // const proposalsWaiting = proposals.filter(proposal => proposal.status === 'Waiting');
    const proposalsMade = proposals.filter(proposal => proposal.proposer.name === loggedUser.name);
    const proposalsRecived = proposals.filter(proposal => proposal.proposer.name !== loggedUser.name);

    return (
      <Protected>
        <GuestLayout>

          <Loading>

            <div className={styles.container}>
              <form>

                <h2 style={{ textAlign: 'center' }}> Proposals </h2>

                <div style={{
                  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: 'white',
                }}
                >
                  {proposalsRecived.length > 0 ? (
                    <div className="card">
                      <div className="card-header">
                        <h4 style={{ textAlign: 'center' }}> Recived proposals </h4>
                      </div>
                      <GridView
                        elements={proposalsRecived}
                        getImageFromElement={proposal => (proposal.purchasedOffer.images
                          && proposal.purchasedOffer.images[0]
                          ? proposal.purchasedOffer.images[0].url : noImage)}
                        getAlternativeTextForImageFromElement={p => p.purchasedOffer.title}
                        getTitleFromElement={getTitleFromElement}
                        getSubtitleFromElement={proposal => `by: ${proposal.proposer.name}`}
                        shouldRedirect={false}
                        getOverlayFadeInfo={proposal => (
                          <div>
                            <p style={{ fontSize: '24' }}>{`Status: ${proposal.status}`}</p>
                          </div>
                        )}
                        getDetailRoute={proposal => `/offers/${proposal.purchasedOffer.id}`}
                        textDetailRoute={() => 'Go to Service'}
                        possibleMakeReview={proposal => (proposal.status === 'Confirmed' ? (
                          ' | Wait review'
                        ) : '')}
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
                  ) : ''}

                  {proposalsMade.length > 0 ? (
                    <div className="card">
                      <div className="card-header">
                        <h4 style={{ textAlign: 'center' }}> Propositions created by you </h4>
                      </div>
                      <GridView
                        elements={proposalsMade}
                        getImageFromElement={proposal => (proposal.purchasedOffer.images
                          && proposal.purchasedOffer.images[0]
                          ? proposal.purchasedOffer.images[0].url : noImage)}
                        getAlternativeTextForImageFromElement={p => p.purchasedOffer.title}
                        getTitleFromElement={getTitleFromElement}
                        getSubtitleFromElement={proposal => `by: ${proposal.proposer.name}`}
                        shouldRedirect={false}
                        getOverlayFadeInfo={proposal => (
                          <div>
                            <p style={{ fontSize: '24' }}>{`Status: ${proposal.status}`}</p>
                          </div>
                        )}
                        getDetailRoute={proposal => `/offers/${proposal.purchasedOffer.id}`}
                        textDetailRoute={() => 'Go to Service'}
                        possibleMakeReview={proposal => (proposal.status === 'Confirmed' ? (
                          ' and Make Review'
                        ) : '')}
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
                  ) : ''}

                </div>

              </form>
              <ToastContainer autoClose={3000} />
            </div>

          </Loading>
        </GuestLayout>
      </Protected>
    );
  }
}

export { Proposals };
