
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
import Protected from './protected';
import styles from '../resources/css/profile.scss';
import { resetNotificationFlags, attemptOffersAction } from '../actions/user';
import GuestLayout from './guest-layout';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import ReactJoyride from 'react-joyride';

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
  };

  static defaultProps = {
    dispatch: () => {
    },
    offers: [],
    error: '',
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
      dispatch(resetNotificationFlags());
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
    const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
    const { error, offers, countOffers } = this.props;
    const data = offers;
    const columns = [{
      accessor: 'image',
      Cell: props => (
        <div style={{ textAlign: 'right' }}>
          <img src={props.original.images && props.original.images.length > 0 ? props.original.images[0].url : 'https://cdn2.vectorstock.com/i/1000x1000/01/61/service-gear-flat-icon-vector-13840161.jpg'} alt="offer image" height="200" width="200" />
        </div>
      ),
      maxWidth: 200,
    }, {
      accessor: 'description',
      Cell: props => (
        <div>
          <div className="container" style={{ textAlign: 'left' }}>
            <div className="row">

              <div className="col-sm-4">
                <h2>
                  <Link to={`/offers/${props.original.id}`} className="navbar-item">
                    <i className="fa" />
                    {props.original.title}
                  </Link>
                </h2>
              </div>
              <div className="col-sm-4">
                <h4>
By
                  {props.original.by}
                </h4>
              </div>
              <div className="col-sm-4">
                <StarRatingComponent
                  name="rate2"
                  editing={false}
                  renderStarIcon={() => <span>&#9733;</span>}
                  starCount={5}
                  value={props.original.stars}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <p style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{props.original.description}</p>
              </div>
            </div>
            <div className="row">

              {props.original.paymentMethod == 'Coopy' ? (
                <div>
                  {props.original.hourPrice && props.original.hourPrice != '0' ? (
                    <div className="col-sm-12">
                      <span>
                        {props.original.hourPrice}
                        {' '}
Coopies x hour
                      </span>
                    </div>
                  ) : ''}
                  {props.original.sessionPrice && props.original.sessionPrice != '0' ? (
                    <div className="col-sm-12">
                      <span>
                        {props.original.sessionPrice}
                        {' '}
Coopies x session
                      </span>
                    </div>
                  ) : ''}
                  {props.original.finalProductPrice && props.original.finalProductPrice != '0' ? (
                    <div className="col-sm-12">
                      <span>
                        {props.original.finalProductPrice}
                        {' '}
Coopies x Final Product
                      </span>
                    </div>
                  ) : ''}
                </div>
              )
                : <div className="col-sm-12"><span>Barter</span></div>
              }

            </div>
          </div>
        </div>
      ),
    }];

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
      <div
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
            }
          }}
        />

        <div className={styles.container}>
          <form>

            <h1 style={{ textAlign: 'center' }}> Services </h1>

            <Tooltip title="Add" aria-label="Add">
              <Link to="/offer/create">
              <Fab color="secondary" className="createOfferButton" style={{position: "fixed", bottom: "30px", right: "60px", zIndex: "1"}}>
                <AddIcon/>
              </Fab>
              </Link>
            </Tooltip>

            <div className="coopifyOffers">
              <ReactTable
                defaultPageSize={this.state.limit}
                data={data}
                columns={columns}
                TheadComponent={TheadComponent}
                onPageChange={e => this.changePage(e)}
                onPageSizeChange={e => this.changeSize(e)}
                pages={this.state.limit != 0 ? Math.ceil(countOffers / this.state.limit) : countOffers}
                noDataText="No offers for the selected filters"
                manual
                minRows={0}
              />
          </div>
          </form>
          <ToastContainer autoClose={3000} />
        </div>
      </div>
    );
  }
}

export { Offers };
