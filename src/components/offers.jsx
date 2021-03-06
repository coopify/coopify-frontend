
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'react-bootstrap';
import 'react-table/react-table.css';
import { Loading } from './loading';
import { GridView } from './gridview';
import styles from '../resources/css/profile.scss';
import { resetNotificationFlagsService, attemptOffersAction } from '../actions/user';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom';
import StarRatingComponent from 'react-star-rating-component';
import noImage from '../assets/noImage.png'
import { Row, Col, } from 'react-bootstrap';
import Pagination from "react-js-pagination";


export default @connect(state => ({
  loading: state.service.loading,
  offers: state.service.offers,
  countOffers: state.service.countOffers,
  filters: state.service.filters,
}))

class Offers extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    offers: PropTypes.arrayOf(PropTypes.object),
    countOffers: PropTypes.number,
    filters: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    limit: PropTypes.number,
    page: PropTypes.number,
  };

  static defaultProps = {
    dispatch: () => {
    },
    offers: [],
    loading: false,
    countOffers: 0,
    filters: {},
    limit: 18,
    page: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
    };
  }

  componentDidMount() {
    const {
      dispatch, isHome, filters, limit, page
    } = this.props;
    const reqAttributes = {
      limit,
      page,
      filters: isHome ? {} : filters,
    };

    dispatch(attemptOffersAction(reqAttributes));
  }

  didFiltersChange(oldFilter, newFilter) {
    var oldFilterProps = Object.getOwnPropertyNames(oldFilter);
    var newFilterProps = Object.getOwnPropertyNames(newFilter);

    if (oldFilterProps.length != newFilterProps.length) {
        return true;
    }

    for (var i = 0; i < oldFilterProps.length; i++) {
        var propName = oldFilterProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (oldFilter[propName] !== newFilter[propName]) {
            return true;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return false;
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, filters } = this.props;
    if (this.didFiltersChange(filters, nextProps.filters)) {
      const reqAttributes = {
        limit: nextProps.limit,
        page: nextProps.page,
        filters: nextProps.filters,
      };

      dispatch(attemptOffersAction(reqAttributes));
    }
  }

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetNotificationFlagsService());
    } else {
      toast.success(message);
    }
  }

  changePage(pageNumber) {
    const { dispatch, filters, limit, page } = this.props;
    const reqAttributes = {
      limit,
      page: pageNumber - 1,
      filters,
    };

    dispatch(attemptOffersAction(reqAttributes));
  }

  // changeSize(pageSize) {
  //   this.setState(state => ({ ...state, limit: pageSize }));
  // }

  render() {
    const { offers, loading, countOffers, limit, page } = this.props;
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
      <div>

        <div className={styles.container} styles={{ backgroundColor: '#fafafa' }}>
          <form style={{ width: '80%', display: 'inline-block' }}>

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
                display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: '#fafafa',
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
                        <Row>
                          <Col sm="1">
                            {}
                          </Col>
                          <Col sm="10" style={{ top: 5 }}>
                            {'Service Rating: '}
                            {Number.parseFloat(offer.rating).toFixed(2)}
                          </Col>
                          <Col sm="1">
                            {}
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="1">
                            {}
                          </Col>
                          <Col sm="10" style={{ top: 7 }}>
                            <StarRatingComponent
                              name="RatingService"
                              editing={false}
                              renderStarIcon={() => <span>&#9733;</span>}
                              starCount={5}
                              value={Number.parseFloat(offer.rating).toFixed(2)}
                            />
                          </Col>
                          <Col sm="1">
                            {}
                          </Col>
                        </Row>
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
                )}
              />
            </div>

          </form>

          <div>
            <Row>
              <Col sm="4">
                {}
              </Col>
              <Col sm="4">
                <div style={{ display: 'inline-flex' }}>
                  <Pagination
                    hideDisabled
                    activePage={page}
                    itemsCountPerPage={limit}
                    totalItemsCount={countOffers - 1}
                    pageRangeDisplayed={limit != 0 ? Math.ceil((countOffers - 1) / limit) : (countOffers - 1)}
                    onChange={e => this.changePage(e)}
                    innerClass="pagination"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeLinkClass="page-item active"
                  />
                </div>
              </Col>
              <Col sm="4">
                {}
              </Col>
            </Row>
          </div>
        </div>
        </div>
    );
  }
}

export { Offers };      
