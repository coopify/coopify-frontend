import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { attemptAcceptProposal, attemptRejectProposal, attemptCancelProposal } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import styles from '../css/profile.scss';
import Switch from "react-switch";
import Protected from './protected';
import { Link } from 'react-router-dom';
import {loadScript} from "@pawjs/pawjs/src/utils/utils";
import StepZilla from "react-stepzilla";
import {loadStyle} from "@pawjs/pawjs/src/utils/utils";
import BasicData from './offerCreation/basicData.js';
import ExchangeMethod from './offerCreation/exchangeMethod.js';
import { ChatList } from 'react-chat-elements'
import { MessageList } from 'react-chat-elements'
import { Input } from 'react-chat-elements'
import { Button } from 'react-chat-elements'

import CommonButton from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { MessageBox } from 'react-chat-elements'

import { getConversation } from '../api';


export default @connect(state => ({
  loggedUser: state.user,
  serviceUser: state.serviceUser,
  error: state.error,
  loading: state.loading,
  messages: state.messages,
  myOffers: state.myOffers,
  userOffers: state.userOffers,
 // proposal: state.proposal,
}))

class Proposal extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    serviceUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object,
    messages: PropTypes.array,
    myOffers: PropTypes.array,
    userOffers: PropTypes.array,
    proposal: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    serviceUser: {},
    loading: false,
    error: '',
    offer: {},
    messages: [],
    myOffers: [],
    userOffers: [],
    proposal: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
      modalOpen: false,
      activeStep: 0,
      exchangeMethodSelected: "Coopy",
      exchangeInstanceSelected: "Hour",
      selectedService: '',
      myExchangeService: '',
      coopiValue: 0,
      chatMessage: '',
      messages: [],
      selectedServiceText: '',
      exchangeServiceText: '',
    };
    this.handleDecline = this.handleDecline.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

 
  handleClickOpen = () => {
    this.setState({
        ...this.state,
        modalOpen: true 
    });
  };

  handleClose = () => {
    this.setState({
        ...this.state,
        modalOpen: false
    }); 
    };

    handleAccept(){
        const token = localStorage.getItem("token");
        const { dispatch, proposal } = this.props;
        
        const payload = 
        {
          token: token,
          proposalId: proposal.id,
        };
    
        dispatch(attemptAcceptProposal(payload));
    
        this.handleClose();
    }

    handleDecline(){
        const token = localStorage.getItem("token");
        const { dispatch, proposal } = this.props;
        
        const payload = 
        {
          token: token,
          proposalId: proposal.id,
        };
    
        dispatch(attemptRejectProposal(payload));
    
        this.handleClose();
    }

    handleCancel(){
        const token = localStorage.getItem("token");
        const { dispatch, proposal } = this.props;
        
        const payload = 
        {
          token: token,
          proposalId: proposal.id,
        };
    
        dispatch(attemptCancelProposal(payload));
    
        this.handleClose();
    }

  render() {
    const { proposal, buttonText, loggedUser } = this.props
    const { modalOpen } = this.state

    return (

        <div>
        <CommonButton style={{width: "100%" }} onClick={e => this.handleClickOpen(e)}>
        {buttonText} <i className="fa fa-handshake-o" aria-hidden="true"></i>
        </CommonButton>


            <Dialog
            open={modalOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Offer proposal</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You have the following offer proposal:

              <Paper>
                <Typography variant="h5" component="h3">
                  {proposal.purchasedOffer.title}
                </Typography>
    
            {
              proposal.exchangeMethod == 'Coopy' ?
              (
                <Typography component="p">
                  por <br/>
                  {proposal.proposedPrice} COOPI / {proposal.exchangeInstance}
                </Typography>
              ) : 
              (
                <Typography component="p">
                por <br/>
                {proposal.proposedService.title}
              </Typography>
              )}
    
              </Paper>
              </DialogContentText>

          <div>

{
    (proposal.proposerId != loggedUser.id) && (proposal.status == "Waiting") ?
    (
        <div>
        <CommonButton onClick={this.handleDecline} color="primary">
        <i class="fa fa-times"></i> &nbsp; Decline
          </CommonButton>
          <CommonButton onClick={this.handleAccept} color="primary">
          <i class="fa fa-check"></i> &nbsp; Accept
          </CommonButton>
          </div>
    ) :
    'Stauts: ' + proposal.status
}

{
    (proposal.proposerId == loggedUser.id) && (proposal.status == "Waiting") ?
    (
        <div>
        <CommonButton onClick={this.handleCancel} color="primary">
        Cancel this proposal
        </CommonButton>
        </div>
    ) :
    ""
}
            <div>
              <CommonButton onClick={this.handleClose} color="primary">
              Go back
              </CommonButton>
              </div>
          </div>

            </DialogContent>
          </Dialog>
        </div>
    );
  }
}

export { Proposal } 