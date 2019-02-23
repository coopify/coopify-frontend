import { put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_FAILURE, SIGNUP_SUCCESS, SOCIAL_SIGNUP_FAILURE, LOGOUT_SUCCESS } from '../reducers';
import { logInAPICall, signUpAPICall, socialSignUpAPICall } from '../api';
import { json } from 'body-parser';

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
  console.log("result" + JSON.stringify(result));
  if (result.status == 200) {
    yield put({ type: SIGNUP_SUCCESS, user: result.user })
  } else {
    yield put({ type: SIGNUP_FAILURE, data: result.data })
  }
}

export function* socialSignUpAsync(payload) {
  const result = yield socialSignUpAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: SIGNUP_SUCCESS, user: result })
  } else {
    yield put({ type: SOCIAL_SIGNUP_FAILURE, data: result.data })
  }
}

export function* logoutAsync(){
  yield put({ type: LOGOUT_SUCCESS })
}