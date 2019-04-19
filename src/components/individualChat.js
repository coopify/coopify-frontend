

import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { resetError, attemptPublishOffer } from '../actions/user';
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
  loading: state.loading
}))

class Chat extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {}
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
      exchangeInstanceSelected: "Hour"
    };
    this.onChangeExchangeMethod = this.onChangeExchangeMethod.bind(this);
    this.onChangeExchangeInstance = this.onChangeExchangeInstance.bind(this);
  }

getSteps() {
    return ['Select the offer you want to trade', 'Select the exchange method', 'Confirm the offer'];
  }
  
// getStepContent(step) {
//     switch (step) {
//       case 0:
//         return `For each ad campaign that you create, you can control how much
//                 you're willing to spend on clicks and conversions, which networks
//                 and geographical locations you want your ads to show on, and more.`;
//       case 1:
//         return 'An ad group contains one or more ads which target a shared set of keywords.';
//       case 2:
//         return `Try out different ad text to see what brings in the most customers,
//                 and learn how to enhance your ads using features like ad extensions.
//                 If you run into any problems with your ads, find out how to tell if
//                 they're running and how to resolve approval issues.`;
//       default:
//         return 'Unknown step';
//     }
//   }


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

    getStepContent(index){

        let componentToRender = "";
        switch(index){
            case 0:

         componentToRender = 
            (<Select style={{width: "100%"}}>
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Guitar lessons</MenuItem>
                <MenuItem value={20}>Lawyer</MenuItem>
                <MenuItem value={30}>Dog walk</MenuItem>
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
        style={{display: coopiSelected}}/>

        <Select style={{width: "100%", display: barterSelected}}>
                <MenuItem value="">
                <em>None</em>
                </MenuItem>
                <MenuItem value={10}>My Guitar lessons</MenuItem>
                <MenuItem value={20}>My Lawyer</MenuItem>
                <MenuItem value={30}>My Dog walk</MenuItem>
            </Select>  
        </div>
        );
            break;

            case 2:

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
            <CommonButton onClick={this.handleClose} color="primary">
              Make the offer
            </CommonButton>
          </DialogActions>
        </Dialog>


            <Input
            placeholder="Type here..."
            multiline={false}
            rightButtons={
                <Button
                    color='white'
                    backgroundColor='transparent'
                    text={<i className="fa fa-caret-right" style={{fontSize:"48px", color: "blue"}}></i>}/>
            }/>

      </GuestLayout>
     </Protected>
    );
  }
}

export { Chat }