import _ from 'lodash';

export const SOCIAL_LOGIN_ATTEMPT = 'SOCIAL_LOGIN_ATTEMPT';
export const LOGIN_ATTEMPT = 'LOGIN_ATTEMPT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SIGNUP_ATTEMPT = 'SIGNUP_ATTEMPT';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const SOCIAL_SIGNUP_ATTEMPT = 'SOCIAL_SIGNUP_ATTEMPT';
export const SOCIAL_SIGNUP_SUCCESS = 'SOCIAL_SIGNUP_SUCCESS';
export const SOCIAL_SIGNUP_FAILURE = 'SOCIAL_SIGNUP_FAILURE';
export const LOGOUT_ATTEMPT = 'LOGOUT_ATTEMPT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const PROFILE_ATTEMPT = 'PROFILE_ATTEMPT';
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const PROFILE_FAILURE = 'PROFILE_FAILURE';
export const LOAD_STATE_ATTEMPT = 'LOAD_STATE_ATTEMPT';
export const LOAD_SUCCESS = 'LOAD_SUCCESS';
export const CHANGE_ATTEMPT = 'CHANGE_ATTEMPT';
export const CHANGE_IMAGE_ATTEMPT = 'CHANGE_IMAGE_ATTEMPT';
export const RESET_ERROR = 'RESET_ERROR';
export const CHECKBALANCE_ATTEMPT = 'CHECKBALANCE_ATTEMPT';
export const CHECKBALANCE_SUCCESS = 'CHECKBALANCE_SUCCESS';
export const CHECKBALANCE_FAILURE = 'CHECKBALANCE_FAILURE';
export const CHECKTRANSACTIONS_ATTEMPT = 'CHECKTRANSACTIONS_ATTEMPT';
export const CHECKTRANSACTIONS_SUCCESS = 'CHECKTRANSACTIONS_SUCCESS';
export const CHECKTRANSACTIONS_FAILURE = 'CHECKTRANSACTIONS_FAILURE';
export const OFFERS_ATTEMPT = 'OFFERS_ATTEMPT';
export const OFFERS_SUCCESS = 'OFFERS_SUCCESS';
export const OFFERS_FAILURE = 'OFFERS_FAILURE';
export const CREATE_OFFER_ATTEMPT = 'CREATE_OFFER_ATTEMPT';
export const CREATE_OFFER_FAILURE = 'CREATE_OFFER_FAILURE';
export const CREATE_OFFER_SUCCESS = 'CREATE_OFFER_SUCCESS';
export const SHOW_OFFER_ATTEMPT = 'SHOW_OFFER_ATTEMPT';
export const SHOW_OFFER_FAILURE = 'SHOW_OFFER_FAILURE';
export const SHOW_OFFER_SUCCESS = 'SHOW_OFFER_SUCCESS';
export const CHANGE_FILTERS_ATTEMPT = 'CHANGE_FILTERS_ATTEMPT';
export const GET_CATEGORIES_ATTEMPT = 'GET_CATEGORIES_ATTEMPT';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILURE = 'GET_CATEGORIES_FAILURE';
export const POST_QUESTION_ATTEMPT = 'POST_QUESTION_ATTEMPT';
export const POST_QUESTION_SUCCESS = 'POST_QUESTION_SUCCESS';
export const POST_QUESTION_FAILURE = 'POST_QUESTION_FAILURE';
export const GET_QUESTION_ANSWER_ATTEMPT = 'GET_QUESTION_ANSWER_ATTEMPT';
export const GET_QUESTION_ANSWER_SUCCESS = 'GET_QUESTION_ANSWER_SUCCESS';
export const GET_QUESTION_ANSWER_FAILURE = 'GET_QUESTION_ANSWER_FAILURE';
export const SEND_QUESTION_REPLY_ATTEMPT = 'SEND_QUESTION_REPLY_ATTEMPT';
export const SEND_QUESTION_REPLY_SUCCESS = 'SEND_QUESTION_REPLY_SUCCESS';
export const GET_USERS_OFFERS_ATTEMPT = 'GET_USERS_OFFERS_ATTEMPT';
export const GET_USERS_OFFERS_SUCCESS = 'GET_USERS_OFFERS_SUCCESS';
export const DISPLAY_TOAST_ATTEMPT = 'DISPLAY_TOAST_ATTEMPT';
export const GET_GOALS_ATTEMPT = 'GET_GOALS_ATTEMPT';
export const GET_GOALS_SUCCESS = 'GET_GOALS_SUCCESS';
export const GET_GOALS_FAILURE = 'GET_GOALS_FAILURE';
export const GET_GOALSUSER_ATTEMPT = 'GET_GOALSUSER_ATTEMPT';
export const GET_GOALSUSER_SUCCESS = 'GET_GOALSUSER_SUCCESS';
export const GET_GOALSUSER_FAILURE = 'GET_GOALSUSER_FAILURE';
export const SYNC_FB_ATTEMPT = 'SYNC_FB_ATTEMPT';
export const SYNC_FB_SUCCESS = 'SYNC_FB_SUCCESS';
export const SYNC_FB_FAILURE = 'SYNC_FB_FAILURE';
export const SEND_REWARD = 'SEND_REWARD';
export const SEND_REF_CODE = 'SEND_REF_CODE';
export const GET_USER_ATTEMPT = 'GET_USER_ATTEMPT';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.data.user,
        error: '',
        userDidLog: true,
      });
    case LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false,
      });
    case SOCIAL_LOGIN_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidLog: false,
      });
    case LOGIN_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.data.message,
        userDidLog: false,
      });

    case SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.user,
        error: '',
        userDidSignUp: true,
        referalCode: '',
      });
    case SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidSignUp: false,
      });
    case SOCIAL_SIGNUP_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
        userDidSignUp: false,
      });
    case SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.data.message,
        userDidSignUp: false,
      });
    case SOCIAL_SIGNUP_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.data.message,
        userDidSignUp: false,
      });
    case SOCIAL_SIGNUP_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        user: action.user,
        error: '',
        socialUserDidSignUp: true,
        userDidLog: true,
        referalCode: '',
      });

    case LOGOUT_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: true,
      });

    case LOGOUT_SUCCESS:
      return {};

    case PROFILE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        error: '',
      });
    case PROFILE_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        error: '',
        user: action.user.user,
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
        balance: action.balance,
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
        transactions: action.transactions,
      });
    case CHECKTRANSACTIONS_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });
    case OFFERS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });
    case OFFERS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        offers: action.responseOffers.offers,
        countOffers: action.responseOffers.countOffers,
        loading: false,
      });
    case OFFERS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        offers: [],
        countOffers: 0,
        filters: {},
        loading: false,
      });
    case LOAD_STATE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
        userDidSignUp: false,
        userDidLog: false,
      });

    case LOAD_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: action.cookieData.user,
        userDidLog: action.cookieData.isLogged,
      });

    case CHANGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: {
          ...state.user,
          name: action.payload.name,
          lastName: action.payload.lastName,
          address: action.payload.address,
          phone: action.payload.phone,
          birthdate: action.payload.birthdate,
          bio: action.payload.bio,
          interests: action.payload.interests,
        },

        userDidLog: true,
      });

    case CHANGE_IMAGE_ATTEMPT:
      return _.assignIn({}, state, {
        loading: false,
        userDidSignUp: false,
        user: {
          ...state.user,
          pictureURL: action.payload.url,
        },

        userDidLog: true,
      });

    case RESET_ERROR:
      return _.assignIn({}, state, {
        error: '',
        status: '',
        reviewCreated: false,
      });

    case CREATE_OFFER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case CREATE_OFFER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case CREATE_OFFER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        message: action.message,
        offerIsCreated: true,
        loading: false,
      });

    case SHOW_OFFER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case SHOW_OFFER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case SHOW_OFFER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        offer: action.offer,
        loading: false,
      });

    case CHANGE_FILTERS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        filters: action.payload,
      });

    case GET_CATEGORIES_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case GET_CATEGORIES_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        categories: action.categories.map(c => (c.name)),
      });

    case GET_CATEGORIES_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
      });

    case POST_QUESTION_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case POST_QUESTION_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
      });

    case POST_QUESTION_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
      });

    case GET_QUESTION_ANSWER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case GET_QUESTION_ANSWER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        questions: action.responseQuestions.questions,
        countQuestions: action.responseQuestions.count,
      });

    case GET_QUESTION_ANSWER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
      });

    case SEND_QUESTION_REPLY_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        reply: action.reply,
      });

    case GET_USERS_OFFERS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        myOffers: action.usersOffers.myOffers,
        userOffers: action.usersOffers.userOffers,
      });

    case DISPLAY_TOAST_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        status: action.payload.status,
      });

    case GET_GOALS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case GET_GOALS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_GOALS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        goals: action.responseGoals.goals,
        loading: false,
      });

    case GET_GOALSUSER_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case GET_GOALSUSER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_GOALSUSER_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        goalsUser: action.responseGoals.goalsUser,
        loading: false,
      });

    case SYNC_FB_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case SYNC_FB_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case SYNC_FB_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        loading: false,
        user: action.user,
      });

    case SEND_REF_CODE:
      return _.assignIn({}, state, {
        error: '',
        referalCode: action.payload.code,
      });

    case GET_USER_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
      });

    case GET_USER_SUCCESS:
      return _.assignIn({}, state, {
        profileUser: action.user,
        loading: false,
      });

    case GET_USER_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    default:
      return state;
  }
};

export const initialUserState = {
  user: {},
};