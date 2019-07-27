import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import { loadScript } from '@pawjs/pawjs/src/utils/utils';
import StepZilla from 'react-stepzilla';
import { loadStyle } from '@pawjs/pawjs/src/utils/utils';
import { ChatList } from 'react-chat-elements';
import { MessageList } from 'react-chat-elements';
import { Input } from 'react-chat-elements';
import { Button } from 'react-chat-elements';

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
import { MessageBox } from 'react-chat-elements';

import { Loading } from './loading';
import { Proposal } from './proposal';

import { getConversation } from '../api';
import ExchangeMethod from './offerCreation/exchangeMethod.js';
import BasicData from './offerCreation/basicData.jsx';
import Protected from './protected';
import styles from '../resources/css/profile.scss';
import {
  attemptSendMessage, attemptGetUserChat, attemptGetUsersOffers, attemptMakeProposal, attemptGetConversationProposals,
} from '../actions/user';
import GuestLayout from './guest-layout';
import ReactJoyride from 'react-joyride';
import {
   Row, Col,
} from 'react-bootstrap';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  serviceUser: state.user.serviceUser,
  error: state.conversation.error,
  loading: state.conversation.loading,
  messages: state.conversation.messages,
  myOffers: state.service.myOffers,
  userOffers: state.service.userOffers,
  proposal: state.proposal.proposal,
  conversations: state.conversation.conversations,
}))

