
import _ from 'lodash';

export const GET_REVIEWS_ATTEMPT = 'GET_REVIEWS_ATTEMPT';
export const GET_REVIEWS_SUCCESS = 'GET_REVIEWS_SUCCESS';
export const GET_REVIEWS_FAILURE = 'GET_REVIEWS_FAILURE';
export const SEND_REVIEW_ATTEMPT = 'SEND_REVIEW_ATTEMPT';
export const SEND_REVIEW_SUCCESS = 'SEND_REVIEW_SUCCESS';
export const SEND_REVIEW_FAILURE = 'SEND_REVIEW_FAILURE';
export const CAN_REVIEW_ATTEMPT = 'CAN_REVIEW_ATTEMPT';
export const CAN_REVIEW_SUCCESS = 'CAN_REVIEW_SUCCESS';
export const CAN_REVIEW_FAILURE = 'CAN_REVIEW_FAILURE';
export const GET_USER_REVIEWS_ATTEMPT = 'GET_USER_REVIEWS_ATTEMPT';
export const GET_USER_REVIEWS_FAILURE = 'GET_USER_REVIEWS_FAILURE';
export const GET_USER_REVIEWS_SUCCESS = 'GET_USER_REVIEWS_SUCCESS';
export const RESET_ERROR_REVIEWS = 'RESET_ERROR_REVIEWS';

export const review = (state = initialReviewState, action) => {
  switch (action.type) {

    case GET_REVIEWS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case GET_REVIEWS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_REVIEWS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        reviews: action.reviews,
        loading: false,
      });
  
    case SEND_REVIEW_ATTEMPT:
      return _.assignIn({}, state, {
        loading: true,
      });

    case SEND_REVIEW_FAILURE:
      return _.assignIn({}, state, {
        loading: false,
        error: action.errorMessage,
      });

    case SEND_REVIEW_SUCCESS:
      return _.assignIn({}, state, {
        loading: false,
        reviews: [action.review].concat(state.reviews),
        reviewCreated: true,
      });
      
    case CAN_REVIEW_SUCCESS:
      return _.assignIn({}, state, {
        canRate: action.canRate,
      });

    case CAN_REVIEW_FAILURE:
      return _.assignIn({}, state, {
        canRate: false,
      });

    case GET_USER_REVIEWS_SUCCESS:
      return _.assignIn({}, state, {
        reviews: action.reviews,
      });
  
    case GET_USER_REVIEWS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
      });

    case RESET_ERROR_REVIEWS:
      return _.assignIn({}, state, {
        error: '',
        status: '',
        reviewCreated: false,
      });

    default:
      return state;
  }
};

export const initialReviewState = {
  review: {},
};