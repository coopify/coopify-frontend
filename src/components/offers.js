
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';
import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import Protected from './protected';
import styles from '../css/profile.scss';
import { resetError, attemptOffersAction } from '../actions/user';
import GuestLayout from './guest-layout';
import { IndividualOffer } from './individualOffer';

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  offers: state.offers,
  countOffers: state.countOffers,
  filters: state.filters,
}))

class Offers extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    offers: PropTypes.array,
    countOffers: PropTypes.number,
    filters: PropTypes.object,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    offers: [],
    error: '',
    loading: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      error: '',
      limit: 10,
    };
  }

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetError());
    } else {
      toast.success(message);
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const reqAttributes = {
      limit: this.state.limit,
      page: 0,
      filters: this.props.isHome ? {} : this.props.filters,
    };

    dispatch(attemptOffersAction(reqAttributes));
  }

  changePage(pageIndex) {
    const { dispatch } = this.props;
    const reqAttributes = {
      limit: this.state.limit,
      page: pageIndex,
      filters: this.props.filters,
    };

    dispatch(attemptOffersAction(reqAttributes));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters != this.props.filters) {
      const { dispatch } = this.props;
      const reqAttributes = {
        limit: this.state.limit,
        page: 0,
        filters: this.props.filters,
      };

      dispatch(attemptOffersAction(reqAttributes));
    }
  }

  changeSize(pageSize) {
    this.setState(state => ({ ...state, limit: pageSize }));
  }

  render() {
    const { offers, countOffers, loading } = this.props;
    const defaultImage = 'https://cdn2.vectorstock.com/i/1000x1000/01/61/service-gear-flat-icon-vector-13840161.jpg';

    return (
          <LoadingScreen
            loading={loading}
            bgColor="rgba(255, 255, 255, .5)"
            spinnerColor="#BE1931"
            textColor="#BE1931"
            text="Loading..."
          >

            <div className={styles.container}>
              <form>

                <h2 style={{ textAlign: 'center' }}> Services </h2>

                <div style={{
                  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: 'white',
                }}
                >
                  <GridList cellHeight={180} cols={2} style={{ height: '80%', width: '100%' }}>

                    {offers.map(tile => (
                      <GridListTile>
                        <img
                          src={
                            tile.images && tile.images.length > 0 ? tile.images[0].url : defaultImage
                          }
                          alt={tile.title}
                        />
                        <GridListTileBar
                          title={(
                            <Link style={{ padding: '0'}} to={`/offers/${tile.id}`} className="navbar-item">
                              <i className="fa" />
                              {tile.title}
                            </Link>
                          )}
                          subtitle={(
                            <span>
                              <div>by: {'tile.proposer.name'}</div>
                            </span>
                          )}
                         /* actionIcon={(
                            <IndividualOffer
                              offer={tile}
                            />
                          )}*/
                        />

                      </GridListTile>
                    ))}
                  </GridList>
                </div>

              </form>
              <ToastContainer autoClose={3000} />
            </div>

          </LoadingScreen>
    );
  }
}

export { Offers };
