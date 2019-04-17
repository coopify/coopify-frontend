import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptQuestion } from '../actions/user';
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
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import { Button } from 'react-bootstrap';

export default @connect(state => ({
  error: state.error,
  questions: state.questions,
  question: state.question,
}))

class GeneralQuestions extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    questions: PropTypes.array,
    question: PropTypes.string,
  };

  static defaultProps = {
    dispatch: () => {
    },
    questions: [],
    question: '',
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      question: '',
      error: '',
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

  handleQuestionChange(e){
    const newQuestion = e.target.value;
    this.setState({
        ...this.state, question: newQuestion
    });
  }

  handleSendQuestion(e){
    const { dispatch } = this.props;

    const reqAttributes = 
    {
        question: this.state.question,
        offerId: this.props.offerId,
    };

    dispatch(attemptQuestion(reqAttributes));
}

  render() {

    return (
          <div className={styles.container}>
            <form >
            <div>
                <TextField
                    fullWidth
                    multiline
                    type="text"
                    placeholder='write your question'
                    onChange={e => this.handleQuestionChange(e)}
                    value = {this.state.question}
                />
                <Button onClick={e => this.handleSendQuestion(e)}>
                  Send question
                </Button>
            </div>
            </form>
            <ToastContainer autoClose={3000} />
          </div>
    );
  }
}

export { GeneralQuestions }