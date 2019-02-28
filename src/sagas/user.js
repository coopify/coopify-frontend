import { put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_FAILURE, SIGNUP_SUCCESS, SOCIAL_SIGNUP_FAILURE, LOGOUT_SUCCESS, PROFILE_SUCCESS, PROFILE_FAILURE, LOAD_SUCCESS } from '../reducers';
import { logInAPICall, signUpAPICall, socialSignUpAPICall, profileAPICall, socialLogInAPICall } from '../api';

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

  localStorage.removeItem("loggedUser");
  localStorage.removeItem("token")
  yield put({ type: LOGOUT_SUCCESS })
}

export function* profileAsync(payload) {
  const result = yield profileAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: PROFILE_SUCCESS, user: result })
  } else {
    yield put({ type: PROFILE_FAILURE, data: result.data })
  }
}

export function* loadStateFromCookies(){
  
  var user = JSON.parse(localStorage.getItem("loggedUser"));
  var userIsLogged = "loggedUser" in localStorage;

  var cookieData = 
  {
    user: user,
    isLogged: userIsLogged
  }
  yield put({type: LOAD_SUCCESS, cookieData});
}

export function* socialLoginAsync(payload) {
  const result = yield socialLogInAPICall(payload.payload);
  if (result.status == 200) {
    yield put({ type: LOGIN_SUCCESS, data: result.data })
  } else {
    yield put({ type: LOGIN_FAILURE, data: result.data })
  }
}
