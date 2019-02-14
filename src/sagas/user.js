import { put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_FAILURE, SIGNUP_SUCCESS } from '../reducers';
import { logInAPICall, signUpAPICall, socialSignUpAPICall } from '../api';

export function* loginAsync(payload) {
    const result = yield logInAPICall(payload.payload);
    if (result.status == 200) {
      yield put({ type: LOGIN_SUCCESS, data: result.data })
    } else {
      yield put({ type: LOGIN_FAILURE, data: result.data })
    }
}

export function* signUpAsync(payload) {
  const result = yield signUpAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: SIGNUP_SUCCESS, data: result.data })
  } else {
    yield put({ type: SIGNUP_FAILURE, data: result.data })
  }
}

export function* socialSignUpAsync(payload) {
  const result = yield socialSignUpAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: SIGNUP_SUCCESS, data: result.data })
  } else {
    yield put({ type: SIGNUP_FAILURE, data: result.data })
  }
}