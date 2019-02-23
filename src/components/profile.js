
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie';
import Authenticator from './fake-authenticator';
import { attemptProfileAction } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
import '../css/form-elements.css'
import 'font-awesome/css/font-awesome.min.css';
import styles from '../css/profile.scss';
import { Button, Input, Row, Col } from 'react-bootstrap';
import Switch from "react-switch";
//import DropDown from './dropdown';

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
    const interests = data.get('interests');
    const token = localStorage.getItem("token");

    const userProfileData = 
    {
      name : name,
      lastname : lastname,
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

  handleSwitchChange(e) {
    this.setState(prevState => ({
      checked: !prevState.checked
}))
  }

  handleCancelClick(e){
    <Redirect to='/home'/>
  }

  render() {
    const { loading, error, loggedUser } = this.props
    if(error.length > 0) this.notify(error, true)
    const genders = ['Male', 'Female', 'Other', 'Unespecified'];
    const edition = !this.state.checked;

    return (
      <GuestLayout>
        <div className={styles.container}>
        <form onSubmit={e => this.handleSubmit(e)}>
        <Row>
            <Col sm={12}>
                <Switch
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
                      Edit
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
              <img className={styles.picture} src='https://cdn0.iconfinder.com/data/icons/user-collection-4/512/selected_user-512.png' />
            </Col>
            <Col sm={3}>

              <div className="field">
                <label className="label" htmlFor="name">Name</label>
                <div className="control">
                  <input name="name" value={loggedUser.name} placeholder="Name" className="form-control" readOnly={edition}></input>  
                </div> 
              </div> 


              <div className="field">
                <label className="label" htmlFor="lastname">Last name</label>
                <div className="control">
              <input name="lastname" value={loggedUser.lastname} placeholder="Last name" className="form-control" readOnly={edition}></input>    
              </div> 
              </div> 

              <div className="field">
                <label className="label" htmlFor="direction">Direction</label>
                <div className="control">
              <input name="direction" value={loggedUser.direction} placeholder="Direction" className="form-control" readOnly={edition}></input>    
              </div> 
              </div> 

              <div className="field">
                <label className="label" htmlFor="tel">Tel</label>
                <div className="control">
              <input type="number" name="tel" value={loggedUser.tel} placeholder="Tel" className="form-control" readOnly={edition}></input>    
              </div> 
              </div>

            </Col>

              <Col sm={3}>

                <div className="field">
                    <label className="label" htmlFor="dateBorn">Date born</label>
                  <div className="control">
              <input name="dateBorn" type="date" className="form-control" value={loggedUser.dateBorn} readOnly={edition}></input>  
              </div> 
              </div> 

              {/* <DropDown name="gender" label={loggedUser.gender} field={loggedUser.gender} values={genders} /> */} 

              <div className="field">
                <label className="label" htmlFor="biography">Biography</label>
                <div className="control">
              <input name="biography" type="textarea" value={loggedUser.biography} placeholder="Biography" className="form-control" readOnly={edition}></input> 
                </div> 
              </div> 

              <div className="field">
                <label className="label" htmlFor="interests">Interests</label>
                <div className="control">
                <input name="interests" type="textarea" value={loggedUser.interests} placeholder="Interests" className="form-control" readOnly={edition}></input> 
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
              <Button
                bsstyle="default"
                onClick={e => this.handleCancelClick(e)}
              > Cancel
              </Button>
            </Col>
          </Row>
        </form>
        </div>
      </GuestLayout>
    );
  }
}

export { Profile }