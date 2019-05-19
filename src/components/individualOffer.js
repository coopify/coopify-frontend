
import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptShowOffer, getShareCount, attemptSendReward, saveRefCode } from '../actions/user';
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
import Divider from '@material-ui/core/Divider';
import { FacebookShareButton, FacebookIcon } from "react-share";
import MetaTags from 'react-meta-tags';

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
      shareCount: 0,
    };
    this.delay = this.delay.bind(this);
    this.setShareCount = this.setShareCount.bind(this);
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

    this.verifyRefCode();

    const token = localStorage.getItem("token");
    const offerId = this.props.match.params.id;

    const payload = {
      userToken: token,
      offerId: offerId
    }

    dispatch(attemptShowOffer(payload));
  }

  verifyRefCode() {

    const { dispatch } = this.props;
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('referalCode');
    
    if (codeFromUrl && codeFromUrl.length > 0) {
      dispatch(saveRefCode(codeFromUrl));
    }
   
  }

  async setShareCount(e){
    const { readOnlyOffer } = this.props;
    const token = localStorage.getItem("token");
    const shareData = 
    {
      userToken: token,
      url: `${global.URL}/offers/${readOnlyOffer.id}`
    };

    const response = await getShareCount(shareData);
    const newCount = response.count;

    this.setState({
      ...this.state,
      shareCount: newCount
    });
  }

  async handleShareComplete(e){
    const { dispatch, readOnlyOffer, loggedUser } = this.props;
    const { shareCount } = this.state;

    const token = localStorage.getItem("token");
    const offerId = this.props.match.params.id;
    const userId = loggedUser.id;

    const shareData = 
    {
      userToken: token,
      url: `${global.URL}/offers/${readOnlyOffer.id}`
    };
    const response = await getShareCount(shareData);
    const newCount = response.count;

    const userIsOwner = loggedUser.id === readOnlyOffer.userId;
    const sharedOffer = newCount > shareCount;
    const validations = userIsOwner && sharedOffer;

    if(validations){
      const payload = {
        userId: userId,
        userToken: token,
        offerId: offerId
      }
      dispatch(attemptSendReward(payload));
    }
  }


  render() {
    const { error, loggedUser, balance, readOnlyOffer } = this.props
    const { offer , loading } = this.state
    const pictureUrl = readOnlyOffer && readOnlyOffer.images && readOnlyOffer.images.length > 0 ? readOnlyOffer.images[0].url : 'https://cdn2.vectorstock.com/i/1000x1000/01/61/service-gear-flat-icon-vector-13840161.jpg';
    const displayOwnerOnly  = loggedUser.id === readOnlyOffer.userId ? 'none' : 'block';
    const marginBetween = "5%";
    const shareUrl = `${global.URL}/offers/${readOnlyOffer.id}?referalCode=${loggedUser.referalCode}`;
    const showBtnShareFB = loggedUser.FBSync ? "inline-block" : "none";

    return (
      <Protected>

      <MetaTags>
        <meta name="description" content={readOnlyOffer.description} />
        <meta property="og:title" content={readOnlyOffer.title} />
        <meta property="og:image" content={pictureUrl} />
      </MetaTags>

        <GuestLayout>

        <LoadingScreen
          loading={loading}
          bgColor='rgba(255, 255, 255, .5)'
          spinnerColor='#BE1931'
          textColor='#BE1931'
          text= {"Loading..."}> 

          <LoadingScreen
          loading={this.props.loading}
          bgColor='rgba(255, 255, 255, .5)'
          spinnerColor='#BE1931'
          textColor='#BE1931'
          text= {"Loading..."}> 

          <div className="">

            <div className="">        

<Row>
              <Col sm="4">
                <img name="picture" src={pictureUrl} style={{position: "relative", top: "50%", transform: "translateY(-50%)"}} />
              </Col>

              <Col sm="8" style={{textAlign: "center"}}>

              <Row style={{display: "block", marginTop: marginBetween, marginBottom: marginBetween}}>

              <h1 style={{display: "inline-block"}} className="title">{readOnlyOffer.title}</h1> 

              <FacebookShareButton
              style = {{display: showBtnShareFB, marginLeft: "4%"}}
              url={shareUrl}
              quote={readOnlyOffer.title}
              beforeOnClick = {e => this.setShareCount(e)}
              onShareWindowClose={e => this.handleShareComplete(e)}>
              <FacebookIcon
                size={32}>Share with Facebook</FacebookIcon>
            </FacebookShareButton>

            <Button onClick={e => this.handleContactClick(e)} style={{display: displayOwnerOnly, backgroundColor: "transparent", color: "black" }}>
            Contact {readOnlyOffer.by} <i className="fa fa-comment"></i>
            </Button>

              <p>{readOnlyOffer.description}</p>

                </Row>
                <Divider />
              <Row style={{display: "block", marginTop: marginBetween, marginBottom: marginBetween}}>
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

              </Row>
              <Divider />
<Row style={{display: "block", marginTop: marginBetween, marginBottom: marginBetween}}>
              <div>
              <h4>Payment Method: </h4>
                <Chip label={readOnlyOffer.paymentMethod} />
              </div>

                <div>
                  {readOnlyOffer.hourPrice && readOnlyOffer.hourPrice != "0" ? <div className="col-sm-12"><span>{readOnlyOffer.hourPrice} Coopies x hour</span></div> : ''}
                  {readOnlyOffer.sessionPrice && readOnlyOffer.sessionPrice != "0" ? <div className="col-sm-12"><span>{readOnlyOffer.sessionPrice} Coopies x session</span></div> : ''}
                  {readOnlyOffer.finalProductPrice && readOnlyOffer.finalProductPrice != "0" ? <div className="col-sm-12"><span>{readOnlyOffer.finalProductPrice} Coopies x final product</span></div> : ''}
                </div>

</Row>
<Divider />
<Row style={{display: "block", marginTop: marginBetween, marginBottom: marginBetween}}>
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

  </Row>
  </Col>
</Row>

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