
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'react-table/react-table.css';
import LoadingScreen from 'react-loading-screen';
import Protected from './protected';
import GridView from './gridview';
import styles from '../css/profile.scss';
import { resetError, attemptOffersAction } from '../actions/user';

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
    offers: PropTypes.arrayOf(PropTypes.object),
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
    countOffers: 0,
    filters: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      error: '',
      limit: 10,
    };
  }

  componentDidMount() {
    const {
      dispatch, limit, isHome, filters,
    } = this.props;
    const reqAttributes = {
      limit,
      page: 0,
      filters: isHome ? {} : filters,
    };

    dispatch(attemptOffersAction(reqAttributes));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, filters, limit } = this.props;
    if (prevProps.filters !== filters) {
      const reqAttributes = {
        limit,
        page: 0,
        filters,
      };

      dispatch(attemptOffersAction(reqAttributes));
    }
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

  changePage(pageIndex) {
    const { dispatch, limit, filters } = this.props;
    const reqAttributes = {
      limit,
      page: pageIndex,
      filters,
    };

    dispatch(attemptOffersAction(reqAttributes));
  }

  changeSize(pageSize) {
    this.setState(state => ({ ...state, limit: pageSize }));
  }

  render() {
    const { offers, loading } = this.props;
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
              <GridView
                elements={offers}
                getImageFromElement={offer => (offer.images && offer.images.length > 0
                  ? offer.images[0].url : defaultImage)}
                getAlternativeTextForImageFromElement={offer => offer.title}
                getTitleFromElement={offer => offer.title}
                getSubtitleFromElement={offer => `by: ${offer.by}`}
                shouldRedirect
                getDetailRoute={offer => `/offers/${offer.id}`}
              />
            </div>

          </form>
          <ToastContainer autoClose={3000} />
        </div>

      </LoadingScreen>
    );
  }
}

export { Offers };
