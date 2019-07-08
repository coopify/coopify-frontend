import { put } from 'redux-saga/effects';
import {
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
  GET_USERS_OFFERS_SUCCESS,
} from '../reducers';

import {
  checkOffersPagedAPICall,
  createOfferAPICall,
  getOfferAPICall,
  getCategoriesAPICall,
  postQuestionAPICall,
  getQuestionAnswerAPICall,
  sendReplyAPICall,
  getUsersOffersAPICall,
} from '../api';

export function* checkOffersAsync(payload) {
  const result = yield checkOffersPagedAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: OFFERS_SUCCESS, responseOffers: result.responseOffers });
  } else {
    yield put({ type: OFFERS_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* createOfferAsync(payload) {
  const result = yield createOfferAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: CREATE_OFFER_SUCCESS, message: result.message });
  } else {
    yield put({ type: CREATE_OFFER_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* getOfferAsync(payload) {
  const result = yield getOfferAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: SHOW_OFFER_SUCCESS, offer: result.offer });
  } else {
    yield put({ type: SHOW_OFFER_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* getCategoriesAsync() {
  const result = yield getCategoriesAPICall();
  if (result.status === 200) {
    yield put({ type: GET_CATEGORIES_SUCCESS, categories: result.categories });
  } else {
    yield put({ type: GET_CATEGORIES_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* postQuestionAsync(payload) {
  const result = yield postQuestionAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: POST_QUESTION_SUCCESS, message: result.message });
  } else {
    yield put({ type: POST_QUESTION_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* getQuestionAnswerAsync(payload) {
  const result = yield getQuestionAnswerAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_QUESTION_ANSWER_SUCCESS, responseQuestions: result.responseQuestions });
  } else {
    yield put({ type: GET_QUESTION_ANSWER_FAILURE, errorMessage: result.errorMessage });
  }
}


export function* sendReplyAsync(payload) {
  const result = yield sendReplyAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: SEND_QUESTION_REPLY_SUCCESS, reply: result.reply });
  }
}

export function* geteUsersOffers(payload) {
  const result = yield getUsersOffersAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_USERS_OFFERS_SUCCESS, usersOffers: result.usersOffers });
  }
}