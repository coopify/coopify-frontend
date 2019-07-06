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
      exchangeMethodSelected: 'Coopy',
      exchangeInstanceSelected: 'Hour',
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
      modalOpen: true,
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
    this.setState({
      ...this.state,
      selectedService: e.target.value,
      selectedServiceText: rc.props.name,
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

  async componentDidMount() {
    const { dispatch, loggedUser } = this.props;
    const token = localStorage.getItem('token');
    const conversationId = this.props.match.params.conversationId;

    const payload = {
      token,
      conversationId,
    };

    const conversation = await getConversation(payload);

    const users = {
      token,
      myUserId: loggedUser.id,
      serviceUserId: conversation.to.id == loggedUser.id ? conversation.from.id : conversation.to.id,
    };

    dispatch(attemptGetUserChat(payload));
    dispatch(attemptGetUsersOffers(users));
    dispatch(attemptGetConversationProposals(payload));
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
      conversationId: this.props.match.params.conversationId,
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
      conversationId: this.props.match.params.conversationId,
    };

    dispatch(attemptMakeProposal(payload));
  }

  getStepContent(index) {
    let componentToRender = '';
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

        const coopiSelected = this.state.exchangeMethodSelected == 'Coopy' ? 'inline-flex' : 'none';
        const barterSelected = this.state.exchangeMethodSelected == 'Exchange' ? 'block' : 'none';

        componentToRender = (
          <div>
            <RadioGroup onChange={e => this.onChangeExchangeMethod(e)} vertical>
              <RadioButton value="Coopy">

                Coopi
                  </RadioButton>
              <RadioButton value="Exchange">

                Barter
                  </RadioButton>
            </RadioGroup>

            <RadioGroup onChange={e => this.onChangeExchangeInstance(e)} horizontal style={{ display: coopiSelected }}>
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
            <Typography variant="h5" component="h3">
              {this.state.selectedServiceText}
            </Typography>

            {
              this.state.exchangeMethodSelected == 'Coopy'
                ? (
                  <Typography component="p">
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
    const { offer, categories, activeStep } = this.state;
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
        <GuestLayout>

          <Loading>

            <ReactJoyride
              continuous
              steps={stepsTutorial}
              run={true}
              showSkipButton
              styles={{
                options: {
                  arrowColor: '#fff',
                  backgroundColor: '#fff',
                  beaconSize: 36,
                  overlayColor: 'rgba(0, 0, 0, 0.5)',
                  primaryColor: '#499be7',
                  spotlightShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
                  textColor: '#333',
                  width: undefined,
                  zIndex: 100,
                }
              }}
            />

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
                      text={<i className="fa fa-caret-right" style={{ fontSize: '48px', color: 'blue' }} />}
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
                  <div className="makeProposal">
                    <CommonButton class="btn" style={{ marginTop: '3%' }} onClick={e => this.handleClickOpen(e)}>

                      {'Make an offer '}
                      <i className="fa fa-handshake-o" aria-hidden="true" />
                    </CommonButton>
                  </div>
                )}
            </div>
          </Loading>
        </GuestLayout>
      </Protected>
    );
  }
}

export { Chat };
