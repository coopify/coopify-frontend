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
  SYNC_FB_SUCCESS,
  SYNC_FB_FAILURE,
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
  syncFBApiCall,
  sendRewardApiCall,
  getUserApiCall,
} from '../api';

export function* loginAsync(payload) {
  const result = yield logInAPICall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.data.user));
    localStorage.setItem('token', result.data.accessToken);

    yield put({ type: LOGIN_SUCCESS, data: result.data });
  } else {
    yield put({ type: LOGIN_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* signUpAsync(payload) {
  const result = yield signUpAPICall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.body.user));
    localStorage.setItem('token', result.body.accessToken);

    yield put({ type: SIGNUP_SUCCESS, user: result.body.user });
  } else {
    yield put({ type: SIGNUP_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* socialSignUpAsync(payload) {
  const result = yield socialSignUpAPICall(payload.payload);
  if (result.status === 200) {
    localStorage.setItem('loggedUser', JSON.stringify(result.body.user));
    localStorage.setItem('token', result.body.accessToken);
    yield put({ type: SOCIAL_SIGNUP_SUCCESS, user: result.body.user });
  } else {
    yield put({ type: SOCIAL_SIGNUP_FAILURE, errorMessage: result.errorMessage });
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
    yield put({ type: LOGIN_FAILURE, errorMessage: result.errorMessage });
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

export function* getUserAsync(payload) {
  const result = yield getUserApiCall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_USER_SUCCESS, user: result.user });
  } else {
    yield put({ type: GET_USER_FAILURE, errorMessage: result.errorMessage });
  }
}
