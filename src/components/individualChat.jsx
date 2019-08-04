import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Input, Button, MessageBox } from 'react-chat-elements';

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
import {
  Row, Col,
} from 'react-bootstrap';
import { Proposal } from './proposal';

import { getConversation } from '../api';
// eslint-disable-next-line import/no-named-as-default
import Protected from './protected';
import styles from '../resources/css/profile.scss';
import {
  attemptSendMessage, attemptGetUserChat, attemptGetUsersOffers,
  attemptMakeProposal, attemptGetConversationProposals,
} from '../actions/user';

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
    onChatLeave: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    messages: PropTypes.arrayOf(PropTypes.object),
    myOffers: PropTypes.arrayOf(PropTypes.object),
    userOffers: PropTypes.arrayOf(PropTypes.object),
    proposal: PropTypes.objectOf(PropTypes.object),
    // conversations: PropTypes.arrayOf(PropTypes.object),
    conversationid: PropTypes.string,
  };

  static defaultProps = {
    dispatch: () => {
    },
    onChatLeave: () => {
    },
    loggedUser: {},
    messages: [],
    myOffers: [],
    userOffers: [],
    proposal: {},
    // conversations: [],
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
      userOffers: [],
    };
    this.onChangeExchangeMethod = this.onChangeExchangeMethod.bind(this);
    this.onChangeExchangeInstance = this.onChangeExchangeInstance.bind(this);
    this.handleMakeOfferProposal = this.handleMakeOfferProposal.bind(this);
  }

  async componentWillReceiveProps(nextProps) {
    const {
      dispatch, loggedUser, conversationid,
    } = this.props;

    if (nextProps.conversationid && nextProps.conversationid.length > 0
       && nextProps.conversationid !== conversationid) {
      const token = localStorage.getItem('token');
      const conversationId = nextProps.conversationid;

      const payload = {
        token,
        conversationId,
      };

      const conversation = await getConversation(payload);
      const toLogged = conversation.from.id === loggedUser.id;
      const userChat = toLogged ? conversation.to : conversation.from;

      this.setState({
        ...this.state,
        userChat,
      });

      const users = {
        token,
        myUserId: loggedUser.id,
        serviceUserId: toLogged ? conversation.to.id : conversation.from.id,
      };

      dispatch(attemptGetUserChat(payload));
      dispatch(attemptGetUsersOffers(users));
      dispatch(attemptGetConversationProposals(payload));
    }
  }

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

  getStepContent(index) {
    let componentToRender = '';
    const exchangeAvailableColor = '#007bff';
    const exchangeNotAvailableColor = '#e1e1e1';
    const {
      isOpenOffer, selectedServiceFull, exchangeMethodSelected, selectedServiceText,
      exchangeInstanceSelected, coopiValue, exchangeServiceText, myExchangeService,
      selectedService,
    } = this.state;

    const {
      myOffers, userOffers,
    } = this.props;

    const colorCoopy = isOpenOffer && selectedServiceFull.paymentMethod === 'Coopy' ? exchangeAvailableColor : exchangeNotAvailableColor;
    const colorBarter = isOpenOffer && selectedServiceFull.paymentMethod === 'Exchange' ? exchangeAvailableColor : exchangeNotAvailableColor;
    const colorHour = isOpenOffer && selectedServiceFull.paymentMethod === 'Coopy' && selectedServiceFull.hourPrice != null ? exchangeAvailableColor : exchangeNotAvailableColor;
    const colorSession = isOpenOffer && selectedServiceFull.paymentMethod === 'Coopy' && selectedServiceFull.sessionPrice != null ? exchangeAvailableColor : exchangeNotAvailableColor;
    const colorFinalProduct = isOpenOffer && selectedServiceFull.paymentMethod === 'Coopy' && selectedServiceFull.finalProductPrice != null ? exchangeAvailableColor : exchangeNotAvailableColor;

    const showCoopy = isOpenOffer || selectedServiceFull.paymentMethod === 'Coopy';
    const showBarter = isOpenOffer || selectedServiceFull.paymentMethod === 'Exchange';
    const showHour = isOpenOffer || (selectedServiceFull.paymentMethod === 'Coopy' && selectedServiceFull.hourPrice != null);
    const showSession = isOpenOffer || (selectedServiceFull.paymentMethod === 'Coopy' && selectedServiceFull.sessionPrice != null);
    const showFinalProduct = isOpenOffer || (selectedServiceFull.paymentMethod === 'Coopy' && selectedServiceFull.finalProductPrice != null);

    const coopiSelected = exchangeMethodSelected === 'Coopy' ? 'block' : 'none';
    const barterSelected = exchangeMethodSelected === 'Exchange' ? 'block' : 'none';

    switch (index) {
      case 0:
        componentToRender = (
          <Select
            style={{ width: '100%' }}
            value={selectedService}
            onChange={(e, f) => this.handleServiceChange(e, f)}
          >
            {
              userOffers.map(o => (
                <MenuItem value={o.id} name={o.title}>{o.title}</MenuItem>
              ))
            }
          </Select>
        );
        break;

      case 1:
        componentToRender = (
          <div>
            <RadioGroup onChange={e => this.onChangeExchangeMethod(e)} vertical>
              <RadioButton
                value="Coopy"
                iconSize={20}
                disabled={!showCoopy}
                rootColor={colorCoopy}
              >
                Coopi
              </RadioButton>

              <RadioButton
                value="Exchange"
                iconSize={20}
                disabled={!showBarter}
                rootColor={colorBarter}
              >
                Barter
              </RadioButton>
            </RadioGroup>
            <hr />

            <RadioGroup
              onChange={e => this.onChangeExchangeInstance(e)}
              vertical
              style={{ display: coopiSelected }}
            >

              <RadioButton
                value="Hour"
                iconSize={20}
                disabled={!showHour}
                rootColor={colorHour}
              >
                Hour
              </RadioButton>

              <RadioButton
                value="Session"
                iconSize={20}
                disabled={!showSession}
                rootColor={colorSession}
              >
                Session
              </RadioButton>

              <RadioButton
                value="FinalProduct"
                iconSize={20}
                disabled={!showFinalProduct}
                rootColor={colorFinalProduct}
              >
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
              value={myExchangeService}
              onChange={(e, f) => this.handleBarterService(e, f)}
            >
              {
                myOffers.map(o => (
                  <MenuItem value={o.id} name={o.title}>{o.title}</MenuItem>
                ))
              }
            </Select>
          </div>
        );
        break;

      case 2:
        componentToRender = (

          <Paper style={{ marginTop: '5%', marginBottom: '5%' }}>

            <Typography component="p" style={{ paddingTop: '8%' }}>
              <b>Service: </b>
              { selectedServiceText }
            </Typography>

            <Typography component="p" style={{ marginTop: '5%', marginBottom: '5%' }}>
              <b>Payment Method: </b>
              { exchangeMethodSelected }
            </Typography>

            {
              exchangeMethodSelected === 'Coopy'
                ? (
                  <Typography component="p" style={{ paddingBottom: '8%' }}>
                    <b>Amount: </b>
                    {coopiValue}
                    {' x '}
                    {exchangeInstanceSelected}
                  </Typography>
                )
                : (
                  <Typography component="p" style={{ paddingBottom: '8%' }}>
                    <b>Service offered: </b>
                    {exchangeServiceText}
                  </Typography>
                )}
          </Paper>
        );
        break;
      default:
        componentToRender = (
          <div>
            Something went wrong
          </div>
        );
    }
    return componentToRender;
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

  async handleSendMessage() {
    const { dispatch, conversationId } = this.props;
    const { chatMessage } = this.state;
    const token = localStorage.getItem('token');

    const payload = {
      token,
      message:
      {
        text: chatMessage,
      },
      conversationId,
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
      selectedService, exchangeMethodSelected, myExchangeService, exchangeInstanceSelected,
      coopiValue,
    } = this.state;
    const { dispatch, conversationid } = this.props;
    const isCoopi = exchangeMethodSelected === 'Coopy';

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
      conversationId: conversationid,
    };

    dispatch(attemptMakeProposal(payload));
  }

  handleClickBack(e) {
    const { onChatLeave } = this.props;
    onChatLeave(e);
  }

  handleServiceChange(e, rc) {
    const {
      userOffers,
    } = this.props;
    const service = e.target.value;
    const serviceSelectedComplete = userOffers.find(o => o.id === service);
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

  render() {
    const {
      loggedUser, messages, proposal,
    } = this.props;
    const {
      chatMessage, modalOpen, activeStep, userChat,
    } = this.state;
    const steps = ['Select the offer you want to trade', 'Select the exchange method', 'Confirm the offer'];
    const proposalMade = proposal && proposal.id;

    return (
      <div>
        <div className="menu">
          { /* eslint-disable */ }
          <div className="back" onClick={e => this.handleClickBack(e)}>
          { /* eslint-enable */ }
            <i className="fa fa-chevron-left" />
            <img alt="" src={userChat.pictureURL} height="50px" width="50px" draggable="false" />
          </div>
          <div className="name">{userChat.name}</div>
        </div>

        <div className={styles.containerChat}>
          <div className="message-list" style={{ height: '300px', overflowY: 'auto', flexDirection: 'column-reverse' }}>

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
            open={modalOpen}
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
                  {steps.map(label => (
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
              value={chatMessage}
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
                  proposal={proposal}
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

                      {'Make an offer '}
                      <i className="fa fa-handshake-o" aria-hidden="true" />
                    </CommonButton>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="makeProposal">
                    <CommonButton class="btn" style={{ marginTop: '3%', width: '100%' }} onClick={e => this.handleClickOpen(e, true)}>

                      {'Make an open offer '}
                      <i className="fa fa-handshake-o" aria-hidden="true" />
                    </CommonButton>
                  </div>
                </Col>
              </Row>
            )}
        </div>
      </div>
    );
  }
}

export { Chat };
