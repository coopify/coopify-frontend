import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptChangeFilters, attemptCategoriesAction } from '../actions/user';
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
import Protected from './protected';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import StarRatingComponent from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Offers } from './offers';
import { BARTER_PAYMENT, COOPI_PAYMENT, HOUR_EXCHANGE, SESSION_EXCHANGE, PRODUCT_EXCHANGE } from './offerCreation/offerEnums';
import Slider from 'rc-slider';
import makeAnimated from 'react-select/lib/animated';
//import SearchField from 'react-search-field';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';


export default @connect(state => ({
    error: state.error,
    loading: state.loading,
    offers: state.offers,
    categories: state.categories
}))

class FilterOffers extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func,
        error: PropTypes.string,
        offers: PropTypes.array,
        categories: PropTypes.array
    };

    static defaultProps = {
        dispatch: () => {
        },
        offers: [],
        error: '',
        categories: []
    };

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
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
            showEI: false
        };
    }

    notify(message, isError) {
        const { dispatch } = this.props;
        if (isError) {
            toast.error(message);
            dispatch(resetError());
        }
        else {
            toast.success(message)
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(attemptCategoriesAction());
    }

    handleSearchNameChange(e){
        const newName = e.target.value;
        this.setState({
            ...this.state, searchName: newName
        });
    }

    handlePaymentChange(e){
        const paymentMethod = e.target.name;
        var isChecked = e.target.checked;
        var showExchangeInstance = (paymentMethod != COOPI_PAYMENT) || (paymentMethod == COOPI_PAYMENT) 

        if(isChecked){
            this.setState({
                ...this.state,
                paymentMethods: [...this.state.paymentMethods, paymentMethod],
                showEI: paymentMethod == COOPI_PAYMENT ? isChecked : this.state.showEI
            });
        }
        else{
            this.setState({
                ...this.state, 
                paymentMethods: this.state.paymentMethods.filter(item => item !== paymentMethod),
                showEI: paymentMethod == COOPI_PAYMENT ? isChecked : this.state.showEI
            });
        }
    }

    handleExchangeChange(e){
        const exchangeMethod = e.target.name;
        var isChecked = e.target.checked;

        if(isChecked){
            this.setState({
                ...this.state, exchangeMethods: [...this.state.exchangeMethods, exchangeMethod]
            });
        }
        else{
            this.setState({
                ...this.state, exchangeMethods: this.state.exchangeMethods.filter(item => item !== exchangeMethod)
            });
        }
    }

    handlePricesChange(prices){
        const lowerPrice = prices[0];
        const upperPrice = prices[1];
        const newPrices = [lowerPrice, upperPrice];

        this.setState({
            ...this.state, prices: newPrices
        });
    }

    handleCategoriesChange(e){
        const newCategories = e.target.value;
        this.setState({
            ...this.state, categories: newCategories
        });
    }

    handleSortByChange(e){
        const newSortBy = e.target.value;
        this.setState({
            ...this.state, sortBy: newSortBy
        });
    }

    handleApplyFilter(e){
        const { dispatch } = this.props;

        const filters = 
        {
            name: this.state.searchName,
            paymentMethods: this.state.paymentMethods, 
            exchangeMethods: this.state.exchangeMethods, 
            lowerPrice: this.state.prices[0],
            upperPrice: this.state.prices[1],
            categories: this.state.categories,
            orderBy: this.state.sortBy.toLowerCase()
        };

        dispatch(attemptChangeFilters(filters));
    }


    render() {
        const { error, offers, categories } = this.props
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);
        const { classes } = this.props;
        const sortOptions = ['Price','Date','Rate'];
        const showEI = this.state.showEI ? 'block' : 'none';

        if (error.length > 0) this.notify(error, true)


        return (
            <Protected>
                <GuestLayout>
                    <div className={styles.container}>

        
                    <Form.Group as={Row}>     
                        <Col sm={3} style={{marginTop: "5%"}}>


{/* <SearchField 
  placeholder='Search offer...'
  onChange={e => this.handleSearchNameChange(e)}
  value = {this.state.searchName}
  onSearchClick = {e => this.handleApplyFilter(e)}
/> */}

<Input type="text"
placeholder='Search offer...'
onChange={e => this.handleSearchNameChange(e)}
value = {this.state.searchName}
/>

<h4 style={{color: "black", marginTop: "10%"}}>Payment instance</h4>

<Form.Group check style={{textAlign: "left", marginLeft:"20%"}}>
          <Form.Label check>
            <input type="checkbox" name={BARTER_PAYMENT} onChange={e => this.handlePaymentChange(e)}/>
            {BARTER_PAYMENT}
          </Form.Label>
</Form.Group>

<Form.Group check style={{textAlign: "left", marginLeft:"20%"}}>
          <Form.Label check>
            <input type="checkbox" name={COOPI_PAYMENT} onChange={e => this.handlePaymentChange(e)}/>
            {COOPI_PAYMENT}
          </Form.Label>
</Form.Group>


<h4 style={{color: "black", display: showEI}}>Exchange instance</h4>

<Form.Group check style={{textAlign: "left", marginLeft:"20%", display: showEI}}>
          <Form.Label check>
            <input type="checkbox" name={HOUR_EXCHANGE} onChange={e => this.handleExchangeChange(e)}/>
            {HOUR_EXCHANGE}
          </Form.Label>
</Form.Group>

<Form.Group check style={{textAlign: "left", marginLeft:"20%", display: showEI}}>
          <Form.Label check>
            <input type="checkbox" name={SESSION_EXCHANGE} onChange={e => this.handleExchangeChange(e)}/>
            {SESSION_EXCHANGE}
          </Form.Label>
</Form.Group>

<Form.Group check style={{textAlign: "left", marginLeft:"20%", display: showEI}}>
          <Form.Label check>
            <input type="checkbox" name={PRODUCT_EXCHANGE} onChange={e => this.handleExchangeChange(e)}/>
            {PRODUCT_EXCHANGE}
          </Form.Label>
</Form.Group>


<h4 style={{color: "black", display: showEI}}>Price range</h4>


      <Range min={0} max={100} defaultValue={this.state.prices} tipFormatter={value => `${value} Coopi`} allowCross={false} style={{marginBottom: "10%", display: showEI}} onAfterChange={e => this.handlePricesChange(e)}/>

<h4 style={{color: "black"}}>Categories</h4>

    <FormControl style={{display: "block"}}>
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

<h4 style={{color: "black", marginTop: "10%"}}>Sort By</h4>

            <FormControl style={{display: "block"}}>
          <Select
            value={this.state.sortBy}
            onChange={e => this.handleSortByChange(e)}
            >
            {sortOptions.map(name => (
            <MenuItem key={name} value={name}>
            {name}
            </MenuItem>
            ))}

          </Select>
        </FormControl>

    <Button style={{marginTop: "10%"}} onClick={e => this.handleApplyFilter(e)}>Apply Filters</Button>

                            </Col>
                        <Col sm={9}>
                            <Offers isHome={false}/>
                        </Col>

                        </Form.Group>
                    </div>
                </GuestLayout>
            </Protected>
        );
    }
}

export { FilterOffers }