import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import * as reactBootstrap from 'react-bootstrap';
import {
  Button, Row, Col,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import '../css/form-elements.css';
import 'font-awesome/css/font-awesome.min.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import styles from '../css/profile.scss';
import {
  attemptGetQuestionsAndAnswer, attemptSendReply, attemptQuestion, resetError,
} from '../actions/user';

export default @connect(state => ({
  error: state.error,
  questions: state.questions,
  countQuestions: state.countQuestions,
  question: state.question,
  readOnlyOffer: state.offer,
  loggedUser: state.user,
}))

class GeneralQuestions extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    error: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.object),
    countQuestions: PropTypes.number,
    question: PropTypes.string,
    loggedUser: PropTypes.objectOf(PropTypes.object),
    readOnlyOffer: PropTypes.objectOf(PropTypes.object),
    offerId: PropTypes.string,
  };

  static defaultProps = {
    dispatch: () => {
    },
    questions: [],
    countQuestions: 0,
    question: '',
    error: '',
    loggedUser: {},
    readOnlyOffer: {},
    offerId: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      countQuestions: 0,
      question: '',
      error: '',
      limit: 5,
    };
  }

  componentDidMount() {
    const { dispatch, offerId } = this.props;
    const { limit } = this.state;
    const userToken = localStorage.getItem('token');

    const reqAttributes = {
      token: userToken,
      offerId,
      limit,
      page: 0,
    };

    dispatch(attemptGetQuestionsAndAnswer(reqAttributes));
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

  handleQuestionChange(e) {
    const newQuestion = e.target.value;
    this.setState({
      ...this.state, question: newQuestion,
    });
  }

  handleSendQuestion() {
    const { dispatch, offerId } = this.props;
    const { question } = this.state;
    const userToken = localStorage.getItem('token');

    const reqAttributes = {
      question,
      offerId,
      token: userToken,
    };

    dispatch(attemptQuestion(reqAttributes));
  }

  changeSize(pageSize) {
    this.setState(state => ({ ...state, limit: pageSize }));
  }


  changePage(pageIndex) {
    const { dispatch, offerId } = this.props;
    const { limit } = this.state;
    const userToken = localStorage.getItem('token');

    const reqAttributes = {
      token: userToken,
      offerId,
      limit,
      page: pageIndex,
    };

    dispatch(attemptGetQuestionsAndAnswer(reqAttributes));
  }

  handleReplyClick(e) {
    const { dispatch } = this.props;

    const formData = e.target.form.elements;
    const replyComment = formData.replyComment.value;
    const questionId = formData.conversation.value;
    const token = localStorage.getItem('token');

    const payload = {
      token,
      reply: replyComment,
      questionId,
    };

    dispatch(attemptSendReply(payload));
  }

  render() {
    const TheadComponent = props => null;
    const { questions, loggedUser, readOnlyOffer, countQuestions } = this.props;
    const { question, limit } = this.state;
    const displayReplyButton = loggedUser.id === readOnlyOffer.userId ? 'block' : 'none';
    const data = questions;
    const columns = [{
      accessor: 'question',
      Cell: props => (
        <div>
          <form>
            <i className="fa fa-comments-o" />
            <TextField
              disabled={(props.original.response !== undefined && props.original.response !== '') || (loggedUser.id !== readOnlyOffer.userId)}
              fullWidth
              multiline
              type="text"
              name="replyComment"
              tag={props.original.id}
              value={props.original.text}
              style={{ color: 'black', textAlign: 'left' }}
            />
            <br />

            <Input type="text" style={{ display: 'none' }} name="conversation" value={props.original.id} />
            <Button
              onClick={e => this.handleReplyClick(e)}
              style={{
                backgroundColor: 'transparent', color: 'black', borderColor: 'transparent', float: 'right', display: displayReplyButton,
              }}
            >
              { 'Reply' }
              <i className="fa fa-reply" />
            </Button>
            <br />
            <i className="fa fa-comments" />
            <TextField
              disabled={(props.original.response !== undefined && props.original.response !== '') || (loggedUser.id !== readOnlyOffer.userId)}
              fullWidth
              multiline
              type="text"
              name="replyComment"
              tag={props.original.id}
              value={props.original.response}
            />
          </form>
        </div>
      ),
    }];

    return (
      <div className={styles.container}>
        <form>
          <div className="container">
            <div className="row justify-content-md-center">
              <Row>
                <Col sm="8">
                  <TextField
                    id="outlined-multiline-flexible"
                    fullWidth
                    placeholder="Write your question"
                    multiline
                    rowsMax="4"
                    value={question}
                    onChange={e => this.handleQuestionChange(e)}
                    // className={classes.textField}
                    margin="normal"
                    helperText="Any user registered or unable to formulate general questions"
                    variant="outlined"
                  />
                </Col>
                <Col sm="4">
                  <Button
                    onClick={e => this.handleSendQuestion(e)}
                    style={{ marginTop: '12%' }}
                  >
                    { 'Send question' }
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div>
            <h4 style={{ textAlign: 'center' }}>
              { 'Questions and answers for this service' }
              {' '}
            </h4>

            <ReactTable
              defaultPageSize={limit}
              data={data}
              columns={columns}
              TheadComponent={TheadComponent}
              pages={limit !== 0 ? Math.ceil(countQuestions / limit) : countQuestions}
              noDataText="There are no questions for this service. "
              onPageChange={e => this.changePage(e)}
              onPageSizeChange={e => this.changeSize(e)}
              manual
              minRows={0}
              showPagination={false}
            />
          </div>
        </form>
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export { GeneralQuestions };
