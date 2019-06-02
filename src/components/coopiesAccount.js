
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import ReactTable from 'react-table';
import styles from '../css/profile.scss';
import Protected from './protected';
import { resetError, attemptCheckBalanceAction, attemptCheckTransactionsAction } from '../actions/user';
import GuestLayout from './guest-layout';
import 'react-table/react-table.css';

export default @connect(state => ({
  loggedUser: state.user, // el state.user es el nuevo state que devuelve el reducer, y loggedUser el definido aca, se uso para mapear ambos y actualziarlos
  balance: state.balance,
  transactions: state.transactions,
  error: state.error,
  loading: state.loading,
}))

class CoopiesAccount extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    balance: PropTypes.string,
    transactions: PropTypes.array,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    balance: '-',
    transactions: [],
    error: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      balance: '-',
      transactions: [],
      error: '',
    };
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

  componentDidMount() {
    const { dispatch, loggedUser } = this.props;
    const token = localStorage.getItem('token');

    const reqAttributes = {
      userId: loggedUser.id,
      userToken: token,
    };
    if (loggedUser.id) {
      dispatch(attemptCheckBalanceAction(reqAttributes));
      dispatch(attemptCheckTransactionsAction(reqAttributes));
    }
  }


  render() {
    const {
      loading, error, loggedUser, balance, transactions,
    } = this.props;
    const data = transactions;
    const columns = [{
      Header: 'Date',
      accessor: 'date',
    }, {
      Header: 'Description',
      accessor: 'description',
    }, {
      Header: 'Coopies',
      accessor: 'coopies',
    }, {
      Header: 'From',
      accessor: 'from',
    }, {
      Header: 'In-Out',
      accessor: 'inOut',
    }, {
      Header: 'To',
      accessor: 'to',
    }];
    if (error.length > 0) this.notify(error, true);

    return (
      <Protected>
        <GuestLayout>
          <div className={styles.container}>
            <form>

              <h2 style={{ textAlign: 'center' }}> Transactions </h2>

              <div className="field">
                <label className="label" htmlFor="name">
Available Coopies (CPI):
                  {balance}
                </label>
              </div>

              <ReactTable
                defaultPageSize={10}
                data={data}
                columns={columns}
              />

            </form>
            <ToastContainer autoClose={3000} />
          </div>
        </GuestLayout>
      </Protected>
    );
  }
}

export { CoopiesAccount };
