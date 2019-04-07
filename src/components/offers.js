
import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptOffersAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
import '../css/form-elements.css'
import 'font-awesome/css/font-awesome.min.css';
import styles from '../css/profile.scss';
import Protected from './protected';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  offers: state.offers,
  countOffers: state.countOffers,
  filters: state.filters
}))

class Offers extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    offers: PropTypes.array,
    countOffers: PropTypes.number
  };

  static defaultProps = {
    dispatch: () => {
    },
    offers: [],
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      error: '',
      limit: 10
    };
  }

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetError());
    }
    else {
      toast.success(message)
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const reqAttributes = {
      limit: this.state.limit,
      page: 0,
      filters: this.props.filters
    }

    dispatch(attemptOffersAction(reqAttributes));
  }

  changePage(pageIndex) {
    const { dispatch } = this.props;
    const reqAttributes = {
      limit: this.state.limit,
      page: pageIndex,
      filters: this.props.filters
    }

    dispatch(attemptOffersAction(reqAttributes));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters != this.props.filters) {
      const { dispatch } = this.props;
      const reqAttributes = {
        limit: this.state.limit,
        page: pageIndex,
        filters: this.props.filters
      }

      dispatch(attemptOffersAction(reqAttributes));
    }
  }

  changeSize(pageSize) {
    this.setState((state) => {
      return { ...state, limit: pageSize }
    })
  }

  render() {
    const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
    const { error, offers, countOffers } = this.props
    const data = offers
    const columns = [{
      accessor: 'image',
      Cell: props => (
        <div style={{ textAlign: 'right' }}>
          <img src={props.original.images.length > 0 ? props.original.images[0].url : 'https://cdn2.vectorstock.com/i/1000x1000/01/61/service-gear-flat-icon-vector-13840161.jpg'} alt="offer image" height="200" width="200"></img>
        </div>
      ),
      maxWidth: 200
    }, {
      accessor: 'description',
      Cell: props => (
        <div>
          <div className="container" style={{ textAlign: 'left' }}>
            <div className="row">

              <div className="col-sm-4"><h2><Link to={`/offers/${props.original.id}`} className="navbar-item"><i className="fa"></i>{props.original.title}</Link></h2></div>
              <div className="col-sm-4"><h4>By {props.original.by}</h4></div>
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

              {props.original.paymentMethod == "Coopy" ?
                <div>
                  {props.original.prices.length > 0 && props.original.prices[0].price != "0" ? <div className="col-sm-12"><span>{props.original.prices[0].price} Coopies x {props.original.prices[0].frequency}</span></div> : ''}
                  {props.original.prices.length > 1 && props.original.prices[1].price != "0" ? <div className="col-sm-12"><span>{props.original.prices[1].price} Coopies x {props.original.prices[1].frequency}</span></div> : ''}
                  {props.original.prices.length > 2 && props.original.prices[2].price != "0" ? <div className="col-sm-12"><span>{props.original.prices[2].price} Coopies x {props.original.prices[2].frequency}</span></div> : ''}
                </div>
                :
                <div className="col-sm-12"><span>Barter</span></div>
              }

            </div>
          </div>
        </div>
      )
    }]
    if (error.length > 0) this.notify(error, true)

    return (
      <Protected>
        <GuestLayout>
          <div className={styles.container}>
            <form >

              <h2 style={{ textAlign: 'center' }}> Offers </h2>

              <ReactTable
                defaultPageSize={this.state.limit}
                data={data}
                columns={columns}
                TheadComponent={TheadComponent}
                onPageChange={e => this.changePage(e)}
                onPageSizeChange={e => this.changeSize(e)}
                pages={Math.ceil(countOffers / this.state.limit)}
                manual
              />

            </form>
            <ToastContainer autoClose={3000} />
          </div>
        </GuestLayout>
      </Protected>
    );
  }
}

export { Offers }