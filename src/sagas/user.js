import { put } from 'redux-saga/effects';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../reducers';
import { logInAPICall } from '../api';

export function* loginAsync(payload) {
    const result = yield logInAPICall(payload.payload);
    if (result.status == 200) {
      yield put({ type: LOGIN_SUCCESS, data: result.data })
    } else {
      yield put({ type: LOGIN_FAILURE, data: result.data })
    }
}