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

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import LoadingScreen from 'react-loading-screen';

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
    const TheadComponent = props => null;
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

  <LoadingScreen
          loading={this.props.loading}
          bgColor='#125876'
          spinnerColor='#BE1931'
          textColor='#ffffff'
          text= {"Loading..."}> 

          <div className={styles.container}>
            <form >

              <h2 style={{ textAlign: 'center' }}> Proposals </h2>

              {/* <ReactTable
                defaultPageSize={this.state.limit}
                data={data}
                columns={columns}
                TheadComponent={TheadComponent}
                onPageChange={e => this.changePage(e)}
                onPageSizeChange={e => this.changeSize(e)}
                pages={ this.state.limit != 0 ? Math.ceil(countProposals / this.state.limit) : countProposals }
                noDataText = 'Has no proposals'
                manual
              /> */}

<div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', overflow: 'hidden', backgroundColor: 'white'}}>
  <GridList cellHeight={180} style={{height: '80%', width: '100%'}}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Proposals</ListSubheader>
        </GridListTile>
        {proposals.map(tile => (
          <GridListTile>
            <img src=
            {tile.purchasedOffer.images ? tile.purchasedOffer.images[0] ? tile.purchasedOffer.images[0].url : "": ""} 
            alt={tile.title} />
            <GridListTileBar
              title={tile.purchasedOffer.title}
              subtitle={<span>by: {tile.proposer.name}</span>}
              actionIcon={

            <Proposal
            proposal={tile}
            buttonText={<InfoIcon/>}
            isInfo={true}/>

              }
            />

          </GridListTile>
        ))}
</GridList>
</div>

            </form>
            <ToastContainer autoClose={3000} />
          </div>

          </LoadingScreen>
        </GuestLayout>
        </Protected>
    );
  }
}

export { Proposals }