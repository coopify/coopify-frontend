import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import {
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { loadScript } from '@pawjs/pawjs/src/utils/utils';
import _ from 'lodash';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { attemptCategoriesAction } from '../../actions/user';


export default @connect(state => ({
  error: state.error,
  userDidSignUp: state.userDidSignUp,
  categories: state.categories,
}))

class BasicData extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func,
      categories: PropTypes.arrayOf(PropTypes.string),
      onOfferImageChange: PropTypes.func,
      onOfferInputChangeStep1: PropTypes.func,
      onCategoriesChange: PropTypes.func,
      offer: PropTypes.objectOf(PropTypes.object),
    };

    static defaultProps = {
      dispatch: () => {},
      categories: [],
      onOfferImageChange: () => {},
      onOfferInputChangeStep1: () => {},
      onCategoriesChange: () => {},
      offer: {},
    };

    onLoginRedirectUrl = '/home';

    constructor(props) {
      super(props);
      this.state = {
        categoriesSelected: [],
      };
    }

    componentDidMount() {
      loadScript('//widget.cloudinary.com/global/all.js');
      const { dispatch } = this.props;
      dispatch(attemptCategoriesAction());
    }

    changeImage() {
      cloudinary.openUploadWidget({
        cloud_name: 'coopify-media', upload_preset: 'coopify-media',
      }, (result) => {
        if (result && result.length > 0) {
          const img = {
            url: result[0].secure_url,
          };
          const { offer } = this.state;
          offer.pictureURL = img.url;
          _.assignIn({}, this.state, {
            offer,
          });
          const { onOfferImageChange } = this.props;
          onOfferImageChange(img.url);
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
      const { onOfferInputChangeStep1 } = this.props;
      onOfferInputChangeStep1(newOffer);
    }

    handleOnCategoryChange(e) {
      const newCategories = e.target.value;
      const { state } = this.state;
      this.setState({
        state,
        categoriesSelected: newCategories,
      });
      const { onCategoriesChange } = this.props;
      onCategoriesChange(newCategories);
    }

    render() {
      const { offer, categories } = this.props;
      const { categoriesSelected } = this.state;
      const { title, description } = offer;

      const pictureURL = offer && offer.images && offer.images[0] ? offer.images[0].url : '';

      return (

        <div className="columns is-centered p-t-xl p-r-md p-l-md">
          <div className="column is-half">
            <h1 className="title">Basic Data</h1>

            <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2"> Title </Form.Label>
                <Col sm="10">
                  <Form.Control type="textarea" name="title" onChange={e => this.handleOnChange(e)} value={title} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="2"> Description </Form.Label>
                <Col sm="10">
                  <Form.Control as="textarea" name="description" rows="8" onChange={e => this.handleOnChange(e)} value={description} />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2"> Image </Form.Label>
                <Col sm="10">
                  <Button onClick={e => this.changeImage(e)} onKeyDown={e => this.changeImage(e)} role="button">
                    {
                      pictureURL ? <img name="picture" src={pictureURL} alt="Profile" /> : 'Upload Image'
                    }
                  </Button>
                </Col>
              </Form.Group>

              <h4 style={{ color: 'black' }}>Categories</h4>

              <FormControl style={{ display: 'block' }}>
                <Select
                  name="categories"
                  multiple
                  value={categoriesSelected}
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
                  {categories.map(name => (
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
