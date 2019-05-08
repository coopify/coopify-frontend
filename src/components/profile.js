
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie';
import Authenticator from './fake-authenticator';
import { attemptProfileAction, onChangeProfileInputAction, changeProfileImage, resetError } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import styles from '../css/profile.scss';
import { Button, Input, Row, Col } from 'react-bootstrap';
import Switch from "react-switch";
import Protected from './protected';
import { Link } from 'react-router-dom';
import {loadScript} from "@pawjs/pawjs/src/utils/utils";
import LoadingScreen from 'react-loading-screen';

export default @connect(state => ({
  loggedUser: state.user, //el state.user es el nuevo state que devuelve el reducer, y loggedUser el definido aca, se uso para mapear ambos y actualziarlos
  error: state.error,
  loading: state.loading
}))

class Profile extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      checked: false
    };
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

    const interests = data.get('interests');
    const token = localStorage.getItem("token");

    const userProfileData = 
    {
      pictureURL: picture,
      name : name,
      lastName : lastname,
      address : direction,
      phone : tel,
      birthdate : dateBorn,
      bio : biography,
      interests : [] //interests //[{ name: string, selected: boolean  }]
    };

    const reqAttributes = {
      userId: loggedUser.id,
      userToken: token,
      attributes: userProfileData
    }

    dispatch(attemptProfileAction(reqAttributes));
  }

  notify(message, isError){
    const {dispatch} = this.props;
    if(isError){
      toast.error(message);
      dispatch(resetError());
    }
    else{
      toast.success(message)
    }
  }

  componentDidMount(){
    loadScript("//widget.cloudinary.com/global/all.js").then((res) => {} ).catch(err => {});
  }

  handleSwitchChange(e) {
    this.setState(prevState => ({
      checked: !prevState.checked
  }))
  }

  handleOnChange(e){
    const { dispatch } = this.props;
    const data = new FormData(e.target.form);
    const name = data.get('name');
    const lastname = data.get('lastname');
    const direction = data.get('direction');
    const tel = data.get('tel');
    const dateBorn = data.get('dateBorn');
    const biography = data.get('biography');
    const interests = data.get('interests');

    const user =
    {
      name : name,
      lastName : lastname,
      address : direction,
      phone : tel,
      birthdate : dateBorn,
      bio : biography,
      interests : interests
    };
    dispatch(onChangeProfileInputAction(user));
  }

  changeImage(e) {
    const {dispatch} = this.props;
    const edition = this.state.checked;

    if(edition){

          let options = {
            cloud_name: "coopify-media",
            upload_preset: "coopify-media",
            multiple: true,
            returnJustUrl: true
        };

        cloudinary.openUploadWidget({
          cloud_name: "coopify-media", upload_preset: "coopify-media" }, (error, result) =>
          { 
              if(result && result.length > 0){
                const img = {
                  url: result[0].secure_url
                };

                dispatch(changeProfileImage(img));
              }
          }
        );
  }
  }

  render() {
    const { loading, error, loggedUser } = this.props
    if(error.length > 0) this.notify(error, true)
    const genders = ['Male', 'Female', 'Other', 'Unespecified'];
    const edition = !this.state.checked;
    const focusable = !this.state.checked ? 'disabled' : '';
    const dateBirth = loggedUser.birthdate ? loggedUser.birthdate.substring(0,10) : new Date(Date.now()).toISOString().substring(0,10);

    return (
      <Protected>
      <GuestLayout>

          <LoadingScreen
          loading={this.props.loading}
          bgColor='rgba(255, 255, 255, .5)'
          spinnerColor='#BE1931'
          textColor='#BE1931'
          text= {"Loading..."}> 

        <div className={styles.container}>
        <form onSubmit={e => this.handleSubmit(e)}>
        <Row>
            <Col sm={12}>

              <h2 style={{textAlign: 'center'}}> Profile </h2>
                
                Edit Mode <Switch
                  checked={this.state.checked}
                  onChange={e => this.handleSwitchChange(e)}
                  onColor="#86d3ff"
                  onHandleColor="#2693e6"
                  handleDiameter={30}
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        color: "orange",
                        paddingRight: 2
                      }}
                    >
                      Off
                    </div>
                  }
                  checkedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 15,
                        color: "white",
                        paddingRight: 2,
                        paddingLeft: 10
                      }}
                    >
                      On
                    </div>

                  }
                
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                  height={20}
                  width={62}
                  className="react-switch"
                  id="material-switch"
                />
            </Col>
          </Row>

          <Row style={{marginTop: '2%'}}>
            <Col sm={2} style={{marginLeft: '10%'}}>
            <div style={{borderColor: 'red'}} onClick={e => this.changeImage(e)}>
              <img className={styles.picture} name="picture" src={loggedUser.pictureURL} />
              </div>
            </Col>
            <Col sm={3}>

              <div className="field">
                <label className="label" htmlFor="name">First name</label>
                <div className="control">
                  <input name="name" value={loggedUser.name} onChange={e => this.handleOnChange(e)} placeholder="Name" className="form-control" readOnly={edition} disabled={focusable}></input>  
                </div> 
              </div> 


              <div className="field">
                <label className="label" htmlFor="lastname">Last name</label>
                <div className="control">
              <input name="lastname" value={loggedUser.lastName} onChange={e => this.handleOnChange(e)} placeholder="Last name" className="form-control" readOnly={edition} disabled={focusable}></input>    
              </div> 
              </div> 

              <div className="field">
                <label className="label" htmlFor="direction">Address</label>
                <div className="control">
              <input name="direction" value={loggedUser.address} onChange={e => this.handleOnChange(e)} placeholder="Direction" className="form-control" readOnly={edition} disabled={focusable}></input>    
              </div> 
              </div> 

              <div className="field">
                <label className="label" htmlFor="tel">Phone</label>
                <div className="control">
              <input type="number" name="tel" value={loggedUser.phone} onChange={e => this.handleOnChange(e)} placeholder="Tel" className="form-control" readOnly={edition} disabled={focusable}></input>    
              </div> 
              </div>

            </Col>

              <Col sm={3}>

                <div className="field">
                    <label className="label" htmlFor="dateBorn">Birthdate</label>
                  <div className="control">
              <input name="dateBorn" type="date" onChange={e => this.handleOnChange(e)} className="form-control" value={dateBirth} readOnly={edition} disabled={focusable}></input>  
              </div> 
              </div> 

              {/* <DropDown name="gender" label={loggedUser.gender} field={loggedUser.gender} values={genders} /> */} 

              <div className="field">
                <label className="label" htmlFor="biography">Biography</label>
                <div className="control">
              <input name="biography" type="textarea" onChange={e => this.handleOnChange(e)} value={loggedUser.bio} placeholder="Biography" className="form-control" readOnly={edition} disabled={focusable}></input> 
                </div> 
              </div> 

              <div className="field">
                <label className="label" htmlFor="interests">Interests</label>
                <div className="control">
                <input name="interests" type="textarea" onChange={e => this.handleOnChange(e)} value={loggedUser.interests} placeholder="Interests" className="form-control" readOnly={edition} disabled={focusable}></input> 
                </div> 
              </div> 

              </Col>
          </Row>
          <Row style={{marginTop: '2%'}}>
            <Col sm={12}>
            { !edition ?  <Button
              bsstyle="primary"
              type="submit"
            > Accept
            </Button> : ""
            }

            &nbsp;

            { !edition ?  <Link className="button is-light" to="/home">Cancel</Link> : "" }

              
            </Col>
          </Row>
        </form>
        </div>
        <ToastContainer autoClose={3000}/>

        </LoadingScreen>
      </GuestLayout>
      </Protected>
    );
  }
}

export { Profile }