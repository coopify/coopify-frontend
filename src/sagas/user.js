import { put } from 'redux-saga/effects';
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SOCIAL_SIGNUP_FAILURE,
  LOGOUT_SUCCESS,
  PROFILE_SUCCESS,
  PROFILE_FAILURE,
  LOAD_SUCCESS,
  SOCIAL_SIGNUP_SUCCESS,
  CHECKBALANCE_SUCCESS,
  CHECKBALANCE_FAILURE,
  CHECKTRANSACTIONS_SUCCESS,
  CHECKTRANSACTIONS_FAILURE,
  OFFERS_SUCCESS,
  OFFERS_FAILURE,
  CREATE_OFFER_FAILURE,
  CREATE_OFFER_SUCCESS,
  SHOW_OFFER_FAILURE,
  SHOW_OFFER_SUCCESS,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  POST_QUESTION_SUCCESS,
  POST_QUESTION_FAILURE,
  GET_QUESTION_ANSWER_SUCCESS,
  GET_QUESTION_ANSWER_FAILURE,
  SEND_QUESTION_REPLY_SUCCESS,
  SEND_MESSAGE_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_MESSAGES_SUCCESS,
  MAKE_PROPOSAL_SUCCESS,
  MAKE_PROPOSAL_FAILURE,
  GET_USERS_OFFERS_SUCCESS,
  GET_PROPOSALS_SUCCESS,
  GET_PROPOSALS_FAILURE,
  ACCEPT_PROPOSAL_SUCCESS,
  REJECT_PROPOSAL_SUCCESS,
  CANCEL_PROPOSAL_SUCCESS,
  GET_CONVERSATION_PROPOSAL_SUCCESS,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
} from '../reducers';

import {
  resetAuthHeader,
  logInAPICall,
  signUpAPICall,
  socialSignUpAPICall,
  profileAPICall,
  socialLogInAPICall,
  checkBalanceAPICall,
  checkTransactionsAPICall,
  checkOffersPagedAPICall,
  createOfferAPICall,
  getOfferAPICall,
  getCategoriesAPICall,
  postQuestionAPICall,
  getQuestionAnswerAPICall,
  sendReplyAPICall,
  sendMessageAPICall,
  getConversationsAPICall,
  getMessagesAPICall,
  makeProposalAPICall,
  getUsersOffersAPICall,
  getProposalsAPICall,
  rejectProposalAPICall,
  acceptProposalAPICall,
  cancelProposalAPICall,
  getConversationProposalAPICall,
  getGoalsAPICall,
} from '../api';

export function* loginAsync(payload) {
  const result = yield logInAPICall(payload.payload);
  if (result.status == 200) {

    localStorage.setItem("loggedUser", JSON.stringify(result.data.user));
    localStorage.setItem("token", result.data.accessToken);

    yield put({ type: LOGIN_SUCCESS, data: result.data })
  } else {
    yield put({ type: LOGIN_FAILURE, data: result.data })
  }
}

export function* signUpAsync(payload) {
  const result = yield signUpAPICall(payload.payload);
  if (result.status == 200) {

    localStorage.setItem("loggedUser", JSON.stringify(result.body.user));
    localStorage.setItem("token", result.body.accessToken);

    yield put({ type: SIGNUP_SUCCESS, user: result.body.user })//estaba .user
  } else {
    yield put({ type: SIGNUP_FAILURE, data: result.body })
  }
}

export function* socialSignUpAsync(payload) {
  const result = yield socialSignUpAPICall(payload.payload);
  if (result.status == 200) {
    localStorage.setItem("loggedUser", JSON.stringify(result.body.user));
    localStorage.setItem("token", result.body.accessToken);
    yield put({ type: SOCIAL_SIGNUP_SUCCESS, user: result.body.user })
  } else {
    yield put({ type: SOCIAL_SIGNUP_FAILURE, data: result.body })
  }
}

export function* logoutAsync() {
  resetAuthHeader();
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("token");
  yield put({ type: LOGOUT_SUCCESS })
}

