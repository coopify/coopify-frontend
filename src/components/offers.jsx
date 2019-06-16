
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'react-table/react-table.css';
import LoadingScreen from 'react-loading-screen';
import Protected from './protected';
import GridView from './gridview';
import styles from '../css/profile.scss';
import { resetNotificationFlags, attemptOffersAction } from '../actions/user';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ReactJoyride from 'react-joyride';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import { resetError, attemptOffersAction } from '../actions/user';
import styles from '../css/profile.scss';
import { GridView } from './gridview';
import noImage from '../assets/noImage.png'

export default @connect(state => ({
  loading: state.loading,
  offers: state.offers,
  countOffers: state.countOffers,
  filters: state.filters,
}))

class Offers extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    offers: PropTypes.arrayOf(PropTypes.object),
    countOffers: PropTypes.number,
    filters: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    offers: [],
    loading: false,
    countOffers: 0,
    filters: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
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
      dispatch(resetNotificationFlags());
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
    const defaultImage = noImage;
    
    const steps = [
      {
        target: '.coopifyOffers',
        content: 'These are some of the services available in Coopify...',
      },
      {
        target: '.createOfferButton',
        content: 'You can publish your own by cicking here...',
        placement: 'right',
      },
]

    return (
      <LoadingScreen
        loading={loading}
        bgColor="rgba(255, 255, 255, .5)"
        spinnerColor="#BE1931"
        textColor="#BE1931"
        text="Loading..."
      >

        <ReactJoyride
          continuous
          steps={steps}
          run={true}
          showSkipButton
          styles={{
            options: {
              arrowColor: '#fff',
              backgroundColor: '#fff',
              beaconSize: 36,
              overlayColor: 'rgba(0, 0, 0, 0.5)',
              primaryColor: '#499be7',
              spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
              textColor: '#333',
              width: undefined,
              zIndex: 100,
            },
          }}
        />

        <div className={styles.container}>
          <form>

            <h2 style={{ textAlign: 'center' }}> Services </h2>

            <Tooltip title="Add" aria-label="Add">
              <Link to="/offer/create">
                <Fab
                  color="secondary"
                  className="createOfferButton"
                  style={{
                    position: 'fixed', bottom: '30px', right: '60px', zIndex: '1',
                  }}
                >
                  <AddIcon />
                </Fab>
              </Link>
            </Tooltip>

            <div
              style={{
                display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: 'white',
              }}
              className="coopifyOffers"
            >
              <GridView
                elements={offers}
                getImageFromElement={offer => (offer.images && offer.images.length > 0
                  ? offer.images[0].url : defaultImage)}
                getAlternativeTextForImageFromElement={offer => offer.title}
                getTitleFromElement={offer => offer.title}
                getSubtitleFromElement={offer => (
                  <div>
                    {offer.ratingCount !== 0 ? (
                      <div>
                        {'Service Rating: '}
                        {Number.parseFloat(offer.rating).toFixed(2)}
                        <StarRatingComponent
                          name="RatingService"
                          editing={false}
                          renderStarIcon={() => <span>&#9733;</span>}
                          starCount={5}
                          value={Number.parseFloat(offer.rating).toFixed(2)}
                        />
                      </div>) : ('')}
                  </div>
                )}
                shouldRedirect
                getDetailRoute={offer => `/offers/${offer.id}`}
                getOverlayFadeInfo={offer => (
                  <div>
                    <p style={{ fontSize: '24' }}>{`by: ${offer.by}`}</p>
                    <div style={{ fontStyle: 'italic' }}>
                      {offer.description.length > 35 ? (<p>{`${offer.description.substring(0, 35)}...`}</p>) : (<p>{`${offer.description}`}</p>)}
                    </div>
                  </div>
                )
                }
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
