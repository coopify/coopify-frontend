
import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptShowOffer } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import { Button, Input, Row, Col } from 'react-bootstrap';
import Protected from './protected';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import { GeneralQuestions } from './generalQuestions'
import LoadingScreen from 'react-loading-screen';
import { getUrlConversation } from '../api';


export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  readOnlyOffer: state.offer
}))

class IndividualOffer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object,
    readOnlyOffer: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {},
    readOnlyOffer: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
      readOnlyOffer: {},
    };
    this.delay = this.delay.bind(this);
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

  delay = ms => new Promise(res => setTimeout(res, ms));

  async handleContactClick(e){

    const { dispatch, readOnlyOffer, loggedUser } = this.props;

    this.setState({...this.state, loading: true});
    //await this.delay(5000);
    const payload = 
    {
      token: localStorage.getItem("token"),
      toUser: readOnlyOffer.userId
    };

    const response = await getUrlConversation(payload);
    this.setState({...this.state, loading: false});

    const conversationId = response.conversation.id;
    this.props.history.push(`/user/conversations/${conversationId}`);
  }

  componentDidMount() {

    const { dispatch } = this.props;

    const token = localStorage.getItem("token");
    const offerId = this.props.match.params.id;

    const payload = {
      userToken: token,
      offerId: offerId
    }

    dispatch(attemptShowOffer(payload));
  }


  render() {
    const { error, loggedUser, balance, readOnlyOffer } = this.props
    const { offer , loading } = this.state
    const pictureUrl = readOnlyOffer && readOnlyOffer.images && readOnlyOffer.images.length > 0 ? readOnlyOffer.images[0].url : 'https://cdn2.vectorstock.com/i/1000x1000/01/61/service-gear-flat-icon-vector-13840161.jpg';
    const displayOwnerOnly  = loggedUser.id === readOnlyOffer.userId ? 'none' : 'block';

    return (
      <Protected>
        <GuestLayout>

        <LoadingScreen
          loading={loading}
          bgColor='#125876'
          spinnerColor='#BE1931'
          textColor='#ffffff'
          text= {"Loading..."}> 

          <LoadingScreen
          loading={this.props.loading}
          bgColor='#125876'
          spinnerColor='#BE1931'
          textColor='#ffffff'
          text= {"Loading..."}> 

          <div className="columns is-centered p-t-xl p-r-md p-l-md">

          <Button onClick={e => this.handleContactClick(e)} style={{display: displayOwnerOnly }}>
          Contact me <i className="fa fa-comment"></i>
        </Button>

            <div className="column is-half">
              <h1 className="title">{readOnlyOffer.title}</h1>

              <p style={{ width: "40%" }}>{readOnlyOffer.description}</p>

              <p style={{ width: "40%" }}>By {readOnlyOffer.by}</p>

              <Col sm="10">
                <img name="picture" src={pictureUrl} />
              </Col>

              <div>
                <h4>Categories: </h4>

              {readOnlyOffer.categories != undefined ? (
                readOnlyOffer.categories.map(c => {
              return (
                <Chip
                  key={c.name}
                  label={c.name}
                />
              );
            })): ''}

              </div>

              <div>
              <h4>Payment Method: </h4>
                <Chip label={readOnlyOffer.paymentMethod} />
              </div>

                <div>
                  {readOnlyOffer.hourPrice && readOnlyOffer.hourPrice != "0" ? <div className="col-sm-12"><span>{readOnlyOffer.hourPrice} Coopies x hour</span></div> : ''}
                  {readOnlyOffer.sessionPrice && readOnlyOffer.sessionPrice != "0" ? <div className="col-sm-12"><span>{readOnlyOffer.sessionPrice} Coopies x session</span></div> : ''}
                  {readOnlyOffer.finalProductPrice && readOnlyOffer.finalProductPrice != "0" ? <div className="col-sm-12"><span>{readOnlyOffer.finalProductPrice} Coopies x final product</span></div> : ''}
                </div>

              <TextField
                label="Start Date"
                type="date"
                disabled
                defaultValue={moment(readOnlyOffer.startDate).format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Finish Date"
                type="date"
                disabled
                defaultValue={moment(readOnlyOffer.endDate).format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <GeneralQuestions offerId={this.props.match.params.id}/>
            </div>
          </div>

          </LoadingScreen>
          </LoadingScreen>
        </GuestLayout>
      </Protected>
    );
  }
}

export { IndividualOffer }