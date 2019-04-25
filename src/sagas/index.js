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
  sendChatMessageAsync,
  getConversationsAsync,
  getMessagesAsync,
  makeProposalAsync,
  geteUsersOffers,

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
    takeEvery('SEND_MESSAGE_ATTEMPT', sendChatMessageAsync),
    takeEvery('GET_CONVERSATIONS_ATTEMPT', getConversationsAsync),
    takeEvery('GET_MESSAGES_ATTEMPT', getMessagesAsync),
    takeEvery('MAKE_PROPOSAL_ATTEMPT', makeProposalAsync),
    takeEvery('GET_USERS_OFFERS_ATTEMPT', geteUsersOffers),
  ]);
}