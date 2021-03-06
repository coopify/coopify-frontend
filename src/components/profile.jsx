
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Row, Col, ListGroup, Form,
} from 'react-bootstrap';
import Switch from 'react-switch';
import { Link } from 'react-router-dom';
import { loadScript } from '@pawjs/pawjs/src/utils/utils';
import { Loading } from './loading';
import { Protected } from './protected';
import styles from '../resources/css/profile.scss';
import {
  attemptProfileAction,
  onChangeProfileInputAction,
  changeProfileImage,
  resetNotificationFlagsUser,
  attemptGetUserReviews,
  attemptGetUser,
} from '../actions/user';
import GuestLayout from './guest-layout';
import { getUrlSocialAPICall } from '../api';
import StarRatingComponent from 'react-star-rating-component';
import TextField from '@material-ui/core/TextField';
import avatarImg from '../assets/avatar.png';

export default @connect(state => ({
  loggedUser: state.user.loggedUser,
  error: state.user.error,
  loading: state.user.loading,
  reviews: state.review.reviews,
  profileUser: state.user.profileUser,
  profileIsModified: state.user.profileModified,
}))

class Profile extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    loading: PropTypes.bool,
    error: PropTypes.string,
    reviews: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.object)),
    profileUser: PropTypes.objectOf(PropTypes.object),
    profileIsModified: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    reviews: [],
    profileUser: {},
    profileIsModified: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      profileModified: false,
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

  notify(message, isError) {
    const { dispatch } = this.props;
    if (isError) {
      toast.error(message);
      dispatch(resetNotificationFlagsUser());
    } else {
      toast.success(message);
      dispatch(resetNotificationFlagsUser());
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
    const { loading, error, loggedUser, reviews, profileUser, profileIsModified } = this.props;
    const { checked } = this.state;
    if (error.length > 0) this.notify(error, true);
    if (profileIsModified) this.notify('Profile succesfully updated', false);
    const edition = !checked;
    const focusable = !checked ? 'disabled' : '';
    const dateBirth = profileUser.birthdate ? profileUser.birthdate.substring(0, 10)
      : new Date(Date.now()).toISOString().substring(0, 10);
    const displayFBBtn = profileUser.FBSync ? 'none' : 'inline-block';
    const userRating = profileUser.rateCount > 0 ? profileUser.rateSum / profileUser.rateCount : 0;
    const marginBetween = '5%';
    const showEditionSwitch = loggedUser.id == profileUser.id ? 'block' : 'none';
    const noEditable = loggedUser.id != profileUser.id;
    const userPicture = profileUser.pictureURL == null ? avatarImg : profileUser.pictureURL;

    return (
      <GuestLayout>

        <Loading>

          <div className={styles.container}>
            <form onSubmit={e => this.handleSubmit(e)}>
              <Row>
                <Col sm={12}>

                  <h2 style={{ textAlign: 'center' }}> Profile </h2>

                  <div style={{ display: showEditionSwitch }}>
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

                <Col sm={4} style={{
                  marginLeft: '0%', background: 'whitesmoke', borderRadius: '10%',
                  paddingTop: '15px', paddingBottom: '15px'
                }}>
                  <div style={{ borderColor: 'red', marginTop: '10%' }} onClick={() => this.changeImage()}>
                    <img className={styles.picture} alt="profile" name="picture" src={userPicture} />
                  </div>

                  <StarRatingComponent
                    name="RatingService"
                    editing={false}
                    renderStarIcon={() => <span>&#9733;</span>}
                    starCount={5}
                    value={Number.parseFloat(userRating).toFixed(2)}
                  />

                  <div
                    style={{ textAlign: 'center', display: showEditionSwitch, marginBottom: '10%' }}
                  >
                    <Button
                      onClick={this.handleIntegrateFBBtnClick}
                      style={{ display: displayFBBtn, color: 'black', background: 'white', borderRadius: '25px' }}
                    >

                      {'Sync with Facebook '}
                      <i className="fa fa-facebook-square fa-20x" style={{ color: '#3C5A99' }} />

                    </Button>
                  </div>

                </Col>
                {!noEditable ? (
                  <Col sm={4}>

                    <div className="field">
                      <label className="label" htmlFor="name">
                        {'First name'}
                        <div className="control">
                          <input
                            name="name"
                            value={profileUser.name}
                            onChange={e => this.handleOnChange(e)}
                            placeholder="Name"
                            className={!noEditable ? ('form-control') : 'nonEditable'}
                            readOnly={edition}
                            disabled={focusable}
                          />
                        </div>
                      </label>
                    </div>


                    <div className="field">
                      <label className="label" htmlFor="lastname">
                        {'Last name'}
                        <div className="control">
                          <input
                            name="lastname"
                            value={profileUser.lastName}
                            onChange={e => this.handleOnChange(e)}
                            placeholder="Last name"
                            className={!noEditable ? ('form-control') : 'nonEditable'}
                            readOnly={edition}
                            disabled={focusable}
                          />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="direction">
                        {'Address'}
                        <div className="control">
                          <input name="direction"
                            value={profileUser.address}
                            onChange={e => this.handleOnChange(e)}
                            placeholder="Address"
                            className={!noEditable ? ('form-control') : 'nonEditable'}
                            readOnly={edition}
                            disabled={focusable}
                          />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="tel">
                        {'Phone'}
                        <div className="control">
                          <input
                            type="number"
                            name="tel"
                            value={profileUser.phone}
                            onChange={e => this.handleOnChange(e)}
                            placeholder="Phone"
                            className={!noEditable ? ('form-control') : 'nonEditable'}
                            readOnly={edition}
                            disabled={focusable}
                          />
                        </div>
                      </label>
                    </div>

                  </Col>) : ''
                }
                {!noEditable ? (
                  <Col sm={4} style={{ paddingBottom: '15px' }}>

                    <div className="field">
                      <label className="label" htmlFor="dateBorn">
                        {'Birthdate'}
                        <div className="control">
                          <input
                            name="dateBorn"
                            type="date"
                            onChange={e => this.handleOnChange(e)}
                            value={dateBirth}
                            placeholder="Birthdate"
                            className={!noEditable ? ('form-control') : 'nonEditable'}
                            readOnly={edition}
                            disabled={focusable}
                          />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="biography">
                        {'Biography'}
                        <div className="control">
                          <input
                            name="biography"
                            type="textarea"
                            onChange={e => this.handleOnChange(e)}
                            value={profileUser.bio}
                            placeholder="Biography"
                            className={!noEditable ? ('form-control') : 'nonEditable'}
                            readOnly={edition}
                            disabled={focusable}
                          />
                        </div>
                      </label>
                    </div>

                    <div className="field">
                      <label className="label" htmlFor="interests">
                        {'Interests'}
                        <div className="control">
                          <input
                            name="interests"
                            type="textarea"
                            onChange={e => this.handleOnChange(e)}
                            value={profileUser.interests}
                            placeholder="Interests"
                            className={!noEditable ? ('form-control') : 'nonEditable'}
                            readOnly={edition}
                            disabled={focusable}
                          />
                        </div>
                      </label>
                    </div>

                  </Col>) : (
                    <Col sm={8} style={{ paddingTop: '15px', paddingBottom: '15px' }}>
                      <Form style={{ background: 'whitesmoke', borderRadius: '5%' }}>
                        <Form.Group as={Row}>
                          <Form.Label column sm="4">
                            {'Name'}
                          </Form.Label>
                          <Col sm="8">
                            {(profileUser.lastName != undefined) ?
                              (<Form.Control className="data" plaintext readOnly placeholder="-------" value={`${profileUser.name} ${profileUser.lastName}`} />)
                              : (<Form.Control className="data" plaintext readOnly placeholder="-------" value={`${profileUser.name}`} />)
                            }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="4">
                            {'Address'}
                          </Form.Label>
                          <Col sm="8">
                            {(profileUser.address != undefined) ?
                              (<Form.Control className="data" plaintext readOnly placeholder="-------" value={`${profileUser.address}`} />)
                              : (<Form.Control className="data" plaintext readOnly placeholder="-------" />)
                            }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="4">
                            {'Phone'}
                          </Form.Label>
                          <Col sm="8">
                            {(profileUser.phone != undefined) ?
                              <Form.Control className="data" plaintext readOnly placeholder="-------" value={`${profileUser.phone}`} />
                              : (<Form.Control className="data" plaintext readOnly placeholder="-------" />)
                            }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="4">
                            {'Birthdate'}
                          </Form.Label>
                          <Col sm="8">
                            {(profileUser.birthdate != undefined) ?
                              <Form.Control className="data" plaintext readOnly placeholder="-------" value={`${profileUser.birthdate}`} />
                              : (<Form.Control className="data" plaintext readOnly placeholder="-------" />)
                            }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="4">
                            {'Biography'}
                          </Form.Label>
                          <Col sm="8">
                            {(profileUser.biography != undefined) ?
                              <Form.Control className="data" style={{ wordWrap: 'break-word' }} plaintext readOnly placeholder="-------" value={`${profileUser.biography}`} />
                              : (<Form.Control className="data" plaintext readOnly placeholder="-------" />)
                            }
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                          <Form.Label column sm="4">
                            {'Interests'}
                          </Form.Label>
                          <Col sm="8">
                            {(profileUser.interests != undefined) ?
                              <Form.Control className="data" plaintext readOnly placeholder="-------" value={`${profileUser.interests}`} />
                              : (<Form.Control className="data" plaintext readOnly placeholder="-------" />)
                            }
                          </Col>
                        </Form.Group>
                      </Form>
                    </Col>)
                }
              </Row>
              <Row style={{ marginTop: '2%' }}>
                <Col sm={12}>
                  {!edition ? (
                    <Button
                      style={{ margin: '10px' }}
                      bsstyle="primary"
                      type="submit"
                    >
                      {' '}
                      {'Accept'}
                    </Button>
                  ) : ''
                  }
                  {!edition ? (
                    <Link to={`/home`}>
                      <Button
                        style={{ margin: '10px' }}
                        variant="light"
                      >
                        {' '}
                        {'Cancel'}
                      </Button>
                    </Link>
                  ) : ''
                  }

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

        </Loading>
      </GuestLayout>
    );
  }
}

export { Profile };
