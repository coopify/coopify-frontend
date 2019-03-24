
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

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  offers: state.offers
}))

class Offers extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    offers: PropTypes.array
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
      error: ''
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
    }

    dispatch(attemptOffersAction(reqAttributes));
  }


  render() {
    const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
    const { error, offers } = this.props
    const data = offers
    const columns = [{
      accessor: 'image',
      Cell: props => (
        <div style={{ textAlign: 'right' }}>
          <img src={props.value} alt="offer image" height="200" width="200"></img>
        </div>
      ),
      maxWidth: 200
    }, {
      accessor: 'description',
      Cell: props => (
        <div>
          <div className="container" style={{ textAlign: 'left' }}>
            <div className="row">
              <div className="col-sm-4"><h2>{props.original.title}</h2></div>
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
              <div className="col-sm-12"><h4>Coopies {props.original.coopies}</h4></div>
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
                defaultPageSize={10}
                data={data}
                columns={columns}
                TheadComponent={TheadComponent}
              />

            </form>
          </div>
          <ToastContainer autoClose={3000} />
        </GuestLayout>
      </Protected>
    );
  }
}

export { Offers }