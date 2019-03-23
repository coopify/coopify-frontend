import { takeEvery, all } from 'redux-saga/effects';
import { loginAsync, signUpAsync, socialSignUpAsync, logoutAsync, profileAsync, checkBalanceAsync, loadStateFromCookies, socialLoginAsync } from './user'

export default function* rootSaga() {
  yield all(
  [
    takeEvery('LOGIN_ATTEMPT', loginAsync),
    takeEvery('SOCIAL_LOGIN_ATTEMPT', socialLoginAsync),
    takeEvery('SIGNUP_ATTEMPT', signUpAsync),
    takeEvery('SOCIAL_SIGNUP_ATTEMPT', socialSignUpAsync),
    takeEvery('LOGOUT_ATTEMPT', logoutAsync),
    takeEvery('PROFILE_ATTEMPT', profileAsync),
    takeEvery('CHECKBALANCE_ATTEMPT', checkBalanceAsync),
    takeEvery('LOAD_STATE_ATTEMPT', loadStateFromCookies)
  ]);
}