export function* profileAsync(payload) {
  const result = yield profileAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: PROFILE_SUCCESS, user: result })
  } else {
    yield put({ type: PROFILE_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* loadStateFromCookies() {

  var user = JSON.parse(localStorage.getItem("loggedUser"));
  var userIsLogged = "loggedUser" in localStorage;

  var cookieData =
  {
    user: user,
    isLogged: userIsLogged
  }
  yield put({ type: LOAD_SUCCESS, cookieData });
}

export function* socialLoginAsync(payload) {
  const result = yield socialLogInAPICall(payload.payload);
  if (result.status == 200) {

    localStorage.setItem("loggedUser", JSON.stringify(result.data.user));
    localStorage.setItem("token", result.data.accessToken);

    yield put({ type: LOGIN_SUCCESS, data: result.data })
  } else {
    yield put({ type: LOGIN_FAILURE, data: result.data })
  }
}
export function* checkBalanceAsync(payload) {
  const result = yield checkBalanceAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: CHECKBALANCE_SUCCESS, balance: result.balance })
  } else {
    yield put({ type: CHECKBALANCE_FAILURE, errorMessage: result.errorMessage })
  }
}
export function* checkTransactionsAsync(payload) {
  const result = yield checkTransactionsAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: CHECKTRANSACTIONS_SUCCESS, transactions: result.transactions })
  } else {
    yield put({ type: CHECKTRANSACTIONS_FAILURE, errorMessage: result.errorMessage })
  }
}
export function* checkOffersAsync(payload) {
  const result = yield checkOffersPagedAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: OFFERS_SUCCESS, responseOffers: result.responseOffers })
  } else {
    yield put({ type: OFFERS_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* createOfferAsync(payload) {
  const result = yield createOfferAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: CREATE_OFFER_SUCCESS, message: result.message })
  } else {
    yield put({ type: CREATE_OFFER_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* getOfferAsync(payload) {
  const result = yield getOfferAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: SHOW_OFFER_SUCCESS, offer: result.offer })
  } else {
    yield put({ type: SHOW_OFFER_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* getCategoriesAsync() {
  const result = yield getCategoriesAPICall();
  if (result.status == 200) {
    yield put({ type: GET_CATEGORIES_SUCCESS, categories: result.categories })
  } else {
    yield put({ type: GET_CATEGORIES_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* postQuestionAsync(payload) {
  const result = yield postQuestionAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: POST_QUESTION_SUCCESS, message: result.message })
  } else {
    yield put({ type: POST_QUESTION_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* getQuestionAnswerAsync(payload) {
  const result = yield getQuestionAnswerAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: GET_QUESTION_ANSWER_SUCCESS, responseQuestions: result.responseQuestions })
  } else {
    yield put({ type: GET_QUESTION_ANSWER_FAILURE, errorMessage: result.errorMessage })
  }
}


export function* sendReplyAsync(payload) {
  const result = yield sendReplyAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: SEND_QUESTION_REPLY_SUCCESS, reply: result.reply })
  }
}

export function* sendChatMessageAsync(payload) {
  const result = yield sendMessageAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: SEND_MESSAGE_SUCCESS, message: result.message })
  }
}

export function* getConversationsAsync(payload) {
  const result = yield getConversationsAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: GET_CONVERSATIONS_SUCCESS, conversations: result.conversations })
  }
}

export function* getMessagesAsync(payload) {
  const result = yield getMessagesAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: GET_MESSAGES_SUCCESS, messages: result.messages })
  }
}

export function* makeProposalAsync(payload) {
  const result = yield makeProposalAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: MAKE_PROPOSAL_SUCCESS, proposal: result.proposal })
  }
  else {
    yield put({ type: MAKE_PROPOSAL_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* geteUsersOffers(payload) {
  const result = yield getUsersOffersAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: GET_USERS_OFFERS_SUCCESS, usersOffers: result.usersOffers })
  }
}

export function* getProposalsAsync(payload) {
  const result = yield getProposalsAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: GET_PROPOSALS_SUCCESS, proposals: result.responseProposals.proposals })//Pedir que BE devuelva count
  }
  else {
    yield put({ type: GET_PROPOSALS_FAILURE, errorMessage: result.errorMessage })
  }
}

export function* acceptProposalAsync(payload) {
  const result = yield acceptProposalAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: ACCEPT_PROPOSAL_SUCCESS, proposal: result.proposal })
  }
}

export function* rejectProposalAsync(payload) {
  const result = yield rejectProposalAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: REJECT_PROPOSAL_SUCCESS, proposal: result.proposal })
  }
}

export function* cancelProposalAsync(payload) {
  const result = yield cancelProposalAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: CANCEL_PROPOSAL_SUCCESS, proposal: result.proposal })
  }
}

export function* getConversationProposalAsync(payload) {
  const result = yield getConversationProposalAPICall(payload.payload);
  yield put({ type: GET_CONVERSATION_PROPOSAL_SUCCESS, proposal: result.proposal })
}

export function* getGoalsAsync(payload) {
  const result = yield getGoalsAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: GET_GOALS_SUCCESS, responseGoals: result.responseGoals })
  }
  else {
    yield put({ type: GET_GOALS_FAILURE, errorMessage: result.errorMessage })
  }
}