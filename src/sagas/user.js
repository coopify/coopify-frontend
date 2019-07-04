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
  GET_USERS_OFFERS_SUCCESS,
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
  GET_GOALSUSER_SUCCESS,
  GET_GOALSUSER_FAILURE,
  SYNC_FB_SUCCESS,
  SYNC_FB_FAILURE,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  SEND_REVIEW_SUCCESS,
  SEND_REVIEW_FAILURE,
  CAN_REVIEW_SUCCESS,
  CAN_REVIEW_FAILURE,
  GET_USER_REVIEWS_FAILURE,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
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
  getUsersOffersAPICall,
  getGoalsAPICall,
  getGoalsUserAPICall,
  syncFBApiCall,
  sendRewardApiCall,
  getReviewsAPICall,
  sendReviewAPICall,
  checkReviewAPICall,
  getUserReviewsApiCall,
  getUserApiCall,
} from '../api';

export function* loginAsync(payload) {
  const result = yield logInAPICall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.data.user));
    localStorage.setItem('token', result.data.accessToken);

    yield put({ type: LOGIN_SUCCESS, data: result.data });
  } else {
    yield put({ type: LOGIN_FAILURE, data: result.data });
  }
}

export function* signUpAsync(payload) {
  const result = yield signUpAPICall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.body.user));
    localStorage.setItem('token', result.body.accessToken);

    yield put({ type: SIGNUP_SUCCESS, user: result.body.user });
  } else {
    yield put({ type: SIGNUP_FAILURE, data: result.body });
  }
}

export function* socialSignUpAsync(payload) {
  const result = yield socialSignUpAPICall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.body.user));
    localStorage.setItem('token', result.body.accessToken);
    yield put({ type: SOCIAL_SIGNUP_SUCCESS, user: result.body.user });
  } else {
    yield put({ type: SOCIAL_SIGNUP_FAILURE, data: result.body });
  }
}

export function* logoutAsync() {
  resetAuthHeader();
  localStorage.removeItem('loggedUser');
  localStorage.removeItem('token');
  yield put({ type: LOGOUT_SUCCESS });
}

export function* profileAsync(payload) {
  const result = yield profileAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: PROFILE_SUCCESS, user: result });
  } else {
    yield put({ type: PROFILE_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* loadStateFromCookies() {
  const user = JSON.parse(localStorage.getItem('loggedUser'));
  const userIsLogged = 'loggedUser' in localStorage;

  const cookieData = {
    user,
    isLogged: userIsLogged,
  };
  yield put({ type: LOAD_SUCCESS, cookieData });
}

export function* socialLoginAsync(payload) {
  const result = yield socialLogInAPICall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.data.user));
    localStorage.setItem('token', result.data.accessToken);

    yield put({ type: LOGIN_SUCCESS, data: result.data });
  } else {
    yield put({ type: LOGIN_FAILURE, data: result.data });
  }
}
export function* checkBalanceAsync(payload) {
  const result = yield checkBalanceAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: CHECKBALANCE_SUCCESS, balance: result.balance });
  } else {
    yield put({ type: CHECKBALANCE_FAILURE, errorMessage: result.errorMessage });
  }
}
export function* checkTransactionsAsync(payload) {
  const result = yield checkTransactionsAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: CHECKTRANSACTIONS_SUCCESS, transactions: result.transactions });
  } else {
    yield put({ type: CHECKTRANSACTIONS_FAILURE, errorMessage: result.errorMessage });
  }
}
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

export function* getGoalsAsync() {
  const result = yield getGoalsAPICall();
  if (result.status === 200) {
    yield put({ type: GET_GOALS_SUCCESS, responseGoals: result.responseGoals });
  } else {
    yield put({ type: GET_GOALS_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* getGoalsUserAsync(payload) {
  const result = yield getGoalsUserAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_GOALSUSER_SUCCESS, responseGoals: result.responseGoals });
  } else {
    yield put({ type: GET_GOALSUSER_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* syncFacebookAsync(payload) {
  const result = yield syncFBApiCall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.user));

    yield put({ type: SYNC_FB_SUCCESS, user: result.user });
  } else {
    yield put({ type: SYNC_FB_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* sendRewardAsync(payload) {
  yield sendRewardApiCall(payload.payload);
}

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

export function* getUserAsync(payload) {
  const result = yield getUserApiCall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_USER_SUCCESS, user: result.user });
  } else {
    yield put({ type: GET_USER_FAILURE, errorMessage: result.errorMessage });
  }
}
