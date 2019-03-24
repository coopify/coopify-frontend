
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

  notify(message, isError){
    const {dispatch} = this.props;
    if(isError){
      toast.error(message);
      dispatch(resetError());
    }
    else{
      toast.success(message)
    }
  }

  componentDidMount(){
    const { dispatch } = this.props;


    const reqAttributes = {
    }

    dispatch(attemptOffersAction(reqAttributes));
  }


  render() {
    const { error, offers } = this.props
    const data = offers
    const columns = [{
      accessor: 'image',
      Cell: props => (
        <div>
          <img src={props.value} alt="offer image" height="200" width="200"></img>
        </div>
      )
    },{
      accessor: 'description',
      Cell: props => (
      <div>
        <div class = "container">
        <div class="row">
          <div class="col-sm-4"><h2>{props.original.title}</h2></div>
          <div class="col-sm-4"><h4>By {props.original.by}</h4></div>
          <div class="col-sm-4"><h4>Stars {props.original.stars}</h4></div>
        </div>
        <div class="row">
          <div class="col-sm-12 parent-bodytext">
          <p>{props.original.description}</p>
        </div>
          <div class="row">
          <div class="col-sm-12"><h4>Coopies {props.original.coopies}</h4></div>
          </div>
        </div>
      </div>
      </div>
      )
    }]
    if(error.length > 0) this.notify(error, true)

    return (
      <Protected>
      <GuestLayout>
        <div className={styles.container}>
        <form >

              <h2 style={{textAlign: 'center'}}> Offers </h2>

          <ReactTable
            defaultPageSize={10}
            data={data}
            columns={columns}
          />

        </form>
        </div>
        <ToastContainer autoClose={3000}/>
      </GuestLayout>
     </Protected>
    );
  }
}

export { Offers }