class Chat extends React.Component {
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
    conversations: PropTypes.array,
    conversationid: PropTypes.string,
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
    conversations: [],
    conversationid: '',
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
      exchangeMethodSelected: '',
      exchangeInstanceSelected: '',
      selectedService: '',
      myExchangeService: '',
      coopiValue: 0,
      chatMessage: '',
      messages: [],
      selectedServiceText: '',
      exchangeServiceText: '',
      userChat: {},
      selectedServiceFull: {},
      isOpenOffer: false,
    };
    this.onChangeExchangeMethod = this.onChangeExchangeMethod.bind(this);
    this.onChangeExchangeInstance = this.onChangeExchangeInstance.bind(this);
    this.handleMakeOfferProposal = this.handleMakeOfferProposal.bind(this);
  }

  getSteps() {
    return ['Select the offer you want to trade', 'Select the exchange method', 'Confirm the offer'];
  }

  handleClickOpen = (e, isOpenOffer) => {
    this.setState({
      ...this.state,
      modalOpen: true,
      isOpenOffer,
    });
  };

  handleClose = () => {
    this.setState({
      ...this.state,
      modalOpen: false,
      activeStep: 0,
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

  onChangeExchangeMethod(e) {
    this.setState({
      ...this.state,
      exchangeMethodSelected: e,
    });
  }

  onChangeExchangeInstance(e) {
    this.setState({
      ...this.state,
      exchangeInstanceSelected: e,
    });
  }

  handleServiceChange(e, rc) {

    const service = e.target.value;
    const serviceSelectedComplete = this.props.userOffers.find(o => o.id == service);

    this.setState({
      ...this.state,
      selectedService: service,
      selectedServiceText: rc.props.name,
      selectedServiceFull: serviceSelectedComplete,
    });
  }

  handleBarterService(e, rc) {
    this.setState({
      ...this.state,
      myExchangeService: e.target.value,
      exchangeServiceText: rc.props.name,
    });
  }

  onChangeCoopiValue(e) {
    this.setState({
      ...this.state,
      coopiValue: e.target.value,
    });
  }

  onChangeChatInput(e) {
    this.setState({
      ...this.state,
      chatMessage: e.target.value,
    });
  }

  async componentWillReceiveProps(nextProps) {
    const { dispatch, loggedUser, conversations, conversationid } = this.props;

    if(nextProps.conversationid && nextProps.conversationid.length > 0 && nextProps.conversationid != conversationid){
      const token = localStorage.getItem('token');
      const conversationId = nextProps.conversationid;

      const payload = {
        token,
        conversationId,
      };

      const conversation = await getConversation(payload);
      const userChat =  conversation.from.id === loggedUser.id ? conversation.to : conversation.from;
      
      this.setState({
        ...this.state,
        userChat
      });

      const users = {
        token,
        myUserId: loggedUser.id,
        serviceUserId: conversation.to.id == loggedUser.id ? conversation.from.id : conversation.to.id,
      };

      dispatch(attemptGetUserChat(payload));
      dispatch(attemptGetUsersOffers(users));
      dispatch(attemptGetConversationProposals(payload));
    }
  }

  async handleSendMessage(e) {
    const { dispatch } = this.props;
    const token = localStorage.getItem('token');

    const payload = {
      token,
      message:
      {
        text: this.state.chatMessage,
      },
      conversationId: this.props.conversationid,
    };

    dispatch(attemptSendMessage(payload));
    this.setState({ ...this.state, chatMessage: '' });
  }

  handleMakeOfferProposal(e) {
    this.handleReset(e);

    this.setState({
      ...this.state,
      modalOpen: false,
      activeStep: 0,
    });

    const token = localStorage.getItem('token');
    const {
      selectedService, exchangeMethodSelected, myExchangeService, exchangeInstanceSelected, coopiValue,
    } = this.state;
    const { dispatch } = this.props;
    const isCoopi = exchangeMethodSelected == 'Coopy';

    const payload = {
      token,
      proposal:
      {
        offerId: selectedService,
        exchangeMethod: exchangeMethodSelected,
        proposedServiceId: isCoopi ? undefined : myExchangeService,
        exchangeInstance: isCoopi ? exchangeInstanceSelected : undefined,
        proposedPrice: isCoopi ? coopiValue : undefined,
      },
      conversationId: this.props.conversationid,
    };

    dispatch(attemptMakeProposal(payload));
  }

  handleClickBack(e){
    const { onChatLeave } = this.props;
    onChatLeave(e);
  }

  getStepContent(index) {
    let componentToRender = '';
    const exchangeAvailableColor= '#007bff';
    const exchangeNotAvailableColor= '#e1e1e1';
    const { isOpenOffer, selectedServiceFull } = this.state;
    
    const colorCoopy = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' ? exchangeAvailableColor : exchangeNotAvailableColor) : exchangeNotAvailableColor;
    const colorBarter = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Barter' ? exchangeAvailableColor : exchangeNotAvailableColor) : exchangeNotAvailableColor;
    const colorHour = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' && this.state.selectedServiceFull.hourPrice != null ? exchangeAvailableColor : exchangeNotAvailableColor) : exchangeNotAvailableColor;
    const colorSession = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' && this.state.selectedServiceFull.sessionPrice != null ? exchangeAvailableColor : exchangeNotAvailableColor) : exchangeNotAvailableColor;
    const colorFinalProduct = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' && this.state.selectedServiceFull.finalProductPrice != null ? exchangeAvailableColor : exchangeNotAvailableColor) : exchangeNotAvailableColor;
        
    const showCoopy = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' ? true : false) : true;
    const showBarter = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Barter' ? true : false) : true;
    const showHour = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' && this.state.selectedServiceFull.hourPrice != null ? true : false) : true;
    const showSession = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' && this.state.selectedServiceFull.sessionPrice != null ? true : false) : true;
    const showFinalProduct = isOpenOffer ? (selectedServiceFull.paymentMethod === 'Coopy' && this.state.selectedServiceFull.finalProductPrice != null ? true : false) : true;


    switch (index) {
      case 0:

        componentToRender = (
          <Select
            style={{ width: '100%' }}
            value={this.state.selectedService}
            onChange={(e, f) => this.handleServiceChange(e, f)}
          >
            {
              this.props.userOffers.map(o => (
                <MenuItem value={o.id} name={o.title}>{o.title}</MenuItem>
              ))
            }
          </Select>
        );
        break;

      case 1:

        const coopiSelected = this.state.exchangeMethodSelected == 'Coopy' ? 'block' : 'none';
        const barterSelected = this.state.exchangeMethodSelected == 'Exchange' ? 'block' : 'none';

        componentToRender = (
          <div>
            <RadioGroup onChange={e => this.onChangeExchangeMethod(e)} vertical>

              <RadioButton 
               value="Coopy"
               iconSize={20}
               disabled={!showCoopy}
               rootColor = {colorCoopy}>
                Coopi
              </RadioButton>

              <RadioButton 
                value="Exchange"
                iconSize={20}
                disabled={!showBarter}
                rootColor = {colorBarter}>
                Barter
              </RadioButton>

            </RadioGroup>

            <hr/>

            <RadioGroup onChange={e => this.onChangeExchangeInstance(e)} vertical style={{ display: coopiSelected }}>
              
                <RadioButton 
                  value="Hour"
                  iconSize={20}
                  disabled={!showHour}
                  rootColor = {colorHour}>
                  Hour
                </RadioButton>

                <RadioButton 
                  value="Session"
                  iconSize={20}
                  disabled={!showSession}
                  rootColor = {colorSession}>
                  Session
                </RadioButton>

                <RadioButton 
                  value="FinalProduct"
                  iconSize={20}
                  disabled={!showFinalProduct}
                  rootColor = {colorFinalProduct}>
                  Final Product
                </RadioButton>

            </RadioGroup>

            <TextField
              id="filled-with-placeholder"
              type="number"
              label="Coopi value"
              placeholder="Enter the value in Coopi"
              margin="normal"
              onChange={e => this.onChangeCoopiValue(e)}
              style={{ display: coopiSelected }}
            />

            <Select
              style={{ width: '100%', display: barterSelected }}
              value={this.state.myExchangeService}
              onChange={(e, f) => this.handleBarterService(e, f)}
            >
              {
                this.props.myOffers.map(o => (
                  <MenuItem value={o.id} name={o.title}>{o.title}</MenuItem>
                ))
              }
            </Select>
          </div>
        );
        break;

      case 2:
        componentToRender = (
          <Paper>
            <Typography variant="h5" component="h3" style={{textAlign: 'center'}}>
              {this.state.selectedServiceText}
            </Typography>

            {
              this.state.exchangeMethodSelected == 'Coopy'
                ? (
                  <Typography component="p" style={{textAlign: 'center'}}>
                    {this.state.exchangeInstanceSelected}
                    {' '}
                    <br />

                    for
                    {' '}
                    <br />
                    {this.state.coopiValue}
                    {' '}
                    COOPI
                  </Typography>
                )
                : (
                  <Typography component="p">

                    for
                    <br />
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
    const {
      loading, error, loggedUser, messages, proposal,
    } = this.props;
    const { offer, categories, activeStep, userChat } = this.state;
    const steps = this.getSteps();
    const proposalMade = proposal && proposal.id;

    const stepsTutorial = [
      {
        target: '.negotiationChat',
        content: 'Start writing here to negotiate!',
      },
      {
        target: '.makeProposal',
        content: 'Type here to make a proposal to the other person...',
      },
    ]

    return (
      <Protected>

          <div className="menu">
            <div className="back" onClick={e => this.handleClickBack(e)}>
              <i class="fa fa-chevron-left"></i> 
              <img src={userChat.pictureURL} height="50px" width="50px" draggable="false"/>
            </div>
            <div className="name">{userChat.name}</div>
            <div className="last">Online</div>
            </div>

            <div className={styles.containerChat}>
              <div id="msgList" className="message-list" style={{ height: '300px', overflowY: 'auto', flexDirection: 'column-reverse' }}>

                {
                  messages.map(m => ({
                    mine: m.authorId === loggedUser.id,
                    message: m.text,
                    date: new Date(m.createdAt ? m.createdAt : Date.now()),
                  })).map(item => (
                    <MessageBox
                      style={{ marginBottom: '2%' }}
                      position={item.mine ? 'right' : 'left'}
                      type="text"
                      text={item.message}
                      status="read"
                      date={item.date}
                    />
                  ))
                }

              </div>

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

                              {activeStep === steps.length - 1 ? '' : (

                                <div style={{ paddingTop: '5%' }}>
                                  <CommonButton
                                    disabled={activeStep === 0}
                                    onClick={this.handleBack}
                                  >

                                    Back
                                    </CommonButton>
                                  <CommonButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                  >

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

              <div className="negotiationChat">
                <Input
                  placeholder="Type here..."
                  multiline={false}
                  onChange={e => this.onChangeChatInput(e)}
                  value={this.state.chatMessage}
                  rightButtons={(
                    <Button
                      color="white"
                      backgroundColor="transparent"
                      onClick={e => this.handleSendMessage(e)}
                      text={<i className="fa fa-chevron-circle-right " style={{ fontSize: '48px', color: '#007bff' }} />}
                    />
                  )}
                />
              </div>

              {proposalMade
                ? (
                  <div className="seeProposal">
                    <Proposal
                      proposal={this.props.proposal}
                      buttonText="See proposal"
                      isInfo={false}
                    />
                  </div>
                )
                : (
                  <Row>
                    <Col sm={6}>
                      <div className="makeProposal">
                        <CommonButton class="btn" style={{ marginTop: '3%', width: '100%' }} onClick={e => this.handleClickOpen(e, false)}>

                          {'Make an open offer '}
                          <i className="fa fa-handshake-o" aria-hidden="true" />
                        </CommonButton>
                      </div>
                    </Col>
                   
                    <Col sm={6}>
                      <div className="makeProposal">
                        <CommonButton class="btn" style={{ marginTop: '3%', width: '100%' }} onClick={e => this.handleClickOpen(e, true)}>

                          {'Make an offer '}
                          <i className="fa fa-handshake-o" aria-hidden="true" />
                        </CommonButton>
                      </div>
                    </Col>
                  </Row>
                )}
            </div>

      </Protected>
    );
  }
}

export { Chat };
