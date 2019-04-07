import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptCategoriesAction } from '../actions/user';
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
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';


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
        error: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            offers: [],
            error: '',
            page: 0,
            limit: 10,
            filters: {},

            searchName: '',
            paymentMethods: [],
            exchangeMethods: [],
            prices: [],
            categories: []
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
        //dispatch(attemptCategoriesAction());
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

        if(isChecked){
            this.setState({
                ...this.state, paymentMethods: [...this.state.paymentMethods, paymentMethod]
            });
        }
        else{
            this.setState({
                ...this.state, paymentMethods: this.state.paymentMethods.filter(item => item !== paymentMethod)
            });
        }
        var p = this.state.paymentMethods;
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


    handleApplyFilter(e){
        this.setState({
            ...this.state, 
            filters: { paymentMethods: this.state.paymentMethods, exchangeMethods: this.state.exchangeMethods }
        });
    }


    render() {
        const { error, offers, categories } = this.props
        const createSliderWithTooltip = Slider.createSliderWithTooltip;
        const Range = createSliderWithTooltip(Slider.Range);

        if (error.length > 0) this.notify(error, true)


        return (
            <Protected>
                <GuestLayout>
                    <div className={styles.container}>

        
                    <Form.Group as={Row}>     
                        <Col sm={3} style={{marginTop: "5%"}}>


<h4 style={{color: "black"}}>Payment instance</h4>

<Form.Group check style={{textAlign: "left", marginLeft:"20%"}}>
          <Form.Label check>
            <input type="checkbox" name={COOPI_PAYMENT} onChange={e => this.handlePaymentChange(e)}/>
            {COOPI_PAYMENT}
          </Form.Label>
</Form.Group>

<Form.Group check style={{textAlign: "left", marginLeft:"20%"}}>
          <Form.Label check>
            <input type="checkbox" name={BARTER_PAYMENT} onChange={e => this.handlePaymentChange(e)}/>
            {BARTER_PAYMENT}
          </Form.Label>
</Form.Group>


<h4 style={{color: "black"}}>Exchange instance</h4>

<Form.Group check style={{textAlign: "left", marginLeft:"20%"}}>
          <Form.Label check>
            <input type="checkbox" name={HOUR_EXCHANGE} onChange={e => this.handleExchangeChange(e)}/>
            {HOUR_EXCHANGE}
          </Form.Label>
</Form.Group>

<Form.Group check style={{textAlign: "left", marginLeft:"20%"}}>
          <Form.Label check>
            <input type="checkbox" name={SESSION_EXCHANGE} onChange={e => this.handleExchangeChange(e)}/>
            {SESSION_EXCHANGE}
          </Form.Label>
</Form.Group>

<Form.Group check style={{textAlign: "left", marginLeft:"20%"}}>
          <Form.Label check>
            <input type="checkbox" name={PRODUCT_EXCHANGE} onChange={e => this.handleExchangeChange(e)}/>
            {PRODUCT_EXCHANGE}
          </Form.Label>
</Form.Group>


<h4 style={{color: "black"}}>Price range</h4>


      <Range min={0} max={50} defaultValue={[1, 50]} tipFormatter={value => `${value} Coopi`} allowCross={false} style={{marginBottom: "10%"}}/>

<h4 style={{color: "black"}}>Categories</h4>

<Select
      closeMenuOnSelect={false}
      components={makeAnimated()}
      isMulti
      options={categories}
    />

    <Button onClick={e => this.handleApplyFilter(e)}>Apply Filter</Button>

                            </Col>
                        <Col sm={9}>
                            <Offers filters={this.state.filters}/>
                        </Col>

                        </Form.Group>
                    </div>
                </GuestLayout>
            </Protected>
        );
    }
}

export { FilterOffers }