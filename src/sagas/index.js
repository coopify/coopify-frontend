import { takeEvery, all } from 'redux-saga/effects';
import { loginAsync, 
  signUpAsync, 
  socialSignUpAsync, 
  logoutAsync, 
  profileAsync, 
  checkBalanceAsync, 
  checkTransactionsAsync,
  checkOffersAsync, 
  loadStateFromCookies, 
  socialLoginAsync,
  createOfferAsync,
  getOfferAsync,
  getCategoriesAsync,
  postQuestionAsync,
  getQuestionAnswerAsync,
  sendReplyAsync,
  sendChatMessageAsync,
  getConversationsAsync,
  getMessagesAsync,
  makeProposalAsync,
  geteUsersOffers,
  getProposalsAsync,
  acceptProposalAsync,
  rejectProposalAsync,
  cancelProposalAsync,
  getConversationProposalAsync,
  getGoalsAsync,
  getGoalsUserAsync,
  syncFacebookAsync,
} from './user'

export default function* rootSaga() {
  yield all(
  [
    takeEvery('LOGIN_ATTEMPT', loginAsync),
    takeEvery('SOCIAL_LOGIN_ATTEMPT', socialLoginAsync),
    takeEvery('SIGNUP_ATTEMPT', signUpAsync),
    takeEvery('SOCIAL_SIGNUP_ATTEMPT', socialSignUpAsync),
    takeEvery('LOGOUT_ATTEMPT', logoutAsync),
    takeEvery('PROFILE_ATTEMPT', profileAsync),
    takeEvery('CHECKBALANCE_ATTEMPT', checkBalanceAsync),
    takeEvery('CHECKTRANSACTIONS_ATTEMPT', checkTransactionsAsync),
    takeEvery('OFFERS_ATTEMPT', checkOffersAsync),
    takeEvery('LOAD_STATE_ATTEMPT', loadStateFromCookies),
    takeEvery('CREATE_OFFER_ATTEMPT', createOfferAsync),
    takeEvery('SHOW_OFFER_ATTEMPT', getOfferAsync),
    takeEvery('GET_CATEGORIES_ATTEMPT', getCategoriesAsync),
    takeEvery('POST_QUESTION_ATTEMPT', postQuestionAsync),
    takeEvery('GET_QUESTION_ANSWER_ATTEMPT', getQuestionAnswerAsync),
    takeEvery('SEND_QUESTION_REPLY_ATTEMPT', sendReplyAsync),
    takeEvery('SEND_MESSAGE_ATTEMPT', sendChatMessageAsync),
    takeEvery('GET_CONVERSATIONS_ATTEMPT', getConversationsAsync),
    takeEvery('GET_MESSAGES_ATTEMPT', getMessagesAsync),
    takeEvery('MAKE_PROPOSAL_ATTEMPT', makeProposalAsync),
    takeEvery('GET_USERS_OFFERS_ATTEMPT', geteUsersOffers),
    takeEvery('GET_PROPOSALS_ATTEMPT', getProposalsAsync),
    takeEvery('ACCEPT_PROPOSAL_ATTEMPT', acceptProposalAsync),
    takeEvery('REJECT_PROPOSAL_ATTEMPT', rejectProposalAsync),
    takeEvery('CANCEL_PROPOSAL_ATTEMPT', cancelProposalAsync),
    takeEvery('GET_CONVERSATION_PROPOSAL_ATTEMPT', getConversationProposalAsync),
    takeEvery('GET_GOALS_ATTEMPT', getGoalsAsync),
    takeEvery('GET_GOALSUSER_ATTEMPT', getGoalsUserAsync),
    takeEvery('SYNC_FB_ATTEMPT', syncFacebookAsync),
  ]);
}