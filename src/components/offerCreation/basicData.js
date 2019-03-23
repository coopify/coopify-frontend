
import React from 'react';
import { attemptSignUpAction } from '../../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {Form, Row, Col, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import {loadScript} from "@pawjs/pawjs/src/utils/utils";
import {loadStyle} from "@pawjs/pawjs/src/utils/utils";
import '../../css/stepZilla.css';

export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  userDidSignUp: state.userDidSignUp
}))

class BasicData extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    userDidSignUp: PropTypes.bool
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    userDidSignUp: false
  };

  onLoginRedirectUrl = '/home';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      userDidSignUp: false
    };
  }

  componentDidMount(){
    loadScript("//widget.cloudinary.com/global/all.js").then((res) => {} ).catch(err => {});
  }

  changeImage(e) {
    const {dispatch} = this.props;

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

                //dispatch(changeProfileImage(img));
              }
          }
        );
  }


  handleSubmit(e) {
    if (e && e.preventDefault) { //Evita refresh al pepe
      e.preventDefault();
    }
    const { dispatch } = this.props;
    const signUpData = new FormData(e.target);

    const name = signUpData.get('name');
    const email = signUpData.get('email');
    const password = signUpData.get('password');
    const repeatedPassword = signUpData.get('repeatPassword');

    const userSignUpData = 
    {
      name: name,
      email: email,
      password: password,
      repeatedPassword: repeatedPassword
    };

    dispatch(attemptSignUpAction(userSignUpData));
  }

   async handleSocialSignUp(e) {
    const socialSelected = e.target.value;
    const response = await getUrlSocialAPICall(socialSelected);
    const url = response.data;
    window.location = url;
  }

  render() {
    const {error, userDidSignUp} = this.props
    if(error.length > 0) this.notify(error, true)

    return (
          <div className="columns is-centered p-t-xl p-r-md p-l-md">   
          <div className="column is-half">
            <h1 className="title">Basic Data</h1>

            <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                Title
                </Form.Label>
                <Col sm="10">
                <Form.Control type="textarea" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2">
                Description
                </Form.Label>
                <Col sm="10">
                <Form.Control as="textarea" rows="8" />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                Image
                </Form.Label>
                <Col sm="10">
                    <div onClick={e => this.changeImage(e)}>
                        Upload Image
                        <img name="picture"/>
                    </div>
                </Col>
            </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                Category
                </Form.Label>
                <Col sm="10">
                <Form.Control as="select">
                    <option>Musica</option>
                    <option>Tecnologia</option>
                    <option>Fontaneria</option>
                    <option>Tapizado</option>
                    <option>Otros</option>
                </Form.Control>
                </Col>
            </Form.Group>
            </Form>

</div>
 </div>

    );
  }
}

export { BasicData }