import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import LoadingScreen from 'react-loading-screen';
import { Proposal } from './proposal';
import Protected from './protected';
import styles from '../css/profile.scss';
import { resetError, attemptProposalsAction } from '../actions/user';
import GuestLayout from './guest-layout';

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  proposals: state.proposals,
  countProposals: state.countProposals,
  loggedUser: state.user,
}))

class Proposals extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    proposals: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    proposals: [],
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { limit } = this.sate;
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
      dispatch(resetError());
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
    const { proposals, loading } = this.props;

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
                  <GridList cellHeight={180} style={{ height: '80%', width: '100%' }}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                      <ListSubheader component="div">Proposals</ListSubheader>
                    </GridListTile>
                    {proposals.map(tile => (
                      <GridListTile>
                        <img
                          src={
                            tile.purchasedOffer.images && tile.purchasedOffer.images[0]
                              ? tile.purchasedOffer.images[0].url : ''
                          }
                          alt={tile.title}
                        />
                        <GridListTileBar
                          title={(
                            <Link style={{ padding: '0' }} to={`/offers/${tile.offerId}`} className="navbar-item">
                              <i className="fa" />
                              {tile.purchasedOffer.title}
                            </Link>
)}
                          subtitle={(
                            <span>
                              <div>by: {tile.proposer.name}</div>
                            </span>
)}
                          actionIcon={(
                            <Proposal
                              proposal={tile}
                              buttonText={<InfoIcon />}
                              isInfo
                            />
)}
                        />

                      </GridListTile>
                    ))}
                  </GridList>
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
