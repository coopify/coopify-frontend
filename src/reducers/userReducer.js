import _ from 'lodash';

export const SOCIAL_LOGIN_ATTEMPT = 'SOCIAL_LOGIN_ATTEMPT'
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const SOCIAL_SIGNUP_ATTEMPT = 'SOCIAL_SIGNUP_ATTEMPT'
export const SOCIAL_SIGNUP_SUCCESS = 'SOCIAL_SIGNUP_SUCCESS'
export const SOCIAL_SIGNUP_FAILURE = 'SOCIAL_SIGNUP_FAILURE'
export const LOGOUT_ATTEMPT = 'LOGOUT_ATTEMPT'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const PROFILE_ATTEMPT = 'PROFILE_ATTEMPT'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
export const PROFILE_FAILURE = 'PROFILE_FAILURE'
export const LOAD_STATE_ATTEMPT = 'LOAD_STATE_ATTEMPT'
export const LOAD_SUCCESS = 'LOAD_SUCCESS'
export const CHANGE_ATTEMPT = "CHANGE_ATTEMPT"
export const CHANGE_IMAGE_ATTEMPT = "CHANGE_IMAGE_ATTEMPT"
export const RESET_ERROR = 'RESET_ERROR'
export const CHECKBALANCE_ATTEMPT = 'CHECKBALANCE_ATTEMPT'
export const CHECKBALANCE_SUCCESS = 'CHECKBALANCE_SUCCESS'
export const CHECKBALANCE_FAILURE = 'CHECKBALANCE_FAILURE'
export const CHECKTRANSACTIONS_ATTEMPT = 'CHECKTRANSACTIONS_ATTEMPT'
export const CHECKTRANSACTIONS_SUCCESS = 'CHECKTRANSACTIONS_SUCCESS'
export const CHECKTRANSACTIONS_FAILURE = 'CHECKTRANSACTIONS_FAILURE'
export const OFFERS_ATTEMPT = 'OFFERS_ATTEMPT'
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS'
export const OFFERS_FAILURE = 'OFFERS_FAILURE'
export const CREATE_OFFER_ATTEMPT = 'CREATE_OFFER_ATTEMPT'
export const CREATE_OFFER_FAILURE = 'CREATE_OFFER_FAILURE'
export const CREATE_OFFER_SUCCESS = 'CREATE_OFFER_SUCCESS'
export const SHOW_OFFER_ATTEMPT = 'SHOW_OFFER_ATTEMPT'
export const SHOW_OFFER_FAILURE = 'SHOW_OFFER_FAILURE'
export const SHOW_OFFER_SUCCESS = 'SHOW_OFFER_SUCCESS'
export const CHANGE_FILTERS_ATTEMPT = 'CHANGE_FILTERS_ATTEMPT'
export const GET_CATEGORIES_ATTEMPT = 'GET_CATEGORIES_ATTEMPT'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE'
export const SEND_MESSAGE_ATTEMPT = 'SEND_MESSAGE_ATTEMPT'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const UPDATE_MESSAGE_ATTEMPT = 'UPDATE_MESSAGE_ATTEMPT'
export const GET_CONVERSATIONS_ATTEMPT = 'GET_CONVERSATIONS_ATTEMPT'
export const GET_CONVERSATIONS_SUCCESS = 'GET_CONVERSATIONS_SUCCESS'
export const GET_MESSAGES_ATTEMPT = 'GET_MESSAGES_ATTEMPT'
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS'
export const MAKE_PROPOSAL_ATTEMPT = 'MAKE_PROPOSAL_ATTEMPT'
export const MAKE_PROPOSAL_SUCCESS = 'MAKE_PROPOSAL_SUCCESS'
export const MAKE_PROPOSAL_FAILURE = 'MAKE_PROPOSAL_FAILURE'
export const GET_USERS_OFFERS_ATTEMPT = 'GET_USERS_OFFERS_ATTEMPT'
export const GET_USERS_OFFERS_SUCCESS = 'GET_USERS_OFFERS_SUCCESS'

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    
    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.data.user,
        error: '',
        userDidLog: true
    });
    case LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false
    });
    case SOCIAL_LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false
    });
    case LOGIN_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.data.message,
        userDidLog: false
      });

      case SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.user,
        error: '',
        userDidSignUp: true
      });
    case SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidSignUp: false
    });
    case SOCIAL_SIGNUP_ATTEMPT:
    return _.assignIn({}, state, {
      loading: true,
      error: '',
      userDidSignUp: false
  });
    case SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.data.message,
        userDidSignUp: false
      });
      case SOCIAL_SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.message,
        userDidSignUp: false
      });
      case SOCIAL_SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.user,
        error: '',
        socialUserDidSignUp: true,
        userDidLog: true
      });

      case LOGOUT_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: true
      });

      case LOGOUT_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        userDidLog: false
      });
      case PROFILE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
      case PROFILE_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        user: action.user.user
      });
      case PROFILE_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });
      case CHECKBALANCE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
      case CHECKBALANCE_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        balance: action.balance
      });
      case CHECKBALANCE_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });
      case CHECKTRANSACTIONS_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
      case CHECKTRANSACTIONS_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        transactions: action.transactions
      });
      case CHECKTRANSACTIONS_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });
      case OFFERS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });
      case OFFERS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        offers: action.responseOffers.offers,
        countOffers: action.responseOffers.countOffers 
      });
      case OFFERS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        offers: [],
        countOffers: 0,
        filters: {}
      });
      case LOAD_STATE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: false
      });

      case LOAD_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: action.cookieData.user,
        userDidLog: action.cookieData.isLogged
      });

      case CHANGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: {...state.user, 
          name: action.payload.name,
          lastName: action.payload.lastName,
          address : action.payload.address,
          phone : action.payload.phone,
          birthdate : action.payload.birthdate,
          bio : action.payload.bio,
          interests : action.payload.interests
        },

        userDidLog: true
      });

      case CHANGE_IMAGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: {...state.user, 
          pictureURL: action.payload.url,
        },
        
        userDidLog: true
      });

      case RESET_ERROR:
      return _.assignIn({}, state, {
        error: ''
      });

      case CREATE_OFFER_ATTEMPT:
      return _.assignIn({}, state, {
        error: ''
      });

      case CREATE_OFFER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage
      });

      case CREATE_OFFER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        message: action.message
      });
      
      case SHOW_OFFER_ATTEMPT:
      return _.assignIn({}, state, {
        error: ''
      });

      case SHOW_OFFER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage
      });

      case SHOW_OFFER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        offer: action.offer
      });

      case CHANGE_FILTERS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        filters: action.payload
      });

      case GET_CATEGORIES_ATTEMPT:
      return _.assignIn({}, state, {
        error: ''
      });

      case GET_CATEGORIES_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        categories: action.categories.map(c => (c.name))
      });

      case GET_CATEGORIES_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage
      });

      case SEND_MESSAGE_ATTEMPT:
      return _.assignIn({}, state, {
        error: ''
      });

      case SEND_MESSAGE_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        messages: state.messages.concat([action.message]),
      });

      case UPDATE_MESSAGE_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        messages: state.messages.concat([action.payload]),
      });

      case GET_CONVERSATIONS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        conversations: action.conversations
      });

      case GET_MESSAGES_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        messages: action.messages,
        newMessages: [],
      });

      case MAKE_PROPOSAL_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        proposal: action.proposal,
      });

      case GET_USERS_OFFERS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        myOffers: action.usersOffers.myOffers,
        userOffers: action.usersOffers.userOffers,
      });

    default:
      return state
  }
};

export const initialUserState = {
  user: {}
};
