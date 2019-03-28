
import React from 'react';
import { attemptSignUpAction } from '../../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import 'font-awesome/css/font-awesome.min.css';
import { loadScript } from "@pawjs/pawjs/src/utils/utils";
import { loadStyle } from "@pawjs/pawjs/src/utils/utils";
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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
        userDidSignUp: PropTypes.bool,
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

    componentDidMount() {
        loadScript("//widget.cloudinary.com/global/all.js").then((res) => { }).catch(err => { });
    }

    changeImage(e) {
        const { dispatch } = this.props;

        let options = {
            cloud_name: "coopify-media",
            upload_preset: "coopify-media",
            multiple: true,
            returnJustUrl: true
        };

        cloudinary.openUploadWidget({
            cloud_name: "coopify-media", upload_preset: "coopify-media"
        }, (error, result) => {
            if (result && result.length > 0) {
                const img = {
                    url: result[0].secure_url
                };

                const newState = _.assignIn({}, this.state, {
                    offer: {
                        ...this.state.offer,
                        pictureURL: img.url
                    }
                });
                //this.setState(newState);
                this.props.onOfferImageChange(img.url);
            }
        }
        );
    }

    handleOnChange(e) {
        const data = new FormData(e.target.form);
        const title = data.get('title');
        const description = data.get('description');
        const category = data.get('category');

        const newOffer =
        {
            title: title,
            description: description,
            category: category
        };

        this.props.onOfferInputChangeStep1(newOffer);

    }

    render() {
        const { error, offer, isReadOnly, readOnlyOffer, classes } = this.props

        const title = isReadOnly ? readOnlyOffer.title : offer.title
        const description = isReadOnly ? readOnlyOffer.description : offer.description

        const pictureURL = isReadOnly ?
            (readOnlyOffer && readOnlyOffer.images && readOnlyOffer.images[0] ? readOnlyOffer.images[0].url : '')
            :
            (offer && offer.images && offer.images[0] ? offer.images[0].url : '');

        //const pictureURL = 'fe.jpg'
        const category = isReadOnly ? readOnlyOffer.category : offer.category

        return (
            !isReadOnly ? 
            (
            <div className="columns is-centered p-t-xl p-r-md p-l-md">
                <div className="column is-half">
                    <h1 className="title">Basic Data</h1>

                    <Form>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Title
                </Form.Label>
                            <Col sm="10">
                                <Form.Control type="textarea" name="title" onChange={e => this.handleOnChange(e)} value={title} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="2">
                                Description
                </Form.Label>
                            <Col sm="10">
                                <Form.Control as="textarea" name="description" rows="8" onChange={e => this.handleOnChange(e)} value={description} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Image
                </Form.Label>
                            <Col sm="10">
                                <div onClick={e => this.changeImage(e)}>
                                    {
                                        pictureURL ? <img name="picture" src={pictureURL} />
                                            :
                                            "Upload Image"
                                    }

                                </div>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Category
                </Form.Label>
                            <Col sm="10">
                                <Form.Control value={category} as="select" name="category" onChange={e => this.handleOnChange(e)}>
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
        </div> ) :

        (
            <div className="columns is-centered p-t-xl p-r-md p-l-md">
            <div className="column is-half">
                <h1 className="title">{title}</h1>

                <p style={{width:"40%"}}>{description}</p>

                <Col sm="10">
                    <img name="picture" src={pictureURL} />
                </Col>
                
                <Chip label={category} />

                </div>
             </div>
        )
        );
    }
}

export { BasicData }