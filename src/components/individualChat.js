

import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { attemptSendMessage } from '../actions/user';
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

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  conversations: state.conversations,
}))

class Chat extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object,
    conversations: PropTypes.array,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {},
    conversations: []
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
      exchangeMethodSelected: "Coopi",
      exchangeInstanceSelected: "Hour",
      selectedService: '',
      myExchangeService: '',
      coopiValue: 0,
      chatMessage: ''
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
        selectedService: e.target.value
    });
    }

    handleBarterService(e){
      this.setState({
        ...this.state,
        myExchangeService: e.target.value
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


    }

    getStepContent(index){

        let componentToRender = "";
        switch(index){
            case 0:

         componentToRender = 
            (<Select style={{width: "100%"}}
            value={this.state.selectedService}
            onChange={e => this.handleServiceChange(e)}>
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value="Guitar lessons">Guitar lessons</MenuItem>
                <MenuItem value="Lawyer">Lawyer</MenuItem>
                <MenuItem value="Dog walk">Dog walk</MenuItem>
            </Select>);
            break;

            case 1:

            const coopiSelected = this.state.exchangeMethodSelected == "Coopi" ? "inline-flex" : "none";
            const barterSelected = this.state.exchangeMethodSelected == "Barter" ? "block" : "none";

            componentToRender = 
                (
                <div>
                <RadioGroup onChange={ this.onChangeExchangeMethod } vertical>
                <RadioButton value="Coopi">
                Coopi
                </RadioButton>
                <RadioButton value="Barter">
                Barter
                </RadioButton>
            </RadioGroup>
            
            <RadioGroup onChange={ this.onChangeExchangeInstance } horizontal style={{display: coopiSelected}}>
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
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value="My Guitar lessons">My Guitar lessons</MenuItem>
                <MenuItem value="My Lawyer">My Lawyer</MenuItem>
                <MenuItem value="My Dog walk">My Dog walk</MenuItem>
            </Select>  
        </div>
        );
            break;

            case 2:
        componentToRender = 
        (
          <Paper>
            <Typography variant="h5" component="h3">
              {this.state.selectedService}
            </Typography>        

        {
          this.state.exchangeMethodSelected == 'Coopi' ?
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
            {this.state.myExchangeService}
          </Typography>
          )}

          </Paper>
        );

            break;
        }
        return componentToRender;
    }



  render() {
    const { loading, error, loggedUser } = this.props
    const { offer, categories, activeStep } = this.state
    const steps = this.getSteps();

    const usersChat =
     [
         {mine: true, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: false, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: true, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: false, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: true, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: true, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: false, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: true, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: false, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: true, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: false, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: false, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: false, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
         {mine: true, message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit"},
     ];

    return (
      <Protected>
      <GuestLayout>

          <div className='message-list' style={{height:"300px", overflowY: "auto"}}>

            {
                usersChat.map(item => (
                    <MessageBox
                    style={{marginBottom: "2%"}}
                        position={item.mine ? 'right' : 'left'}
                        type={'text'}
                        text={item.message}
                        date= {new Date()}/>
                ))
            }
              </div>

            <CommonButton style={{width: "100%"}} onClick={e => this.handleClickOpen(e)}>
                Make an offer <i className="fa fa-handshake-o" aria-hidden="true"></i>
            </CommonButton>

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