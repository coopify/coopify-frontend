import { takeEvery } from 'redux-saga/effects';
import { loginAsync } from './user'

export default function* rootSaga() {
  yield takeEvery('LOGIN_ATTEMPT', loginAsync);
}