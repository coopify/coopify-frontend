import { put } from 'redux-saga/effects';
import {
  SEND_MESSAGE_SUCCESS,
  GET_CONVERSATIONS_SUCCESS,
  GET_MESSAGES_SUCCESS,
} from '../reducers';

import {
  sendMessageAPICall,
  getConversationsAPICall,
  getMessagesAPICall,

} from '../api';

export function* sendChatMessageAsync(payload) {
  const result = yield sendMessageAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: SEND_MESSAGE_SUCCESS, message: result.message });
  }
}

export function* getConversationsAsync(payload) {
  const result = yield getConversationsAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_CONVERSATIONS_SUCCESS, conversations: result.conversations });
  }
}

export function* getMessagesAsync(payload) {
  const result = yield getMessagesAPICall(payload.payload);
  if (result.status === 200) {
    yield put({ type: GET_MESSAGES_SUCCESS, messages: result.messages });
  }
}
