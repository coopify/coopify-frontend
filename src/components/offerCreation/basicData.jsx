
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import { loadScript } from '@pawjs/pawjs/src/utils/utils';
import { loadStyle } from '@pawjs/pawjs/src/utils/utils';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { attemptSignUpAction, attemptCategoriesAction } from '../../actions/user';


export default @connect(state => ({ // eslint-disable-line
  loggedUser: state.user.loggedUser,
  error: state.service.error,
  loading: state.service.loading,
  userDidSignUp: state.user.userDidSignUp,
  categories: state.service.categories,
}))

class BasicData extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    userDidSignUp: PropTypes.bool,
    categories: PropTypes.array,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    userDidSignUp: false,
    categories: [],
  };

  onLoginRedirectUrl = '/home';

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      userDidSignUp: false,
      categories: [],
    };
  }

  componentDidMount() {
    loadScript('//widget.cloudinary.com/global/all.js').then((res) => { }).catch((err) => { });
    const { dispatch } = this.props;
    dispatch(attemptCategoriesAction());
  }

  changeImage(e) {
    const { dispatch } = this.props;

    const options = {
      cloud_name: 'coopify-media',
      upload_preset: 'coopify-media',
      multiple: true,
      returnJustUrl: true,
    };

    cloudinary.openUploadWidget({
      cloud_name: 'coopify-media', upload_preset: 'coopify-media',
    }, (error, result) => {
      if (result && result.length > 0) {
        const img = {
          url: result[0].secure_url,
        };

        const newState = _.assignIn({}, this.state, {
          offer: {
            ...this.state.offer,
            pictureURL: img.url,
          },
        });
        this.props.onOfferImageChange(img.url);
      }
    });
  }

  handleOnChange(e) {
    const data = new FormData(e.target.form);
    const title = data.get('title');
    const description = data.get('description');

    const newOffer = {
      title,
      description,
    };

    this.props.onOfferInputChangeStep1(newOffer);
  }

  handleOnCategoryChange(e) {
    const newCategories = e.target.value;
    this.setState({
      ...this.state,
      categories: newCategories,
    });

    this.props.onCategoriesChange(newCategories);
  }

  render() {
    const { error, offer } = this.props;

    const title = offer.title;
    const description = offer.description;

    const pictureURL = offer && offer.images && offer.images[0] ? offer.images[0].url : '';

    const category = offer.category;

    return (

      <div className="columns is-centered p-t-xl p-r-md p-l-md">
        <div className="column is-half">
          <h1 className="title">Basic Data</h1>

          <Form>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                {'Title'}
              </Form.Label>
              <Col sm="10">
                <Form.Control type="textarea" name="title" onChange={e => this.handleOnChange(e)} value={title} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                {'Description'}
              </Form.Label>
              <Col sm="10">
                <Form.Control as="textarea" name="description" rows="8" onChange={e => this.handleOnChange(e)} value={description} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Form.Label column sm="2">
              </Form.Label>
              <Col sm="10">

                {
                pictureURL ? <img name="picture" src={pictureURL} /> : (
                  <Button style={{ marginTop: '10%' }}
                    onClick={e => this.changeImage(e)}>
                    {'Upload Image'}
                  </Button>
                )}

              </Col>
            </Form.Group>

            <h4 style={{ color: 'black' }}>Categories</h4>

            <FormControl style={{ display: 'block' }}>
              <Select
                style={{width: '100%'}}
                name="categories"
                multiple
                value={this.state.categories}
                onChange={e => this.handleOnCategoryChange(e)}
                input={<Input id="select-multiple-chip" />}
                renderValue={selected => (
                  <div>
                    {selected.map(value => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {this.props.categories.map(name => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>


          </Form>

        </div>
      </div>
    );
  }
}

export { BasicData };
