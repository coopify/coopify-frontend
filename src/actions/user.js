import { Actions } from '../reducers';

export const attemptLoginAction = (payload) => ({
    type: Actions.LOGIN_ATTEMPT,
    payload
});

export const attemptSocialLoginAction = (payload) => ({
    type: Actions.SOCIAL_LOGIN_ATTEMPT,
    payload
});

export const attemptSignUpAction = (payload) => ({
    type: Actions.SIGNUP_ATTEMPT,
    payload
});

export const attemptSocialSignUpAction = (payload) => ({
    type: Actions.SOCIAL_SIGNUP_ATTEMPT,
    payload
});

export const attemptLogoutAction = () => ({
    type: Actions.LOGOUT_ATTEMPT
});

export const attemptProfileAction = (payload) => ({
    type: Actions.PROFILE_ATTEMPT,
    payload
});

export const attemptCheckBalanceAction = (payload) => ({
    type: Actions.CHECKBALANCE_ATTEMPT,
    payload
});

export const attemptCheckTransactionsAction = (payload) => ({
    type: Actions.CHECKTRANSACTIONS_ATTEMPT,
    payload
});

export const attemptOffersAction = (payload) => ({
    type: Actions.OFFERS_ATTEMPT,
    payload
});

export const loadState = () => ({
    type: Actions.LOAD_STATE_ATTEMPT
});

export const onChangeProfileInputAction = (payload) => ({
    type: Actions.CHANGE_ATTEMPT,
    payload
});

export const changeProfileImage = (payload) => ({
    type: Actions.CHANGE_IMAGE_ATTEMPT,
    payload
});

export const resetError = () => ({
    type: Actions.RESET_ERROR
});

export const attemptPublishOffer = (payload) => ({
    type: Actions.CREATE_OFFER_ATTEMPT,
    payload
});

export const attemptShowOffer = (payload) => ({
    type: Actions.SHOW_OFFER_ATTEMPT,
    payload
});

export const attemptChangeFilters = (payload) => ({
    type: Actions.CHANGE_FILTERS_ATTEMPT,
    payload
});

export const attemptCategoriesAction = () => ({
    type: Actions.GET_CATEGORIES_ATTEMPT
});

export const attemptQuestion = (payload) => ({
    type: Actions.POST_QUESTION_ATTEMPT,
    payload
});

export const attemptGetQuestionsAndAnswer = (payload) => ({
    type: Actions.GET_QUESTION_ANSWER_ATTEMPT,
    payload
});

export const attemptSendReply = (payload) => ({
    type: Actions.SEND_QUESTION_REPLY_ATTEMPT,
    payload
});

export const attemptSendMessage = (payload) => ({
    type: Actions.SEND_MESSAGE_ATTEMPT,
    payload
});

export const attemptUpdateMessage = (payload) => ({
    type: Actions.UPDATE_MESSAGE_ATTEMPT,
    payload
});

export const attemptGetUserConversations = (payload) => ({
    type: Actions.GET_CONVERSATIONS_ATTEMPT,
    payload
});

export const attemptGetUserChat = (payload) => ({
    type: Actions.GET_MESSAGES_ATTEMPT,
    payload
});

export const attemptMakeProposal= (payload) => ({
    type: Actions.MAKE_PROPOSAL_ATTEMPT,
    payload
});

export const attemptGetUsersOffers = (payload) => ({
    type: Actions.GET_USERS_OFFERS_ATTEMPT,
    payload
});

export const attemptProposalsAction = (payload) => ({
    type: Actions.GET_PROPOSALS_ATTEMPT,
    payload
});

export const attemptAcceptProposal = (payload) => ({
    type: Actions.ACCEPT_PROPOSAL_ATTEMPT,
    payload
});

export const attemptRejectProposal = (payload) => ({
    type: Actions.REJECT_PROPOSAL_ATTEMPT,
    payload
});

export const attemptCancelProposal = (payload) => ({
    type: Actions.CANCEL_PROPOSAL_ATTEMPT,
    payload
});

export const attemptDisplayToast = (payload) => ({
    type: Actions.DISPLAY_TOAST_ATTEMPT,
    payload
});


export const attemptGetConversationProposals = (payload) => ({
    type: Actions.GET_CONVERSATION_PROPOSAL_ATTEMPT,
    payload
});

export const attemptGoalsAction = () => ({
    type: Actions.GET_GOALS_ATTEMPT,
});

export const attemptGoalsUserAction = (payload) => ({
    type: Actions.GET_GOALSUSER_ATTEMPT,
    payload
});

export const attemptSyncFB = (payload) => ({
    type: Actions.SYNC_FB_ATTEMPT,
    payload
});

export const attemptSendReward = (payload) => ({
    type: Actions.SEND_REWARD,
    payload
});
