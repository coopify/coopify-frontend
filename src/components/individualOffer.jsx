
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Row, Col,
} from 'react-bootstrap';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import { Loading } from './loading';
import Divider from '@material-ui/core/Divider';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import MetaTags from 'react-meta-tags';
import StarRatingComponent from 'react-star-rating-component';
import { createUrlConversation, getShareCount } from '../api';
import { GeneralQuestions } from './generalQuestions';
import {
  resetNotificationFlagsService, attemptShowOffer, attemptSendReward, saveRefCode, attemptGetReviews, attemptSendReview, attemptCanReview
} from '../actions/user';
import GuestLayout from './guest-layout';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CommonButton from '@material-ui/core/Button';
import noImage from '../assets/noImage.png';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Chat } from './individualChat';
import ShowMoreText from 'react-show-more-text';
import avatarImg from '../assets/avatar.png';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  error: state.service.error,
  loading: state.service.loading,
  offer: state.service.offer,
  reviews: state.review.reviews,
  canRate: state.review.canRate,
  reviewCreated: state.review.reviewCreated,
}))

class IndividualOffer extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.objectOf(PropTypes.object),
    reviews: PropTypes.arrayOf(PropTypes.object),
    canRate: PropTypes.bool,
    reviewCreated: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {},
    reviews: [],
    canRate: false,
    reviewCreated: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
      reviews: [],
      shareCount: 0,
      myServiceRating: 0,
      myUserRating: 0,
      myDescription: '',
      modalOpen: false,
      conversationId: '',
      active: false,
      width: window.innerWidth,
    };
    this.setShareCount = this.setShareCount.bind(this);
    this.displayChatList = this.displayChat.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.verifyRefCode();
  }

  componentDidMount() {
    const { dispatch, offer } = this.props;

    window.addEventListener('resize', this.updateDimensions);

    const token = localStorage.getItem('token');

    const payload = {
      userToken: token,
      offerId: this.props.match.params.id,
    };

    dispatch(attemptShowOffer(payload));
    dispatch(attemptGetReviews(payload));

    if(token != null) {
      dispatch(attemptCanReview(payload));
    }

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.setState(state => ({ ...state, width: window.innerWidth }));
  }

  onServiceStarClick(e) {
    const value = e;
    this.setState({
      ...this.state,
      myServiceRating: value,
    });
  }

  onUserStarClick(e) {
    const value = e;
    this.setState({
      ...this.state,
      myUserRating: value,
    });
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

  handleClose = () => {
    this.setState({
      ...this.state,
      modalOpen: false,
    });
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  handleClickOpen = () => {
    this.setState({
      ...this.state,
      modalOpen: true,
    });
  };

  async handleContactClick() {
    const { offer, history } = this.props;

    this.setState({ ...this.state, loading: true });

    const payload = {
      token: localStorage.getItem('token'),
      toUser: offer.userId,
    };

    const response = await createUrlConversation(payload);
    this.setState({ ...this.state, loading: false });

    const conversationId = response.conversation.id;

    this.setState({
      ...this.state,
      conversationId,
      active: true
    });

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

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetNotificationFlagsService());
    } else {
      toast.success(message);
      dispatch(resetNotificationFlagsService());
    }
  }

  handleReviewChange(e) {
    const description = e.target.value;
    this.setState({
      ...this.state,
      myDescription: description,
    });
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

  displayChat(e) {
    const { history } = this.props;
    history.push(`/user/conversations`);
  }

  handleSendReview(e) {
    const { dispatch, offer } = this.props;
    const { myServiceRating, myUserRating } = this.state;
    const { myDescription } = this.state;
    const token = localStorage.getItem('token');

    const payload = {
      offerRate: myServiceRating,
      userRate: myUserRating,
      description: myDescription,
      token,
      offerId: offer.id,
    };

    dispatch(attemptSendReview(payload));
    this.handleClose();
  }

  render() {
    const {
      loggedUser, offer, loading, reviews, canRate, error, reviewCreated
    } = this.props;
    const { myServiceRating, myUserRating, modalOpen, conversationId, active, width } = this.state;
    const pictureUrl = offer && offer.images && offer.images.length > 0 ? offer.images[0].url : noImage;
    const displayOwnerOnly = loggedUser && loggedUser != null && loggedUser.id === offer.userId ? 'none' 
      : (loggedUser == null ? 'none' : 'block');
    const marginBetween = '5%';
    const shareUrl = loggedUser && loggedUser != null ? `${global.URL}/offers/${offer.id}?referalCode=${loggedUser.referalCode}` : '';
    const showBtnShareFB = 'inline-block';
    const canReview = canRate ? 'block' : 'none';
    const loggedUserPicture = loggedUser != null && loggedUser.pictureURL != null ? loggedUser.pictureURL : avatarImg;
    const countSlides = width < 600 ? Math.min(reviews.length, 1) : Math.min(reviews.length, 3);

    // Settings Slides Reviews
    const settings = {
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: countSlides,
      slidesToScroll: countSlides,
    };
    // End Settings Slides Reviews

    if (error.length > 0) this.notify(error, true);
    if (reviewCreated) this.notify('The service was reviewed successfully!', false);

    return (
      <div>

        <MetaTags>
          <meta name="description" content={offer.description} />
          <meta property="og:title" content={offer.title} />
          <meta property="og:image" content={pictureUrl} />
        </MetaTags>

        <GuestLayout>

          <div className={active ? 'chatInactive' : ' chatActive'}>
            <Row>

              <Col sm="2">
                {' '}
              </Col>
              <Col sm="6">
                <h1 className="title">{offer.title}</h1>
              </Col>
              <Col sm="2">
                {offer.ratingCount !== 0 ? (
                  <div style={{ margin: 5 }}>
                    <StarRatingComponent
                      name="RatingService"
                      editing={false}
                      renderStarIcon={() => <h5>&#9733;</h5>}
                      starCount={5}
                      value={Number.parseFloat(offer.rating).toFixed(2)}
                    />
                    <div style={{ marginTop: '-25px' }}>
                      <b style={{ fontWeight: 'bold', color: '#111010' }}>
                        {'Service Rating: '}
                      </b>
                      {Number.parseFloat(offer.rating).toFixed(2)}
                    </div>
                  </div>) : ('')}
              </Col>

            </Row>
            <Row>
              <Col sm="2">
                {' '}
              </Col>
              <Col sm="4">
                <img name="picture" alt={offer.title} src={pictureUrl} width="400" margin="8" style={{ position: 'relative', top: '5%', transform: 'translateY(-5%)' }} />
              </Col>

              <Col sm="2">
                <p style={{ wordWrap: 'break-word' }}>{offer.description}</p>
              </Col>
              <Col sm="2">
                <Divider />
                <div style={{ margin: '8px' }}>
                  <p style={{ fontWeight: 'bold', color: '#111010' }}>Categories: </p>

                  {offer.categories !== undefined ? (
                    offer.categories.map(c => (
                      <Chip
                        style={{ margin: '3px' }}
                        key={c.name}
                        label={c.name}
                      />
                    ))) : ''}

                </div>
                <Divider />
                <div style={{ margin: '8px' }}>
                  <b style={{ fontWeight: 'bold', color: '#111010' }}>{'Payment Method: '}</b>
                  {offer.paymentMethod}
                </div>

                <div>
                  {offer.hourPrice && offer.hourPrice !== '0' ? (
                    <div className="col-sm-12">
                      <span>
                        {offer.hourPrice}
                        {' '}
                        {'Coopies x hour'}
                      </span>
                    </div>
                  ) : ''}
                  {offer.sessionPrice && offer.sessionPrice !== '0' ? (
                    <div className="col-sm-12">
                      <span>
                        {offer.sessionPrice}
                        {' '}
                        {'Coopies x session'}
                      </span>
                    </div>
                  ) : ''}
                  {offer.finalProductPrice && offer.finalProductPrice !== '0' ? (
                    <div className="col-sm-12">
                      <span>
                        {offer.finalProductPrice}
                        {' '}
                        {'Coopies x final product'}
                      </span>
                    </div>
                  ) : ''}
                </div>

                <Divider />
                <div style={{ margin: '8px' }}>
                  <TextField
                    style={{ margin: '5px' }}
                    label="Start Date"
                    type="date"
                    disabled
                    defaultValue={moment(offer.startDate).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                  />
                  <TextField
                    style={{ margin: '5px' }}
                    label="Finish Date"
                    type="date"
                    disabled
                    defaultValue={moment(offer.endDate).format('YYYY-MM-DD')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    margin="normal"
                  />
                </div>
                <Divider />
              </Col>
              <Col sm="2">
                {' '}
              </Col>
            </Row>

            <Row>

              <Col sm="2">
                {' '}
              </Col>
              <Col sm="8" style={{ margin: '8px' }}>
                <p style={{ color: 'black', marginBottom: '0px' }}>
                  {'Share with Facebook'}
                  <FacebookShareButton
                    style={{ display: showBtnShareFB, marginLeft: '2%' }}
                    url={shareUrl}
                    quote={offer.title}
                    beforeOnClick={e => this.setShareCount(e)}
                    onShareWindowClose={e => this.handleShareComplete(e)}
                  >
                    <FacebookIcon size={32}> Share with Facebook </FacebookIcon>
                  </FacebookShareButton>
                </p>
              </Col>
              <Col sm="2">
                {' '}
              </Col>

            </Row>

            <Row>
              <Col sm="2">
                {' '}
              </Col>
              <Col sm="8" style={{ marginTop: '8px', marginBottom: '8px' }}>
                <Link to={`/user/profile/${offer.userId}`}>
                  <Button
                    style={{ background: '#C3E9FF', borderRadius: '25px' }}
                  >
                    <p style={{ color: 'black', margin: '0px' }}>
                      {`See profile of ${offer.by} `}
                      <i className="fa fa-user fa-20x" style={{ color: '#000000' }} />
                    </p>
                  </Button>
                </Link>
              </Col>
            </Row>

            <Row>
              <Col sm="2">
                {' '}
              </Col>
              <Col sm="8">
                <div style={{ textAlign: '-webkit-center', margin: '8px' }}>
                  <Button
                    onClick={e => this.handleContactClick(e)}
                    style={{ display: displayOwnerOnly }}
                  >
                    {'Negotiate with: '}
                    {offer.by}
                    {' '}
                    <i className="fa fa-comment" />
                  </Button>
                </div>
              </Col>
            </Row>

            <div style={{ textAlign: 'center', margin: 8 }}>
              <Button style={{ display: canReview, margin: 'auto' }} onClick={e => this.handleClickOpen(e)}>
                {'Write your review for this service'}
              </Button>
            </div>

              <Row>
                <Col sm="2">
                  {' '}
                </Col>
                <Col sm="8">
                  <Slider {...settings}>
                    {reviews.map(item => (
                      <div className="card cardCoopify">
                        <div className="card-body">

                          <div style={{display: 'inline-flex', alignItems: 'center'}}>
                            <p>{item.reviewer.pictureURL != null ? <img name="pictureReviewer" alt={item.reviewer.name} src={item.reviewer.pictureURL} width="50" display="initial" /> : <img name="pictureReviewer" alt={item.reviewer.name} src={avatarImg} width="50" display="initial" />}</p>
                            <p className="card-title" style={{paddingLeft: '15px'}}>{item.reviewer != null ? item.reviewer.name : ''}</p>
                          </div>    

                          <div style={{fontSize: '14px', fontStyle: 'italic'}}>
                            <ShowMoreText
                              lines={1}
                              more='Show more'
                              less='Show less'
                              anchorClass=''
                              expanded={false}
                            >
                              <p className="text-muted" style={{fontSize: '14px', fontStyle: 'italic'}}>{item.description}</p>
                            </ShowMoreText>
                          </div>
                          
                          <div className="cardFooterReview">
                            <p className="card-text" style={{marginBottom: '-8%'}}>
                              <h3 className="text-muted">
                                <StarRatingComponent                             
                                  name="RatingReview"
                                  editing={false}
                                  renderStarIcon={() => <span>&#9733;</span>}
                                  starCount={5}
                                  value={item.offerRate}
                                />
                              </h3>
                            </p>
                            <small className="card-text">{item.createdAt.substring(0, 10)}</small>
                          </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </Col>
              <Col sm="2">
                {' '}
              </Col>
            </Row>

            <Dialog
              open={modalOpen}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              fullWidth={true}
            >
              <DialogTitle id="form-dialog-title">
                <h1>{offer.title}</h1>
              </DialogTitle>
              <Divider />
              <DialogContent>

                <form style={{ color: 'black', paddingTop: '7%' }}>
                  <div className="form-group row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <label htmlFor="staticEmail" style={{ width: '40%', textAlign: 'left', fontSize: '200%' }}><h3>Service</h3></label>
                    <div style={{ fontSize: '200%' }}>

                      <StarRatingComponent
                        name="RatingService"
                        starColor="#ffb400"
                        emptyStarColor="#ffb400"
                        renderStarIcon={(index, value) => {
                          return (
                            <span>
                              <i className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />
                            </span>
                          );
                        }}
                        value={myServiceRating}
                        onStarClick={e => this.onServiceStarClick(e)}
                        starCount={5}

                      />

                    </div>
                  </div>
                  <div className="form-group row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <label htmlFor="inputPassword" style={{ width: '40%', textAlign: 'left', fontSize: '200%' }}><h3>User</h3></label>
                    <div style={{ fontSize: '200%' }}>
                      <StarRatingComponent
                        name="RatingService"
                        starColor="#ffb400"
                        emptyStarColor="#ffb400"
                        renderStarIcon={(index, value) => (
                          <span>
                            <i className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />
                          </span>
                        )}
                        value={myUserRating}
                        onStarClick={e => this.onUserStarClick(e)}
                        starCount={5}
                        style={{ fontSize: 'xx-large' }}
                      />
                    </div>
                  </div>
                </form>


                <div>
                  <Divider />

                  <div className="form-group" style={{ display: 'flex', alignItems: 'center', paddingTop: '3%' }}>
                    <Avatar src={loggedUserPicture} style={{ width: '20%', height: '25%', display: 'inline-block' }} />
                    <textarea
                      style={{ marginLeft: '5%', fontSize: '12px', lineHeight: '1' }}
                      rows={4}
                      className="form-control"
                      placeholder="Would you like to add a comment?"
                      onChange={e => this.handleReviewChange(e)}
                    />
                  </div>

                </div>

                <CommonButton
                  style={{ width: '100%', color: 'white', fontSize: 'bold', backgroundColor: '#19b9e7' }}
                  onClick={e => this.handleSendReview(e)}
                >
                  {'Send review'}
                </CommonButton>

              </DialogContent>
            </Dialog>


            <Divider />

            <Row style={{ marginTop: marginBetween, marginBottom: marginBetween }}>
              <Col sm="2">
                {' '}
              </Col>
              <Col sm="8">
                <div>
                  <GeneralQuestions offerId={this.props.match.params.id} />
                </div>
              </Col>
              <Col sm="2">
                {' '}
              </Col>
            </Row>

            <Divider />

          </div>

          <div className={active ? 'chatActive' : ' chatInactive'}>
            <Chat conversationid={conversationId} onChatLeave={e => this.displayChatList(e)} />
          </div>

        </GuestLayout>
      </div>

    );
  }
}

export { IndividualOffer };
