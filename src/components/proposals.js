import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptProposalsAction } from '../actions/user';
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
import { Proposal } from './proposal';

export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  proposals: state.proposals,
  countProposals: state.countProposals,
  loggedUser: state.user,
}))

class Proposals extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    proposals: PropTypes.array,
    countProposals: PropTypes.number,
    loggedUser: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {
    },
    proposals: [],
    error: '',
    loggedUser: {},
    countProposals: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
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
    const userToken = localStorage.getItem("token");
    const reqAttributes = {
      limit: this.state.limit,
      page: 0,
      token: userToken,
    }

    dispatch(attemptProposalsAction(reqAttributes));
  }

  changePage(pageIndex) {
    const { dispatch } = this.props;
    const userToken = localStorage.getItem("token");
    const reqAttributes = {
      limit: this.state.limit,
      page: pageIndex,
      token: userToken,
    }

    dispatch(attemptProposalsAction(reqAttributes));
  }

  // componentDidUpdate() {
  //     const { dispatch } = this.props;
  //     const userToken = localStorage.getItem("token");
  //     const reqAttributes = {
  //       limit: this.state.limit,
  //       page: 0,
  //       token: userToken,
  //     }
  //     dispatch(attemptProposalsAction(reqAttributes));
  //   }

  changeSize(pageSize) {
    this.setState((state) => {
      return { ...state, limit: pageSize }
    })
  }

  render() {
    const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
    const { error, proposals, countProposals } = this.props
    const data = proposals
    const columns = [{
      accessor: 'proposals',
      Cell: props => (
        <div>
            <div className="container" style={{ textAlign: 'left' }}>
                <div className="row">
                    <div className="col-sm-8">{props.original.proposer.name} proposed for the following:
                    <Link style={{padding: "0"}} to={`/offers/${props.original.offerId}`} className="navbar-item"><i className="fa"></i>Offer: {props.original.purchasedOffer.title}</Link></div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Proposed Exchange Method: {props.original.exchangeMethod}</div>
                </div>
                <div className="row">
                    {props.original.proposedPrice ? <div className="col-sm-4">Proposes {props.original.proposedPrice} Coopies per {props.original.exchangeInstance}</div> : ''}
                </div>
                <div className="row">
                    {props.original.exchangeMethod == 'Exchange' ? <div className="col-sm-4">Proposed Service: {props.original.proposedService.title}</div> : ''}
                </div>
                <div>
                  <Proposal
                  proposal={props.original}
                  buttonText= "See proposal"
                  />
                </div>
            </div>
        </div>
      )
    }]

    return (
      <Protected>
      <GuestLayout>
          <div className={styles.container}>
            <form >

              <h2 style={{ textAlign: 'center' }}> Proposals </h2>

              <ReactTable
                defaultPageSize={this.state.limit}
                data={data}
                columns={columns}
                TheadComponent={TheadComponent}
                onPageChange={e => this.changePage(e)}
                onPageSizeChange={e => this.changeSize(e)}
                pages={ this.state.limit != 0 ? Math.ceil(countProposals / this.state.limit) : countProposals }
                noDataText = 'Has no proposals'
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

export { Proposals }