

import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { attemptSendMessage, attemptGetUserChat, attemptGetUsersOffers, attemptMakeProposal } from '../actions/user';
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
  proposal: state.proposal,
}))

class Chat extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
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
    this.onChangeExchangeMethod = this.onChangeExchangeMethod.bind(this);
    this.onChangeExchangeInstance = this.onChangeExchangeInstance.bind(this);
    this.handleMakeOfferProposal = this.handleMakeOfferProposal.bind(this);
  }

getSteps() {
    return ['Select the offer you want to trade', 'Select the exchange method', 'Confirm the offer'];
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
        modalOpen: false,
        activeStep: 0
    }); 
    };

    handleNext = () => {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
        }));
      };
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
    };

    onChangeExchangeMethod(e){
        this.setState({
            ...this.state,
            exchangeMethodSelected: e
        });
    }

    onChangeExchangeInstance(e){
        this.setState({
            ...this.state,
            exchangeInstanceSelected: e
        });
    }

    handleServiceChange(e){
      this.setState({
        ...this.state,
        selectedService: e.target.value,
        selectedServiceText: e.target.text,
    });
    }

    handleBarterService(e){
      this.setState({
        ...this.state,
        myExchangeService: e.target.value,
        exchangeServiceText: e.target.text
    });
    }

    onChangeCoopiValue(e){
      this.setState({
        ...this.state,
        coopiValue: e.target.value
    });
    }

    onChangeChatInput(e){
      this.setState({
        ...this.state,
        chatMessage: e.target.value
    });
    }

    async componentDidMount(){
      const { dispatch, loggedUser } = this.props;
      const token = localStorage.getItem('token');
      const conversationId = this.props.match.params.conversationId;

      const payload = 
      {
        token: token,
        conversationId: conversationId
      };
  
      const conversation = await getConversation(payload);

      const users = 
      {
        token: token,
        myUserId: loggedUser.id,
        serviceUserId: conversation.to.id == loggedUser.id ? conversation.from.id : conversation.to.id,
      }
      
      dispatch(attemptGetUserChat(payload));
      dispatch(attemptGetUsersOffers(users));
      //dispatch(GetProposal(payload));
  }

    async handleSendMessage(e){
      const { dispatch } = this.props;
      const token = localStorage.getItem("token");
     
      const payload =
      {
        token: token,
        message: 
        {
          text: this.state.chatMessage
        },
        conversationId: this.props.match.params.conversationId
      };

      dispatch(attemptSendMessage(payload));
      this.setState({...this.state, chatMessage: ''});
    }

    handleMakeOfferProposal(e){
      this.handleReset(e);
      const token = localStorage.getItem("token");
      const { selectedService, exchangeMethodSelected, myExchangeService, exchangeInstanceSelected, coopiValue } = this.state;
      const { dispatch } = this.props;
      const isCoopi = exchangeMethodSelected == 'Coopy' ? true : false;

      const payload = 
      {
        token: token,
        proposal:
        {
          offerId: selectedService,
          exchangeMethod: exchangeMethodSelected,
          proposedServiceId: isCoopi ? undefined : myExchangeService,
          exchangeInstance: isCoopi ? exchangeInstanceSelected : undefined,
          proposedPrice: isCoopi ? coopiValue : undefined,
        },
        conversationId: this.props.match.params.conversationId,
      }

      dispatch(attemptMakeProposal(payload));
    }

    getStepContent(index){

        let componentToRender = "";
        switch(index){
            case 0:

         componentToRender = 
            (<Select style={{width: "100%"}}
            value={this.state.selectedService}
            onChange={e => this.handleServiceChange(e)}>
                {
                  this.props.userOffers.map(o => (
                    <MenuItem value={o.id}>{o.title}</MenuItem>
                  ))
                }
            </Select>);
            break;

            case 1:

            const coopiSelected = this.state.exchangeMethodSelected == "Coopy" ? "inline-flex" : "none";
            const barterSelected = this.state.exchangeMethodSelected == "Exchange" ? "block" : "none";

            componentToRender = 
                (
                <div>
                <RadioGroup onChange={e => this.onChangeExchangeMethod(e) } vertical>
                <RadioButton value="Coopy">
                Coopi
                </RadioButton>
                <RadioButton value="Exchange">
                Barter
                </RadioButton>
            </RadioGroup>
            
            <RadioGroup onChange={e => this.onChangeExchangeInstance(e) } horizontal style={{display: coopiSelected}}>
            <RadioButton value="Hour">
            Hour
            </RadioButton>
            <RadioButton value="Session">
            Session
            </RadioButton>
            <RadioButton value="FinalProduct">
            Final Product
            </RadioButton>
        </RadioGroup>
        
        <TextField
        id="filled-with-placeholder"
        type="number"
        label="Coopi value"
        placeholder="Enter the value in Coopi"
        margin="normal"
        onChange = {e => this.onChangeCoopiValue(e)}
        style={{display: coopiSelected}}/>

        <Select style={{width: "100%", display: barterSelected}}
          value={this.state.myExchangeService}
          onChange={e => this.handleBarterService(e)}>
                {
                  this.props.myOffers.map(o => (
                    <MenuItem value={o.id}>{o.title}</MenuItem>
                  ))
                }
            </Select>  
        </div>
        );
            break;

            case 2:
        componentToRender = 
        (
          <Paper>
            <Typography variant="h5" component="h3">
              {this.state.selectedServiceText}
            </Typography>        

        {
          this.state.exchangeMethodSelected == 'Coopy' ?
          (
            <Typography component="p">
              {this.state.exchangeInstanceSelected} <br/>
              por <br/>
              {this.state.coopiValue} COOPI
            </Typography>
          ) : 
          (
            <Typography component="p">
            por <br/>
            {this.state.exchangeServiceText}
          </Typography>
          )}

          </Paper>
        );

            break;
        }
        return componentToRender;
    }



  render() {
    const { loading, error, loggedUser, messages, proposal } = this.props
    const { offer, categories, activeStep } = this.state
    const steps = this.getSteps();
    const proposalMade = false;

    return (
      <Protected>
      <GuestLayout>

          <div className='message-list' style={{height:"300px", overflowY: "auto"}}>

            {
                 messages.map((m) => {
                  return {
                    mine: m.authorId === loggedUser.id,
                    message: m.text,
                    date: new Date(m.createdAt ? m.createdAt : Date.now()),
                  }
              }).map(item => (
                    <MessageBox
                    style={{marginBottom: "2%"}}
                        position={item.mine ? 'right' : 'left'}
                        type={'text'}
                        text={item.message}
                        date= {item.date}/>
                ))
            }
              </div>

          {proposalMade ? 
            (
              <CommonButton style={{width: "100%"}} onClick={e => this.handleClickOpen(e)}>
              Show offer proposal <i className="fa fa-handshake-o" aria-hidden="true"></i>
              </CommonButton>
            ) : 
            (
              <CommonButton style={{width: "100%"}} onClick={e => this.handleClickOpen(e)}>
              Make an offer <i className="fa fa-handshake-o" aria-hidden="true"></i>
              </CommonButton>
            ) }

          {proposalMade ? 
          (




            <Dialog
            open={this.state.modalOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Offer proposal</DialogTitle>
            <DialogContent>
              <DialogContentText>
                You have the following offer proposal:
              </DialogContentText>
  
          <div>
            <CommonButton onClick={this.handleClose} color="primary">
            <i class="fa fa-times"></i> &nbsp; Decline
              </CommonButton>
              <CommonButton onClick={this.handleMakeOfferProposal} color="primary">
              <i class="fa fa-check"></i> &nbsp; Accept
              </CommonButton>
          </div>
  
            </DialogContent>
          </Dialog>

          ) :
          (
            <Dialog
            open={this.state.modalOpen}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Offer details</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Complete the steps below to send an offer proposal to this user.
              </DialogContentText>
  
          <div>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>              
                  <div>
  
              {this.getStepContent(activeStep)}
  
                  {activeStep === steps.length - 1 ? "" : (
  
                      <div style={{paddingTop: "5%"}}>
                      <CommonButton
                      disabled={activeStep === 0}
                      onClick={this.handleBack}>
                      Back
                      </CommonButton>
                      <CommonButton
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}>
                      Next
                      </CommonButton>
                  </div>
  
                  )}
  
                  </div>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          </div>
  
            </DialogContent>
            <DialogActions>
              <CommonButton onClick={this.handleClose} color="primary">
                Cancel
              </CommonButton>
              <CommonButton onClick={this.handleMakeOfferProposal} color="primary">
                Make the offer
              </CommonButton>
            </DialogActions>
          </Dialog>
          )}

            <Input
            placeholder="Type here..."
            multiline={false}
            onChange={e => this.onChangeChatInput(e)}
            rightButtons={
                <Button
                    color='white'
                    backgroundColor='transparent'
                    onClick = {e => this.handleSendMessage(e)}
                    text={<i className="fa fa-caret-right" style={{fontSize:"48px", color: "blue"}}></i>}/>
            }/>

      </GuestLayout>
     </Protected>
    );
  }
}

export { Chat }