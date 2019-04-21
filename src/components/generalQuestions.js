import React from 'react';
import GuestLayout from './guest-layout';
import { resetError, attemptQuestion, attemptGetQuestionsAndAnswer, attemptSendReply } from '../actions/user';
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
      limit: 5,
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

changeSize(pageSize) {
  this.setState((state) => {
    return { ...state, limit: pageSize }
  })
}


changePage(pageIndex) {
  const { dispatch, offerId } = this.props;
  const userToken = localStorage.getItem("token");

  const reqAttributes = {
    token: userToken,
    offerId: offerId,
    limit: this.state.limit,
    page: pageIndex,
  }

  dispatch(attemptGetQuestionsAndAnswer(reqAttributes));
}

handleReplyClick(e){
  const { dispatch } = this.props;

  const formData = e.target.form.elements;
  const replyComment = formData.replyComment.value;
  const questionId = formData.conversation.value;
  const token = localStorage.getItem("token");

  const payload = 
  {
    token: token,
    reply: replyComment,
    questionId: questionId
  };

  dispatch(attemptSendReply(payload));
}

  render() {

    const TheadComponent = props => null;
    const { error, questions}  = this.props
    const data = questions
    const columns = [{
      accessor: 'question',
      Cell: props => (
        <div>
          <form>
        <div style={{color: "black", textAlign: "left"}}>
          <i class="fa fa-comments-o"></i> {props.original.text}
        </div>
          <br/>

          <input type="text" style={{display: "none"}} name="conversation" value={props.original.id}/>
        <Button onClick={e => this.handleReplyClick(e)} style={{backgroundColor: "transparent", color: "black", borderColor: "transparent", float: "right"}}>Reply <i class="fa fa-reply"></i></Button>
      <br/>
      <i class="fa fa-comments"></i>&nbsp;
        <TextField
        disabled={props.original.response != undefined && props.original.response != ""}
        fullWidth
        multiline
        type="text"
        name="replyComment"
        tag = {props.original.id}
        value = {props.original.response}
        />
        </form>
        </div>
      ),
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
                <Button onClick={e => this.handleSendQuestion(e)} style={{marginTop: "2%"}}>
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
                pages={ this.state.limit != 0 ? Math.ceil(this.props.countQuestions / this.state.limit) : this.props.countQuestions }
                noDataText = 'No questions'
                onPageChange={e => this.changePage(e)}
                onPageSizeChange={e => this.changeSize(e)}
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