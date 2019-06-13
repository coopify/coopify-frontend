
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Row, Col,
} from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import LoadingScreen from 'react-loading-screen';
import Divider from '@material-ui/core/Divider';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import MetaTags from 'react-meta-tags';
import StarRatingComponent from 'react-star-rating-component';
import { getUrlConversation, getShareCount } from '../api';
import { GeneralQuestions } from './generalQuestions';
import { Protected } from './protected';
import {
  resetError, attemptShowOffer, attemptSendReward, saveRefCode,
} from '../actions/user';
import GuestLayout from './guest-layout';

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  offer: state.offer,
}))

class IndividualOffer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
      shareCount: 0,
    };
    this.setShareCount = this.setShareCount.bind(this);
    this.verifyRefCode();
  }

  componentDidMount() {
    const { dispatch, offer } = this.props;

    const token = localStorage.getItem('token');

    const payload = {
      userToken: token,
      offerId: this.props.match.params.id,
    };

    dispatch(attemptShowOffer(payload));
  }

  async setShareCount() {
    const { loggedUser, offer } = this.props;
    const token = localStorage.getItem('token');
    const shareData = {
      userToken: token,
      url: `${global.URL}/offers/${offer.id}?referalCode=${loggedUser.referalCode}`,
    };

    const response = await getShareCount(shareData);
    const newCount = response.count;

    this.setState({
      ...this.state,
      shareCount: newCount,
    });
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  async handleContactClick() {
    const { offer, history } = this.props;

    this.setState({ ...this.state, loading: true });

    const payload = {
      token: localStorage.getItem('token'),
      toUser: offer.userId,
    };

    const response = await getUrlConversation(payload);
    this.setState({ ...this.state, loading: false });

    const conversationId = response.conversation.id;
    history.push(`/user/conversations/${conversationId}`);
  }

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetError());
    } else {
      toast.success(message);
    }
  }

  verifyRefCode() {
    const { dispatch } = this.props;
    const urlParams = new URLSearchParams(window.location.search);
    const codeFromUrl = urlParams.get('referalCode');

    if (codeFromUrl && codeFromUrl.length > 0) {
      const payload = { code: codeFromUrl };
      dispatch(saveRefCode(payload));
    }
  }

  async handleShareComplete() {
    const { dispatch, offer, loggedUser } = this.props;
    const { shareCount } = this.state;

    const token = localStorage.getItem('token');
    const userId = loggedUser.id;

    const shareData = {
      userToken: token,
      url: `${global.URL}/offers/${offer.id}?referalCode=${loggedUser.referalCode}`,
    };
    const response = await getShareCount(shareData);
    const newCount = response.count;

    const userIsOwner = loggedUser.id === offer.userId;
    const sharedOffer = newCount > shareCount;
    const validations = userIsOwner && sharedOffer;

    if (validations) {
      const payload = {
        userId,
        userToken: token,
        offerId: offer.id,
      };
      dispatch(attemptSendReward(payload));
    }
  }


  render() {
    const {
      loggedUser, offer, loading,
    } = this.props;
    const pictureUrl = offer && offer.images && offer.images.length > 0 ? offer.images[0].url : 'https://cdn2.vectorstock.com/i/1000x1000/01/61/service-gear-flat-icon-vector-13840161.jpg';
    const displayOwnerOnly = loggedUser.id === offer.userId ? 'none' : 'block';
    const marginBetween = '5%';
    const shareUrl = `${global.URL}/offers/${offer.id}?referalCode=${loggedUser.referalCode}`;
    const showBtnShareFB = 'inline-block';

    return (
      <Protected>

        <MetaTags>
          <meta name="description" content={offer.description} />
          <meta property="og:title" content={offer.title} />
          <meta property="og:image" content={pictureUrl} />
        </MetaTags>

        <GuestLayout>

          <LoadingScreen
            loading={loading}
            bgColor="rgba(255, 255, 255, .5)"
            spinnerColor="#BE1931"
            textColor="#BE1931"
            text="Loading..."
          >

            <div>

              <Row>
                <Col sm="4">
                  <img name="picture" alt={offer.title} src={pictureUrl} style={{ position: 'relative', top: '50%', transform: 'translateY(-50%)' }} />
                </Col>

                <Col sm="8" style={{ textAlign: 'center' }}>

                  <Row style={{ display: 'block', marginTop: marginBetween, marginBottom: marginBetween }}>

                    <h1 style={{ display: 'inline-block' }} className="title">{offer.title}</h1>

                    <FacebookShareButton
                      style={{ display: showBtnShareFB, marginLeft: '4%' }}
                      url={shareUrl}
                      quote={offer.title}
                      beforeOnClick={e => this.setShareCount(e)}
                      onShareWindowClose={e => this.handleShareComplete(e)}
                    >
                      <FacebookIcon size={32}> Share with Facebook </FacebookIcon>
                    </FacebookShareButton>

                    <Button onClick={e => this.handleContactClick(e)} style={{ display: displayOwnerOnly }}>
                      {'Negotiate with: '}
                      {offer.by}
                      {' '}
                      <i className="fa fa-comment" />
                    </Button>

                    <p>{offer.description}</p>

                    <div className="col-sm-4">
                      {/* <p>Rating: {offer.stars}</p> */}
                      <h4>
                        {'Rating: '}
                        {4}
                      </h4>
                      <StarRatingComponent
                        name="RatingService"
                        editing={false}
                        renderStarIcon={() => <span>&#9733;</span>}
                        starCount={5}
                        // value={offer.stars} Ver como va a venir (stars, rating?...)
                        value={4}
                      />
                    </div>

                  </Row>
                  <Divider />
                  <Row style={{ display: 'block', marginTop: marginBetween, marginBottom: marginBetween }}>
                    <div>
                      <h4>Categories: </h4>

                      {offer.categories !== undefined ? (
                        offer.categories.map(c => (
                          <Chip
                            key={c.name}
                            label={c.name}
                          />
                        ))) : ''}

                    </div>

                  </Row>
                  <Divider />
                  <Row style={{ display: 'block', marginTop: marginBetween, marginBottom: marginBetween }}>
                    <div>
                      <h4>Payment Method: </h4>
                      <Chip label={offer.paymentMethod} />
                    </div>

                    <div>
                      {offer.hourPrice && offer.hourPrice !== '0' ? (
                        <div className="col-sm-12">
                          <span>
                            {offer.hourPrice}
                            {' '}
                            { 'Coopies x hour' }
                          </span>
                        </div>
                      ) : ''}
                      {offer.sessionPrice && offer.sessionPrice !== '0' ? (
                        <div className="col-sm-12">
                          <span>
                            {offer.sessionPrice}
                            {' '}
                            { 'Coopies x session' }
                          </span>
                        </div>
                      ) : ''}
                      {offer.finalProductPrice && offer.finalProductPrice !== '0' ? (
                        <div className="col-sm-12">
                          <span>
                            {offer.finalProductPrice}
                            {' '}
                            { 'Coopies x final product' }
                          </span>
                        </div>
                      ) : ''}
                    </div>

                  </Row>
                  <Divider />
                    <Row style={{ display: 'block', marginTop: marginBetween, marginBottom: marginBetween }}>
                      <TextField
                        label="Start Date"
                        type="date"
                        disabled
                        defaultValue={moment(offer.startDate).format('YYYY-MM-DD')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        label="Finish Date"
                        type="date"
                        disabled
                        defaultValue={moment(offer.endDate).format('YYYY-MM-DD')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Row>
                  <Divider />
                </Col>
              </Row>

              <Row>
                <Col sm="2">
                  {' '}
                </Col>
                <Col sm="8">
                  <GeneralQuestions offerId={offer.id} />
                </Col>
                <Col sm="2">
                  {' '}
                </Col>
              </Row>

              <div className="container">
                <div className="row justify-content-md-center">
                  <Row>
                    <Col sm="12" style={{ textAlign: 'center' }}>
                      <Button onClick={e => this.handleContactClick(e)} style={{ display: displayOwnerOnly }}>
                        {'Negotiate with: '}
                        {offer.by}
                        {' '}
                        <i className="fa fa-comment" />
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>

            </div>

          </LoadingScreen>
        </GuestLayout>
      </Protected>
    );
  }
}

export { IndividualOffer };
