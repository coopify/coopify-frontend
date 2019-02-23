import { takeEvery, all } from 'redux-saga/effects';
import { loginAsync, signUpAsync, socialSignUpAsync, logoutAsync, profileAsync } from './user'

export default function* rootSaga() {
  yield all(
  [
    takeEvery('LOGIN_ATTEMPT', loginAsync),
    takeEvery('SIGNUP_ATTEMPT', signUpAsync),
    takeEvery('SOCIAL_SIGNUP_ATTEMPT', socialSignUpAsync),
    takeEvery('LOGOUT_ATTEMPT', logoutAsync),
    takeEvery('PROFILE_ATTEMPT', profileAsync),
  ]);
}