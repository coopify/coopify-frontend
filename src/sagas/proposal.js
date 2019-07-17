import { put } from 'redux-saga/effects';
import {
  MAKE_PROPOSAL_SUCCESS,
  MAKE_PROPOSAL_FAILURE,
  GET_PROPOSALS_SUCCESS,
  GET_PROPOSALS_FAILURE,
  ACCEPT_PROPOSAL_SUCCESS,
  REJECT_PROPOSAL_SUCCESS,
  CANCEL_PROPOSAL_SUCCESS,
  STATUS_PROPOSAL_FAILURE,
  GET_CONVERSATION_PROPOSAL_SUCCESS,
} from '../reducers';

import {
  makeProposalAPICall,
  getProposalsAPICall,
  rejectProposalAPICall,
  acceptProposalAPICall,
  cancelProposalAPICall,
  getConversationProposalAPICall,
} from '../api';

export function* makeProposalAsync(payload) {
  const result = yield makeProposalAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: MAKE_PROPOSAL_SUCCESS, proposal: result.proposal });
  } else {
    yield put({ type: MAKE_PROPOSAL_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* getProposalsAsync(payload) {
  const result = yield getProposalsAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_PROPOSALS_SUCCESS, proposals: result.responseProposals.proposals });
  } else {
    yield put({ type: GET_PROPOSALS_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* acceptProposalAsync(payload) {
  const result = yield acceptProposalAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: ACCEPT_PROPOSAL_SUCCESS, proposal: result.proposal });
  }  else {
    yield put({ type: STATUS_PROPOSAL_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* rejectProposalAsync(payload) {
  const result = yield rejectProposalAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: REJECT_PROPOSAL_SUCCESS, proposal: result.proposal });
  } else {
    yield put({ type: STATUS_PROPOSAL_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* cancelProposalAsync(payload) {
  const result = yield cancelProposalAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: CANCEL_PROPOSAL_SUCCESS, proposal: result.proposal });
  } else {
    yield put({ type: STATUS_PROPOSAL_FAILURE, errorMessage: result.errorMessage });
  }
}

export function* getConversationProposalAsync(payload) {
  const result = yield getConversationProposalAPICall(payload.payload);
  yield put({ type: GET_CONVERSATION_PROPOSAL_SUCCESS, proposal: result.proposal });
}
