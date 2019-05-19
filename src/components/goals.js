import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptGoalsAction, attemptGoalsUserAction } from '../actions/user';
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
import guestLayout from './guest-layout';

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  goals: state.goals,
  goalsUser: state.goalsUser,
  loggedUser: state.user,
}))

class Goals extends React.Component {
  goal = undefined

  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    goals: PropTypes.array,
    goalsUser: PropTypes.array,
    loggedUser: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {
    },
    goals: [],
    goalsUser: [],
    error: '',
    loggedUser: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      goals: [],
      goalsUser: [],
      error: '',
      limit: 20,
      loggedUser: {},
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
    const { dispatch, loggedUser } = this.props;
    const token = localStorage.getItem("token");
    let reqAttributes = {}
    if (token) {
      reqAttributes = {
        limit: this.state.limit,
        page: 0,
        userId: loggedUser.id,
        token: token,
    }
    dispatch(attemptGoalsUserAction(reqAttributes));
  }
    dispatch(attemptGoalsAction());
  }

  findGoalUser(goalId)
  {
    this.goal = this.props.goalsUser.find((g) => g.goalId === goalId)
    return this.goal != undefined
  }

  render() {
    const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
    const { error, goals, loggedUser } = this.props
    const data = goals
    const columns = [ {
      accessor: 'description',
      Cell: props => (
        <div>
          <div className="container" style={{ textAlign: 'left', whiteSpace: 'pre-wrap', wordBreak: 'break-all'}}>
          <div className="row">
              <div className="col-sm-12" style={{fontSize: 'x-large'}}><p> {props.original.name}</p></div>
          </div>
              {loggedUser && this.findGoalUser(props.original.id) ?
                <div className="row">
                    <div className="col-sm-8"><p> {props.original.description}</p></div>
                    <div className="col-sm-2" style={{fontSize: 'x-large'}}><p> {props.original.amount} C</p></div>
                    <div className="col-sm-2"><p> x{this.goal.quantity} ({props.original.amount * this.goal.quantity} C)</p></div>
                </div>
                  :
                <div className="row"> 
                    <div className="col-sm-8"><p> {props.original.description}</p></div>
                    <div className="col-sm-4" style={{fontSize: 'x-large'}}><p> {props.original.amount} C</p></div>
                </div> 
              }
          </div>
        </div>
      )
    }]

    return (
      <GuestLayout>
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
                noDataText = 'No goals'
                manual
            />
            </form>
            <ToastContainer autoClose={3000} />
        </div>
      </GuestLayout>
        );
      }
    }

export { Goals }