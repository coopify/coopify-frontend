
import _ from 'lodash';

export const MAKE_PROPOSAL_ATTEMPT = 'MAKE_PROPOSAL_ATTEMPT';
export const MAKE_PROPOSAL_SUCCESS = 'MAKE_PROPOSAL_SUCCESS';
export const MAKE_PROPOSAL_FAILURE = 'MAKE_PROPOSAL_FAILURE';
export const GET_PROPOSALS_ATTEMPT = 'GET_PROPOSALS_ATTEMPT';
export const GET_PROPOSALS_SUCCESS = 'GET_PROPOSALS_SUCCESS';
export const GET_PROPOSALS_FAILURE = 'GET_PROPOSALS_FAILURE';
export const ACCEPT_PROPOSAL_ATTEMPT = 'ACCEPT_PROPOSAL_ATTEMPT';
export const ACCEPT_PROPOSAL_SUCCESS = 'ACCEPT_PROPOSAL_SUCCESS';
export const REJECT_PROPOSAL_ATTEMPT = 'REJECT_PROPOSAL_ATTEMPT';
export const REJECT_PROPOSAL_SUCCESS = 'REJECT_PROPOSAL_SUCCESS';
export const CANCEL_PROPOSAL_ATTEMPT = 'CANCEL_PROPOSAL_ATTEMPT';
export const CANCEL_PROPOSAL_SUCCESS = 'CANCEL_PROPOSAL_SUCCESS';
export const STATUS_PROPOSAL_FAILURE = 'STATUS_PROPOSAL_FAILURE';
export const GET_CONVERSATION_PROPOSAL_ATTEMPT = 'GET_CONVERSATION_PROPOSAL_ATTEMPT';
export const GET_CONVERSATION_PROPOSAL_SUCCESS = 'GET_CONVERSATION_PROPOSAL_SUCCESS';
export const RESET_ERROR_PROPOSALS = 'RESET_ERROR_PROPOSALS';

export const proposal = (state = initialProposalState, action) => {
  switch (action.type) {
   
    case MAKE_PROPOSAL_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        proposal: action.proposal,
        loading: false,
      });

    case GET_PROPOSALS_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
        loading: true,
      });

    case GET_PROPOSALS_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_PROPOSALS_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        proposals: action.proposals,
        loading: false,
      });

    case ACCEPT_PROPOSAL_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        proposal: action.proposal,
      });

    case REJECT_PROPOSAL_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        proposal: action.proposal,
      });

    case CANCEL_PROPOSAL_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        proposal: action.proposal,
      });

    case STATUS_PROPOSAL_FAILURE:
      return _.assignIn({}, state, {
        error: action.errorMessage,
        loading: false,
      });

    case GET_CONVERSATION_PROPOSAL_ATTEMPT:
      return _.assignIn({}, state, {
        error: '',
      });

    case GET_CONVERSATION_PROPOSAL_SUCCESS:
      return _.assignIn({}, state, {
        error: '',
        proposal: action.proposal,
      });

    case RESET_ERROR_PROPOSALS:
      return _.assignIn({}, state, {
        error: '',
        status: '',
      });

    default:
      return state;
  }
};

export const initialProposalState = {
  proposal: {},
};