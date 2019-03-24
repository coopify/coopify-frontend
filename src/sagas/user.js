import { put } from 'redux-saga/effects';
import { LOGIN_SUCCESS,
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
} from '../reducers';

import { logInAPICall, 
  signUpAPICall, 
  socialSignUpAPICall, 
  profileAPICall, 
  socialLogInAPICall,
  checkBalanceAPICall,
  checkTransactionsAPICall,
  checkOffersAPICall,
  createOfferAPICall,
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
    yield put({ type: PROFILE_FAILURE, errorMessage: result.errorMessage })
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
export function* checkOffersAsync() {
  const result = yield checkOffersAPICall();
  if (result.status == 200) {
    yield put({ type: OFFERS_SUCCESS, offers: result.offers })
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