import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import Slider from 'rc-slider';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {
  BARTER_PAYMENT, COOPI_PAYMENT, HOUR_EXCHANGE, SESSION_EXCHANGE, PRODUCT_EXCHANGE,
} from './offerCreation/offerEnums';
import { Offers } from './offers';
import { Protected } from './protected';
import styles from '../css/profile.scss';
import { resetError, attemptChangeFilters, attemptCategoriesAction } from '../actions/user';
import GuestLayout from './guest-layout';


export default @connect(state => ({
  error: state.error,
  loading: state.loading,
  categories: state.categories,
}))

class FilterOffers extends React.Component {
    static propTypes = {
      dispatch: PropTypes.func,
      error: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
      dispatch: () => {
      },
      error: '',
      categories: [],
    };

    constructor(props) {
      super(props);
      this.state = {
        error: '',
        page: 0,
        limit: 10,
        filterChanged: false,
        filters: {},
        searchName: '',
        paymentMethods: [],
        exchangeMethods: [],
        prices: [1, 100],
        categories: [],
        sortBy: 'Date',
        showEI: false,
      };
    }

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(attemptCategoriesAction());
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

    handleSearchNameChange(e) {
      const newName = e.target.value;
      this.setState({
        ...this.state, searchName: newName,
      });
    }

    handlePaymentChange(e) {
      const paymentMethod = e.target.name;
      const isChecked = e.target.checked;
      const { paymentMethods, showEI } = this.state;

      if (isChecked) {
        this.setState({
          ...this.state,
          paymentMethods: [...paymentMethods, paymentMethod],
          showEI: paymentMethod === COOPI_PAYMENT ? isChecked : showEI,
        });
      } else {
        this.setState({
          ...this.state,
          paymentMethods: paymentMethods.filter(item => item !== paymentMethod),
          showEI: paymentMethod === COOPI_PAYMENT ? isChecked : showEI,
        });
      }
    }

    handleExchangeChange(e) {
      const exchangeMethod = e.target.name;
      const isChecked = e.target.checked;
      const { exchangeMethods } = this.state;

      if (isChecked) {
        this.setState({
          ...this.state, exchangeMethods: [...exchangeMethods, exchangeMethod],
        });
      } else {
        this.setState({
          ...this.state, exchangeMethods: exchangeMethods.filter(item => item !== exchangeMethod),
        });
      }
    }

    handlePricesChange(prices) {
      const lowerPrice = prices[0];
      const upperPrice = prices[1];
      const newPrices = [lowerPrice, upperPrice];

      this.setState({
        ...this.state, prices: newPrices,
      });
    }

    handleCategoriesChange(e) {
      const newCategories = e.target.value;
      this.setState({
        ...this.state, categories: newCategories,
      });
    }

    handleSortByChange(e) {
      const newSortBy = e.target.value;
      this.setState({
        ...this.state, sortBy: newSortBy,
      });
    }

    handleApplyFilter() {
      const { dispatch } = this.props;
      const {
        searchName, paymentMethods, exchangeMethods, prices, categories, sortBy,
      } = this.state;

      const filters = {
        name: searchName,
        paymentMethods,
        exchangeMethods,
        lowerPrice: prices[0],
        upperPrice: prices[1],
        categories,
        orderBy: sortBy.toLowerCase(),
      };

      dispatch(attemptChangeFilters(filters));
    }


    render() {
      const { error } = this.props;
      const {
        showEI, prices, sortBy, searchName,
      } = this.state;
      const Range = Slider.createSliderWithTooltip(Slider.Range);
      const sortOptions = ['Price', 'Date', 'Rate'];
      const showEIDisplay = showEI ? 'block' : 'none';

      if (error.length > 0) this.notify(error, true);


      return (
        <Protected>
          <GuestLayout>
            <div className={styles.container}>


              <Form.Group as={Row}>
                <Col sm={3} style={{ marginTop: '5%' }}>


                  <Input
                    type="text"
                    placeholder="Search offer..."
                    onChange={e => this.handleSearchNameChange(e)}
                    value={searchName}
                    disableUnderline
                  />

                  <h4 style={{ color: 'black', marginTop: '10%' }}>Payment instance</h4>

                  <Form.Group check style={{ textAlign: 'left', marginLeft: '20%' }}>
                    <Form.Label check>
                      <input type="checkbox" name={BARTER_PAYMENT} onChange={e => this.handlePaymentChange(e)} />
                      {BARTER_PAYMENT}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group check style={{ textAlign: 'left', marginLeft: '20%' }}>
                    <Form.Label check>
                      <input type="checkbox" name={COOPI_PAYMENT} onChange={e => this.handlePaymentChange(e)} />
                      {COOPI_PAYMENT}
                    </Form.Label>
                  </Form.Group>


                  <h4 style={{ color: 'black', display: showEIDisplay }}>Exchange instance</h4>

                  <Form.Group check style={{ textAlign: 'left', marginLeft: '20%', display: showEIDisplay }}>
                    <Form.Label check>
                      <input type="checkbox" name={HOUR_EXCHANGE} onChange={e => this.handleExchangeChange(e)} />
                      {HOUR_EXCHANGE}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group check style={{ textAlign: 'left', marginLeft: '20%', display: showEIDisplay }}>
                    <Form.Label check>
                      <input type="checkbox" name={SESSION_EXCHANGE} onChange={e => this.handleExchangeChange(e)} />
                      {SESSION_EXCHANGE}
                    </Form.Label>
                  </Form.Group>

                  <Form.Group check style={{ textAlign: 'left', marginLeft: '20%', display: showEIDisplay }}>
                    <Form.Label check>
                      <input type="checkbox" name={PRODUCT_EXCHANGE} onChange={e => this.handleExchangeChange(e)} />
                      {PRODUCT_EXCHANGE}
                    </Form.Label>
                  </Form.Group>


                  <h4 style={{ color: 'black', display: showEIDisplay }}>Price range</h4>


                  <Range min={0} max={100} defaultValue={prices} tipFormatter={value => `${value} Coopi`} allowCross={false} style={{ marginBottom: '10%', display: showEI }} onAfterChange={e => this.handlePricesChange(e)} />

                  <h4 style={{ color: 'black' }}>Categories</h4>

                  <FormControl style={{ display: 'block' }}>
                    <Select
                      multiple
                      value={this.state.categories}
                      onChange={e => this.handleCategoriesChange(e)}
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

                  <h4 style={{ color: 'black', marginTop: '10%' }}>Sort By</h4>

                  <FormControl style={{ display: 'block' }}>
                    <Select
                      value={sortBy}
                      onChange={e => this.handleSortByChange(e)}
                    >
                      {sortOptions.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}

                    </Select>
                  </FormControl>

                  <Button style={{ marginTop: '10%' }} onClick={e => this.handleApplyFilter(e)}>Apply Filters</Button>

                </Col>
                <Col sm={9}>
                  <Offers isHome={false} />
                </Col>

              </Form.Group>
            </div>
          </GuestLayout>
        </Protected>
      );
    }
}

export { FilterOffers };
