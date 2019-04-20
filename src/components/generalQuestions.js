import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptQuestion, attemptGetQuestionsAndAnswer } from '../actions/user';
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
  countQuestions: state.countQuestions,
  question: state.question,
}))

class GeneralQuestions extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    questions: PropTypes.array,
    countQuestions: PropTypes.number,
    question: PropTypes.string,
  };

  static defaultProps = {
    dispatch: () => {
    },
    questions: [],
    countCuestions: 0,
    question: '',
    error: ''
  };

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      countCuestions: 0,
      question: '',
      error: '',
      limit: 10,
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
    const offerId = this.props.offerId;
    const userToken = localStorage.getItem("token");

    const reqAttributes = {
      token: userToken,
      offerId: offerId,
      limit: this.state.limit,
      page: 0,
    }

    dispatch(attemptGetQuestionsAndAnswer(reqAttributes));
  }

  handleQuestionChange(e){
    const newQuestion = e.target.value;
    this.setState({
        ...this.state, question: newQuestion
    });
  }

  handleSendQuestion(e){
    const { dispatch } = this.props;
    const userToken = localStorage.getItem("token");

    const reqAttributes = 
    {
        question: this.state.question,
        offerId: this.props.offerId,
        token: userToken
    };

    dispatch(attemptQuestion(reqAttributes));
}

  render() {

    const TheadComponent = props => null; // a component returning null (to hide) or you could write as per your requirement
    const { error, questions}  = this.props
    const data = questions
    const columns = [{
      accessor: 'question',
      Cell: props => (
        <div>
            <TextField
            disabled
            fullWidth
            multiline
            type="text"
            value = {props.original.question}
            />
        </div>
      ),
      //maxWidth: 200
    }, {
      accessor: 'answer',
      Cell: props => (
        <div>
            <TextField
            disabled
            fullWidth
            multiline
            type="text"
            value = {props.original.answer}
            />
        </div>
      )
    }]

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
            <div>
            <h4 style={{ textAlign: 'center' }}> Questions </h4>

              <ReactTable
                defaultPageSize={this.state.limit}
                data={data}
                columns={columns}
                TheadComponent={TheadComponent}
                pages = {1}
                //pages={ this.state.limit != 0 ? Math.ceil(countQuestions / this.state.limit) : countQuestions }
                noDataText = 'No questions'
                manual
              />
            </div>
            </form>
            <ToastContainer autoClose={3000} />
          </div>
    );
  }
}

export { GeneralQuestions }