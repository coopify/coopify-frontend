import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptGoalsAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import styles from '../css/profile.scss';
import Protected from './protected';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom';
import LoadingScreen from 'react-loading-screen';

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  goals: state.goals,
  countGoals: state.countGoals,
}))

class Goals extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    goals: PropTypes.array,
    countGoals: PropTypes.number,
  };

  static defaultProps = {
    dispatch: () => {
    },
    goals: [],
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      error: '',
      limit: 20
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
    }

    dispatch(attemptGoalsAction(reqAttributes));
  }

  changePage(pageIndex) {
    const { dispatch } = this.props;
    const reqAttributes = {
      limit: this.state.limit,
      page: pageIndex,
    }

    dispatch(attemptGoalsAction(reqAttributes));
  }

  changeSize(pageSize) {
    this.setState((state) => {
      return { ...state, limit: pageSize }
    })
  }

  render() {
    const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
    const { error, goals, countGoals } = this.props
    const data = goals
    const columns = [ {
      accessor: 'description',
      Cell: props => (
        <div>
          <div className="container" style={{ textAlign: 'left', whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>
          <div className="row">
                <div className="col-sm-4" style={{fontSize: 'x-large'}}><p> {props.original.name}</p></div>
            </div>
            <div className="row">
                <div className="col-sm-8"><p> {props.original.description}</p></div>
                <div className="col-sm-2" style={{fontSize: 'x-large'}}><p> {props.original.amount} C</p></div>
                <div className="col-sm-2"><p> x{props.original.quantity} ({props.original.amount * props.original.quantity} C)</p></div>
            </div>
          </div>
        </div>
      )
    }]

    return (
    <Protected>
        <GuestLayout>
            <LoadingScreen
            loading={this.props.loading}
            bgColor='rgba(255, 255, 255, .5)'
            spinnerColor='#BE1931'
            textColor='#BE1931'
            text= {"Loading..."}> 

                <div className={styles.container}>
                    <form >

                    <h2 style={{ textAlign: 'center' }}> Goals </h2>

                    <ReactTable
                        defaultPageSize={this.state.limit}
                        data={data}
                        columns={columns}
                        TheadComponent={TheadComponent}
                        onPageChange={e => this.changePage(e)}
                        onPageSizeChange={e => this.changeSize(e)}
                        pages={ this.state.limit != 0 ? Math.ceil(countGoals / this.state.limit) : countGoals }
                        noDataText = 'No goals'
                        manual
                    />

                    </form>
                    <ToastContainer autoClose={3000} />
                </div>
                </LoadingScreen>
            </GuestLayout>
        </Protected>
            );
        }
        }

export { Goals }