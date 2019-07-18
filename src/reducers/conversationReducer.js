import _ from 'lodash';

export const SEND_MESSAGE_ATTEMPT = 'SEND_MESSAGE_ATTEMPT';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';
export const UPDATE_MESSAGE_ATTEMPT = 'UPDATE_MESSAGE_ATTEMPT';
export const GET_CONVERSATIONS_ATTEMPT = 'GET_CONVERSATIONS_ATTEMPT';
export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS';
export const GET_CONVERSATIONS_FAILURE = 'GET_CONVERSATIONS_FAILURE';
export const GET_MESSAGES_ATTEMPT = 'GET_MESSAGES_ATTEMPT';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';

export const conversation = (state = initialConversationState, action) => {
  switch (action.type) {
   
    case SEND_MESSAGE_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case SEND_MESSAGE_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        messages: state.messages.concat([action.message]),
      });

    case SEND_MESSAGE_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case UPDATE_MESSAGE_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        messages: state.messages.concat([action.payload]),
      });

    case GET_CONVERSATIONS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case GET_CONVERSATIONS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        conversations: action.conversations,
        loading: false,
      });

    case GET_CONVERSATIONS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_MESSAGES_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });

    case GET_MESSAGES_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        messages: action.messages,
        newMessages: [],
        loading: false,
      });

    case GET_MESSAGES_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    default:
      return state;
  }
};

export const initialConversationState = {
  conversation: {},
};