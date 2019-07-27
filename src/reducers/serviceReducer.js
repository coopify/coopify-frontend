import _ from 'lodash';

export const OFFERS_ATTEMPT = 'OFFERS_ATTEMPT';
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS';
export const OFFERS_FAILURE = 'OFFERS_FAILURE';
export const CREATE_OFFER_ATTEMPT = 'CREATE_OFFER_ATTEMPT';
export const CREATE_OFFER_FAILURE = 'CREATE_OFFER_FAILURE';
export const CREATE_OFFER_SUCCESS = 'CREATE_OFFER_SUCCESS';
export const SHOW_OFFER_ATTEMPT = 'SHOW_OFFER_ATTEMPT';
export const SHOW_OFFER_FAILURE = 'SHOW_OFFER_FAILURE';
export const SHOW_OFFER_SUCCESS = 'SHOW_OFFER_SUCCESS';
export const CHANGE_FILTERS_ATTEMPT = 'CHANGE_FILTERS_ATTEMPT';
export const GET_CATEGORIES_ATTEMPT = 'GET_CATEGORIES_ATTEMPT';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export const POST_QUESTION_ATTEMPT = 'POST_QUESTION_ATTEMPT';
export const POST_QUESTION_SUCCESS = 'POST_QUESTION_SUCCESS';
export const POST_QUESTION_FAILURE = 'POST_QUESTION_FAILURE';
export const GET_QUESTION_ANSWER_ATTEMPT = 'GET_QUESTION_ANSWER_ATTEMPT';
export const GET_QUESTION_ANSWER_SUCCESS = 'GET_QUESTION_ANSWER_SUCCESS';
export const GET_QUESTION_ANSWER_FAILURE = 'GET_QUESTION_ANSWER_FAILURE';
export const SEND_QUESTION_REPLY_ATTEMPT = 'SEND_QUESTION_REPLY_ATTEMPT';
export const SEND_QUESTION_REPLY_SUCCESS = 'SEND_QUESTION_REPLY_SUCCESS';
export const SEND_QUESTION_REPLY_FAILURE = 'SEND_QUESTION_REPLY_FAILURE';
export const GET_USERS_OFFERS_ATTEMPT = 'GET_USERS_OFFERS_ATTEMPT';
export const GET_USERS_OFFERS_SUCCESS = 'GET_USERS_OFFERS_SUCCESS';
export const RESET_ERROR_SERVICES = 'RESET_ERROR_SERVICES';

export const service = (state = initialServiceState, action) => {
  switch (action.type) {

    case OFFERS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case OFFERS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        offers: action.responseOffers.offers,
        countOffers: action.responseOffers.countOffers,
        loading: false,
      });

    case OFFERS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        offers: [],
        countOffers: 0,
        filters: {},
        loading: false,
      });

    case CREATE_OFFER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case CREATE_OFFER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case CREATE_OFFER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        message: action.message,
        offerCreated: true,
        loading: false,
      });

    case SHOW_OFFER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case SHOW_OFFER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case SHOW_OFFER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        offer: action.offer,
        loading: false,
      });

    case CHANGE_FILTERS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        filters: action.payload,
      });

    case GET_CATEGORIES_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case GET_CATEGORIES_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        categories: action.categories.map(c => (c.name)),
      });

    case GET_CATEGORIES_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
      });

    case POST_QUESTION_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case POST_QUESTION_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        questionCreated: true,
        questions: [action.responseQuestion].concat(state.questions),
        countQuestions: state.countQuestions + 1,
      });

    case POST_QUESTION_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
      });

    case GET_QUESTION_ANSWER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case GET_QUESTION_ANSWER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        questions: action.responseQuestions.questions,
        countQuestions: action.responseQuestions.count,
      });

    case GET_QUESTION_ANSWER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
      });

    case SEND_QUESTION_REPLY_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        reply: action.reply,
        replyMade: true,
        questions: [action.responseQuestion].concat(state.questions.slice(1)),
      });

    case SEND_QUESTION_REPLY_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });

    case GET_USERS_OFFERS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        myOffers: action.usersOffers.myOffers,
        userOffers: action.usersOffers.userOffers,
      });

    case RESET_ERROR_SERVICES:
      return _.assignIn({}, state, {
        error: '',
        status: '',
        offerCreated: false,
        questionCreated: false,
        replyMade: false,
      });

    default:
      return state;
  }
};

export const initialServiceState = {
  service: {},
};