
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Row, Col,
} from 'react-bootstrap';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import { loadScript } from '@pawjs/pawjs/src/utils/utils';
import LoadingScreen from 'react-loading-screen';
import { Protected } from './protected';
import styles from '../resources/css/profile.scss';
import {
  attemptProfileAction, onChangeProfileInputAction, changeProfileImage, resetNotificationFlags, attemptGetUserReviews, attemptGetUser
} from '../actions/user';
import GuestLayout from './guest-layout';
import { getUrlSocialAPICall } from '../api';
import StarRatingComponent from 'react-star-rating-component';
import TextField from '@material-ui/core/TextField';
import avatarImg from '../assets/avatar.png';

export default @connect(state => ({
  loggedUser: state.user.user,
  error: state.user.error,
  loading: state.user.loading,
  reviews: state.review.reviews,
  profileUser: state.user.profileUser,
}))

class Profile extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    reviews: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
    profileUser: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    reviews: [],
    profileUser: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleIntegrateFBBtnClick = this.handleIntegrateFBBtnClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    loadScript('//widget.cloudinary.com/global/all.js');

    const payload = {
      userId: this.props.match.params.id,
    };

    dispatch(attemptGetUser(payload));
    dispatch(attemptGetUserReviews(payload));
  }

  notify = (message, isError) => {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetNotificationFlags());
    } else {
      toast.success(message);
    }
  }

  handleIntegrateFBBtnClick = async () => {
    const socialSelected = 'facebook';
    const res = await getUrlSocialAPICall(socialSelected);
    const url = res.data;
    window.location = url;
  }

  changeImage() {
    const { dispatch } = this.props;
    const { checked } = this.state;
    const edition = checked;

    if (edition) {
      cloudinary.openUploadWidget({ cloud_name: 'coopify-media', upload_preset: 'coopify-media' }, (error, result) => {
        if (result && result.length > 0) {
          const img = {
            url: result[0].secure_url,
          };
          dispatch(changeProfileImage(img));
        }
      });
    }
  }

  handleOnChange(e) {
    const { dispatch } = this.props;
    const data = new FormData(e.target.form);
    const name = data.get('name');
    const lastname = data.get('lastname');
    const direction = data.get('direction');
    const tel = data.get('tel');
    const dateBorn = data.get('dateBorn');
    const biography = data.get('biography');
    const interests = data.get('interests');

    const user = {
      name,
      lastName: lastname,
      address: direction,
      phone: tel,
      birthdate: dateBorn,
      bio: biography,
      interests,
    };
    dispatch(onChangeProfileInputAction(user));
  }

  handleSwitchChange() {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }));
  }

  handleSubmit(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const { dispatch, loggedUser } = this.props;
    const data = new FormData(e.target);
    const name = data.get('name');
    const lastname = data.get('lastname');
    const direction = data.get('direction');
    const tel = data.get('tel');
    const dateBorn = data.get('dateBorn');
    const biography = data.get('biography');
    const picture = loggedUser.pictureURL;
    const token = localStorage.getItem('token');

    const userProfileData = {
      pictureURL: picture,
      name,
      lastName: lastname,
      address: direction,
      phone: tel,
      birthdate: dateBorn,
      bio: biography,
      interests: [],
    };

    const reqAttributes = {
      userId: loggedUser.id,
      userToken: token,
      attributes: userProfileData,
    };

    dispatch(attemptProfileAction(reqAttributes));
  }

  render() {
    const { loading, error, loggedUser, reviews, profileUser } = this.props;
    const { checked } = this.state;
    if (error.length > 0) this.notify(error, true);
    const edition = !checked;
    const focusable = !checked ? 'disabled' : '';
    const dateBirth = profileUser.birthdate ? profileUser.birthdate.substring(0, 10)
      : new Date(Date.now()).toISOString().substring(0, 10);
    const displayFBBtn = profileUser.FBSync ? 'none' : 'inline-block';
    const userRating = profileUser.rateCount > 0 ? profileUser.rateSum / profileUser.rateCount : 0;
    const marginBetween = '5%';
    const showEditionSwitch = loggedUser.id == profileUser.id ? 'block' : 'none';
    const userPicture = profileUser.pictureURL == null ? avatarImg : profileUser.pictureURL;

    return (
        <GuestLayout>

          <LoadingScreen
            loading={loading}
            bgColor="rgba(255, 255, 255, .5)"
            spinnerColor="#BE1931"
            textColor="#BE1931"
            text="Loading..."
          >

            <div className={styles.container}>
              <form onSubmit={e => this.handleSubmit(e)}>
                <Row>
                  <Col sm={12}>

                    <h2 style={{ textAlign: 'center' }}> Profile </h2>

                    <div style={{ textAlign: 'center', display: showEditionSwitch }}>

                      <Button onClick={this.handleIntegrateFBBtnClick} style={{ display: displayFBBtn, backgroundColor: 'transparent', color: 'black' }}>

                        <div>Sync with Facebook</div>
                        <i className="fa fa-facebook-square" />
                      </Button>

                    </div>

                    <div style={{display: showEditionSwitch }}>
                      <div>Edit Mode</div>
                      <Switch
                        checked={checked}
                        onChange={() => this.handleSwitchChange()}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={30}
                        uncheckedIcon={(
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                              fontSize: 15,
                              color: 'orange',
                              paddingRight: 2,
                            }}
                          >

                            <div>Off</div>
                          </div>
  )}
                        checkedIcon={(
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: '100%',
                              fontSize: 15,
                              color: 'white',
                              paddingRight: 2,
                              paddingLeft: 10,
                            }}
                          >

                            {'On'}
                          </div>
)}

                      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={20}
                      width={62}
                      className="react-switch"
                      id="material-switch"
                    />
                    </div>
                  </Col>
                </Row>

                <Row style={{ marginTop: '2%' }}>

                  <Col sm={2} style={{ marginLeft: '10%' }}>
                    <div style={{ borderColor: 'red' }} onClick={() => this.changeImage()}>
                      <img className={styles.picture} alt="profile" name="picture" src={userPicture} />
                    </div>

                  <StarRatingComponent
                    name="RatingService"
                    editing={false}
                    renderStarIcon={() => <span>&#9733;</span>}
                    starCount={5}
                    value={Number.parseFloat(userRating).toFixed(2)}
                 />

                  </Col>
                  <Col sm={3}>

                    <div className="field">
                      <label className="label" htmlFor="name">
                        {'First name'}
                        <div className="control">
                          <input name="name" value={profileUser.name} onChange={e => this.handleOnChange(e)} placeholder="Name" className="form-control" readOnly={edition} disabled={focusable} />
                        </div>
                      </label>
                    </div>


                    <div className="field">
                      <label className="label" htmlFor="lastname">
                        {'Last name'}
                        <div className="control">
                          <input name="lastname" value={profileUser.lastName} onChange={e => this.handleOnChange(e)} placeholder="Last name" className="form-control" readOnly={edition} disabled={focusable} />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="direction">
                        {'Address'}
                        <div className="control">
                          <input name="direction" value={profileUser.address} onChange={e => this.handleOnChange(e)} placeholder="Direction" className="form-control" readOnly={edition} disabled={focusable} />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="tel">
                        {'Phone'}
                        <div className="control">
                          <input type="number" name="tel" value={profileUser.phone} onChange={e => this.handleOnChange(e)} placeholder="Tel" className="form-control" readOnly={edition} disabled={focusable} />
                        </div>
                      </label>
                    </div>

                  </Col>

                  <Col sm={3}>

                    <div className="field">
                      <label className="label" htmlFor="dateBorn">
                        {'Birthdate'}
                        <div className="control">
                          <input name="dateBorn" type="date" onChange={e => this.handleOnChange(e)} className="form-control" value={dateBirth} readOnly={edition} disabled={focusable} />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="biography">
                        {'Biography'}
                        <div className="control">
                          <input name="biography" type="textarea" onChange={e => this.handleOnChange(e)} value={profileUser.bio} placeholder="Biography" className="form-control" readOnly={edition} disabled={focusable} />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="interests">
                        {'Interests'}
                        <div className="control">
                          <input name="interests" type="textarea" onChange={e => this.handleOnChange(e)} value={profileUser.interests} placeholder="Interests" className="form-control" readOnly={edition} disabled={focusable} />
                        </div>
                      </label>
                    </div>

                  </Col>
                </Row>
                <Row style={{ marginTop: '2%' }}>
                  <Col sm={12}>
                    { !edition ? (
                      <Button
                        bsstyle="primary"
                        type="submit"
                      >
                        {' '}
                        {'Accept'}
                      </Button>
                    ) : ''
            }

                    { !edition ? <Link className="button is-light" to="/home">Cancel</Link> : '' }


                  </Col>
                </Row>
              </form>

              <Row style={{ marginTop: marginBetween, marginBottom: marginBetween }}>
                <Col sm="2">
                  {' '}
                </Col>
                <Col sm="8">
                  <div className="card text-right">
                    <ul>
                      <div className="card-header">
                        <h4>Reviews: </h4>
                      </div>
                      {reviews.map(item => (
                        <div>
                          <Col>
                            {item.reviewer.name}
                            {' '}
                            {/* {item.date} */}
                            <StarRatingComponent
                              name="RatingReview"
                              editing={false}
                              renderStarIcon={() => <span>&#9733;</span>}
                              starCount={5}
                              value={item.userRate}
                            />
                            <TextField
                              value={item.description}
                              disabled
                              multiline
                              fullWidth
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Col>
                        </div>
                      ))}
                    </ul>
                  </div>
                </Col>
                <Col sm="2">
                  {' '}
                </Col>
              </Row>


            </div>
            <ToastContainer autoClose={3000} />

          </LoadingScreen>
        </GuestLayout>
    );
  }
}

export { Profile };
