import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import CommonButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { attemptAcceptProposal, attemptRejectProposal, attemptCancelProposal } from '../actions/user';
import SingletonPusher from './singletonPusher';

export default @connect(state => ({
  loggedUser: state.user,
  serviceUser: state.serviceUser,
  error: state.error,
  loading: state.loading,
  messages: state.messages,
  myOffers: state.myOffers,
  userOffers: state.userOffers,
}))

class Proposal extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    proposal: PropTypes.objectOf(PropTypes.object),
    buttonText: PropTypes.string,
    isInfo: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    proposal: {},
    buttonText: '',
    isInfo: false,
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
    this.handleDecline = this.handleDecline.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }


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
    });
  };

  handleAccept() {
    const token = localStorage.getItem('token');
    const { dispatch, proposal } = this.props;

    const payload = {
      token,
      proposalId: proposal.id,
    };

    dispatch(attemptAcceptProposal(payload));

    this.handleClose();
  }

  handleDecline() {
    const token = localStorage.getItem('token');
    const { dispatch, proposal } = this.props;

    const payload = {
      token,
      proposalId: proposal.id,
    };

    dispatch(attemptRejectProposal(payload));
    SingletonPusher.getInstance().cancelPaymentAuthorization(proposal.proposerId, loggedUser.id, proposal.offerId)

    this.handleClose();
  }

  handleCancel() {
    const token = localStorage.getItem('token');
    const { dispatch, proposal } = this.props;

    const payload = {
      token,
      proposalId: proposal.id,
    };

    dispatch(attemptCancelProposal(payload));
    SingletonPusher.getInstance().cancelPaymentAuthorization(loggedUser.id, proposal.purchasedOffer.userId, proposal.offerId)

    this.handleClose();
  }

  render() {
    const {
      proposal, buttonText, loggedUser, isInfo,
    } = this.props;
    const { modalOpen } = this.state;

    const stylesInfo = isInfo ? { color: 'rgba(255, 255, 255, 0.54)' } : { width: '100%' };
    const styleProposalIcon = isInfo ? '' : <i className="fa fa-handshake-o" aria-hidden="true" />;
    return (

      <div>
        <CommonButton style={stylesInfo} onClick={e => this.handleClickOpen(e)}>
          {buttonText}
          {' '}
          {styleProposalIcon}
        </CommonButton>


        <Dialog
          open={modalOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Offer proposal</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div>You have the following offer proposal</div>
              <Paper>
                <Typography variant="h5" component="h3">
                  {proposal.purchasedOffer.title}
                </Typography>

                {
                  proposal.exchangeMethod === 'Coopy'
                    ? (
                      <Typography component="p">

                        <div>for</div>
                        <br />
                        {proposal.proposedPrice}
                        {' '}
                        <div>COOPI /</div>
                        {proposal.exchangeInstance}
                      </Typography>
                    )
                    : (
                      <Typography component="p">

                        <div>for</div>
                        <br />
                        {proposal.proposedService.title}
                      </Typography>
                    )}

              </Paper>
            </DialogContentText>

            <div>

              {
                (proposal.proposerId !== loggedUser.id) && (proposal.status === 'Waiting')
                  ? (
                    <div>
                      <CommonButton onClick={this.handleDecline} color="primary">
                        <i className="fa fa-times" />
                        {' '}
                        <div>&nbsp; Decline</div>
                      </CommonButton>
                      <CommonButton onClick={this.handleAccept} color="primary">
                        <i className="fa fa-check" />
                        {' '}
                        <div>&nbsp; Accept</div>
                      </CommonButton>
                    </div>
                  )
                  : `Stauts: ${proposal.status}`
              }

              {
                (proposal.proposerId === loggedUser.id) && (proposal.status === 'Waiting')
                  ? (
                    <div>
                      <CommonButton onClick={this.handleCancel} color="primary">
                        <i className="fa fa-ban" />
                        {' '}
                        <div>&nbsp; Cancel this proposal</div>
                      </CommonButton>
                    </div>
                  )
                  : ''
              }
              <div>
                <CommonButton onClick={this.handleClose} color="primary">
                  <i className="fa fa-arrow-circle-left" />
                  {' '}
                  <div>&nbsp; Go back</div>
                </CommonButton>
              </div>
            </div>

          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export { Proposal };
