
import React from 'react';
import { Redirect } from 'react-router-dom';
import GuestLayout from './guest-layout';
import cookie from '../libs/cookie/server';
import Authenticator from './fake-authenticator';
import { resetError, attemptShowOffer } from '../actions/user';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import styles from '../css/profile.scss';
import { Button, Input, Row, Col } from 'react-bootstrap';
import Switch from "react-switch";
import Protected from './protected';
import { Link } from 'react-router-dom';
import { loadScript } from "@pawjs/pawjs/src/utils/utils";

import { loadStyle } from "@pawjs/pawjs/src/utils/utils";
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import * as moment from 'moment';
import { GeneralQuestions } from './generalQuestions'


export default @connect(state => ({
  loggedUser: state.user,
  error: state.error,
  loading: state.loading,
  readOnlyOffer: state.offer
}))

class IndividualOffer extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    loggedUser: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.string,
    offer: PropTypes.object,
    readOnlyOffer: PropTypes.object,
  };

  static defaultProps = {
    dispatch: () => {
    },
    loggedUser: {},
    loading: false,
    error: '',
    offer: {},
    readOnlyOffer: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: {},
      loading: false,
      error: '',
      offer: {},
      readOnlyOffer: {},
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

    const token = localStorage.getItem("token");
    const offerId = this.props.match.params.id;

    const payload = {
      userToken: token,
      offerId: offerId
    }

    dispatch(attemptShowOffer(payload));
  }


  render() {
    const { loading, error, loggedUser, balance, readOnlyOffer } = this.props
    const { offer } = this.state
    const pictureUrl = readOnlyOffer && readOnlyOffer.images && readOnlyOffer.images.length > 0 ? readOnlyOffer.images[0].url : 'https://cdn2.vectorstock.com/i/1000x1000/01/61/service-gear-flat-icon-vector-13840161.jpg';

    return (
      <Protected>
        <GuestLayout>

          <div className="columns is-centered p-t-xl p-r-md p-l-md">
            <div className="column is-half">
              <h1 className="title">{readOnlyOffer.title}</h1>

              <p style={{ width: "40%" }}>{readOnlyOffer.description}</p>

              <Col sm="10">
                <img name="picture" src={pictureUrl} />
              </Col>

              <div>
                <h4>Categories: </h4>

              {readOnlyOffer.categories != undefined ? (
                readOnlyOffer.categories.map(c => {
              return (
                <Chip
                  key={c.name}
                  label={c.name}
                />
              );
            })): ''}

              </div>

              <div>
              <h4>Payment Method: </h4>
                <Chip label={readOnlyOffer.paymentMethod} />
              </div>

              {readOnlyOffer.prices ?
                (
                  readOnlyOffer.prices.map(data => {
                    return (
                      data.selected ? (
                        <div>
                          <Row>
                            <Col sm={4} style={{ textAlign: 'left' }}> <h4>{data.frequency}</h4> </Col>
                            <Col sm={4} style={{ textAlign: 'left' }}> <h4>{data.price}</h4> </Col>
                          </Row>
                        </div>
                      ) : ''
                    );
                  }))
                :
                ('')}

              <TextField
                label="Start Date"
                type="date"
                disabled
                defaultValue={moment(readOnlyOffer.startDate).format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Finish Date"
                type="date"
                disabled
                defaultValue={moment(readOnlyOffer.endDate).format('YYYY-MM-DD')}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <GeneralQuestions offerId={this.props.match.params.id}/>
            </div>
          </div>

        </GuestLayout>
      </Protected>
    );
  }
}

export { IndividualOffer }