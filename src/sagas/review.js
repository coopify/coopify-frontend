import { put } from 'redux-saga/effects';
import {
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAILURE,
  CAN_REVIEW_SUCCESS,
  CAN_REVIEW_FAILURE,
  GET_USER_REVIEWS_FAILURE,
  GET_USER_REVIEWS_SUCCESS,
} from '../reducers';

import {
  getReviewsAPICall,
  sendReviewAPICall,
  checkReviewAPICall,
  getUserReviewsApiCall,
} from '../api';

export function* getReviewsAsync(payload) {
  const result = yield getReviewsAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_REVIEWS_SUCCESS, reviews: result.reviews });
  } else {
    yield put({ type: GET_REVIEWS_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* sendReviewAsync(payload) {
  const result = yield sendReviewAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: SEND_REVIEW_SUCCESS, review: result.review });
  } else {
    yield put({ type: SEND_REVIEW_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* canReviewAsync(payload) {
  const result = yield checkReviewAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: CAN_REVIEW_SUCCESS, canRate: result.canRate });
  } else {
    yield put({ type: CAN_REVIEW_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* getUserReviewsAsync(payload) {
  const result = yield getUserReviewsApiCall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_USER_REVIEWS_SUCCESS, reviews: result.reviews });
  } else {
    yield put({ type: GET_USER_REVIEWS_FAILURE, errorMessage: result.errorMessage });
  }
}
