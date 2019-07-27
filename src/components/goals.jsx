import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import styles from '../resources/css/profile.scss';
import { resetNotificationFlagsGoals, attemptGoalsAction, attemptGoalsUserAction } from '../actions/user';
import GuestLayout from './guest-layout';

export default @connect(state => ({
  error: state.goal.error,
  loading: state.goal.loading,
  goals: state.goal.goals,
  goalsUser: state.goal.goalsUser,
  loggedUser: state.user.loggedUser,
}))

class Goals extends React.Component {
  goal = undefined

  static propTypes = {
    dispatch: PropTypes.func,
    goals: PropTypes.arrayOf(PropTypes.object),
    goalsUser: PropTypes.arrayOf(PropTypes.object),
    loggedUser: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    dispatch: () => {
    },
    goals: [],
    goalsUser: [],
    loggedUser: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const { dispatch, loggedUser } = this.props;
    const { limit } = this.state;
    const token = localStorage.getItem('token');
    let reqAttributes = {};
    if (token) {
      reqAttributes = {
        limit,
        page: 0,
        userId: loggedUser.id,
        token,
      };
      dispatch(attemptGoalsUserAction(reqAttributes));
    }
    dispatch(attemptGoalsAction());
  }

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetNotificationFlagsGoals());
    } else {
      toast.success(message);
    }
  }

  findGoalUser(goalId) {
    const { goalsUser } = this.props;
    this.goal = goalsUser.find(g => g.goalId === goalId);
    return this.goal !== undefined;
  }

  render() {
    // a component returning null (to hide) or you could write as per your requirement
    const TheadComponent = props => null;
    const { goals, loggedUser } = this.props;
    const { limit } = this.state;
    const data = goals;
    const columns = [{
      accessor: 'description',
      Cell: props => (
        <div>
          <div className="container" style={{ textAlign: 'left', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            <div className="row">
              <div className="col-sm-12" style={{ fontSize: 'x-large' }}>
                <p>
                  {' '}
                  {props.original.name}
                </p>
              </div>
            </div>
            {loggedUser && this.findGoalUser(props.original.id)
              ? (
                <div className="row">
                  <div className="col-sm-8">
                    <p>
                      {' '}
                      {props.original.description}
                    </p>
                  </div>
                  <div className="col-sm-2" style={{ fontSize: 'x-large' }}>
                    <p>
                      {props.original.amount}
                      {'C'}
                    </p>
                  </div>
                  <div className="col-sm-2">
                    <p>
                      {'x'}
                      {this.goal.quantity}
                      {'('}
                      {props.original.amount * this.goal.quantity}
                      {'C)'}
                    </p>
                  </div>
                </div>
              )
              : (
                <div className="row">
                  <div className="col-sm-8">
                    <p>
                      {props.original.description}
                    </p>
                  </div>
                  <div className="col-sm-4" style={{ fontSize: 'x-large' }}>
                    <p>
                      {props.original.amount}
                      {'C'}
                    </p>
                  </div>
                </div>
              )
              }
          </div>
        </div>
      ),
    }];

    return (
      <GuestLayout>
        <div className={styles.container}>
          <form>
            <h2 style={{ textAlign: 'center' }}> Goals </h2>
            <ReactTable
              defaultPageSize={limit}
              data={data}
              columns={columns}
              TheadComponent={TheadComponent}
              onPageChange={e => this.changePage(e)}
              onPageSizeChange={e => this.changeSize(e)}
              noDataText="No goals"
              manual
              showPagination={false}
              minRows={0}
            />
          </form>
          <ToastContainer autoClose={3000} />
        </div>
      </GuestLayout>
    );
  }
}

export { Goals };
