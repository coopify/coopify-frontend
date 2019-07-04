import { put } from 'redux-saga/effects';
import {
  GET_GOALS_SUCCESS,
  GET_GOALS_FAILURE,
  GET_GOALSUSER_SUCCESS,
  GET_GOALSUSER_FAILURE,
} from '../reducers';

import {
  getGoalsAPICall,
  getGoalsUserAPICall,
} from '../api';


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
