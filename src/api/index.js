import axios from 'axios';
import { stringify } from 'query-string';

function isHandledError(error) {
  return error.response && error.response.status && error.response.data;
}

function handleControlledError(error) {
  return {
    status: error.response.status,
    errorMessage: error.response.data.message,
  };
}

function handleUncontrolledError(error) {
  // This is where we could detect low conectivity errors, timeout errors, etc.
  return {
    status: 500,
    errorMessage: error.message,
  };
}

function handleError(error) {
  if (isHandledError(error)) {
    return handleControlledError(error);
  }
  return handleUncontrolledError(error);
}


export function resetAuthHeader() {
  axios.defaults.headers.common.Authorization = undefined;
}

export function logInAPICall(payload) {
  return axios.post(
    `${global.API_URL}/api/users/login`,
    payload,
  )
    .then(response => ({
      status: response.status,
      data: response.data,
    })).catch(e => handleError(e));
}

export function socialLogInAPICall(payload) {
  return axios.post(
    `${global.API_URL}/api/users/${payload.provider}/login`,
    payload,
  )
    .then(response => ({
      status: response.status,
      data: response.data,
    })).catch(e => handleError(e));
}

export function signUpAPICall(payload) {
  return axios.post(
    `${global.API_URL}/api/users/signup`,
    payload,
  )
    .then(response => ({
      status: response.status,
      body: response.data,
    })).catch(e => handleError(e));
}

export function getUrlSocialAPICall(payload) {
  return axios.get(
    `${global.API_URL}/api/users/${payload}URL`,
  )
    .then(response => ({
      status: response.status,
      data: response.data.url,
    })).catch(e => handleError(e));
}


export function socialSignUpAPICall(payload) {
  const code = payload;

  return axios.post(
    `${global.API_URL}/api/users/${payload.provider}/signup`,
    code,
  )
    .then(response => ({
      status: response.status,
      body: response.data,
    })).catch(e => handleError(e));
}

export function profileAPICall(payload) {
  const { userToken, userId, attributes } = payload;
  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.put(
    `${global.API_URL}/api/users/${userId}`, {
      attributes,
    },
  )
    .then(response => ({
      status: response.status,
      user: response.data.user,
    })).catch(e => handleError(e));
}

export function checkBalanceAPICall(payload) {
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const { userId } = payload;

  return axios.get(
    `${global.API_URL}/api/users/${userId}/balance`, {

    },
  )
    .then(response => ({
      status: response.status,
      balance: response.data.balance,
    })).catch(e => handleError(e));
}

export function checkTransactionsAPICall(payload) {
  const { userToken, userId, attributes } = payload;
  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.get(
    `${global.API_URL}/api/users/${userId}/transactions`, {
      attributes,
    },
  )
    .then(response => ({
      status: response.status,
      transactions: response.data,
    })).catch(e => handleError(e));
}

export function checkOffersPagedAPICall(payload) {
  const { limit, page, filters } = payload;
  const skip = page;
  const queryParams = stringify({ ...filters, limit, skip });

  return axios.get(
    `${global.API_URL}/api/offers?${queryParams}`,
  )
    .then(response => ({
      status: response.status,
      responseOffers: { offers: response.data.offers, countOffers: response.data.count },
    })).catch(e => handleError(e));
}

export function createOfferAPICall(payload) {
  const { userToken, offer } = payload;
  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.post(
    `${global.API_URL}/api/offers/`, offer,
  )
    .then(response => ({
      status: response.status,
      message: response.status,
    })).catch(e => handleError(e));
}

export function getOfferAPICall(payload) {
  const { userToken, offerId } = payload;
  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.get(
    `${global.API_URL}/api/offers/${offerId}`,
  )
    .then(response => ({
      status: response.status,
      offer: response.data.offer,
    })).catch(e => handleError(e));
}

export function getCategoriesAPICall() {
  return axios.get(
    `${global.API_URL}/api/categories/`,
  )
    .then(response => ({
      status: response.status,
      categories: response.data.categories,
    })).catch(e => handleError(e));
}

export function postQuestionAPICall(payload) {
  const { offerId } = payload;
  const text = { text: payload.question };
  const userToken = payload.token;

  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.post(
    `${global.API_URL}/api/questions/${offerId}`, text,
  )
    .then(response => ({
      status: response.status,
      message: response.status,
    })).catch(e => handleError(e));
}

export function getQuestionAnswerAPICall(payload) {
  const {
    offerId,
    token,
    limit,
    page,
  } = payload;
  const skip = page;

  const queryParams = stringify({ limit, skip });

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/offers/questions/${offerId}?${queryParams}`,
  )
    .then(response => ({
      status: response.status,
      responseQuestions: response.data,
    })).catch(e => handleError(e));
}

export function sendReplyAPICall(payload) {
  const { questionId, reply, token } = payload;
  const replyJson = { attributes: { response: reply } };

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.put(
    `${global.API_URL}/api/questions/${questionId}`, replyJson,
  )
    .then(response => ({
      status: response.status,
      reply: response.data.response,
    })).catch(e => handleError(e));
}

export function createUrlConversation(payload) {
  const { token, toUser } = payload;
  const toId = { toId: toUser };

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.post(
    `${global.API_URL}/api/conversations/`, toId,
  )
    .then(response => ({
      status: response.status,
      conversation: response.data.conversation,
    })).catch(e => handleError(e));
}

export function sendMessageAPICall(payload) {
  const { token, message, conversationId } = payload;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.post(
    `${global.API_URL}/api/messages/${conversationId}`, message,
  )
    .then(response => ({
      status: response.status,
      message: response.data.message,
    })).catch(e => handleError(e));
}

export function getConversationsAPICall(payload) {
  const { token } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/conversations/`,
  )
    .then(response => ({
      status: response.status,
      conversations: response.data.conversations,
    })).catch(e => handleError(e));
}

export function getMessagesAPICall(payload) {
  const { token, conversationId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/messages/${conversationId}/`,
  )
    .then(response => ({
      status: response.status,
      messages: response.data.messages,
    })).catch(e => handleError(e));
}

export function getConversation(payload) {
  const { token, conversationId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/conversations/${conversationId}`,
  )
    .then(response => response.data.conversation);
}

export function makeProposalAPICall(payload) {
  const { token, conversationId, proposal } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.post(
    `${global.API_URL}/api/proposals/${conversationId}`, proposal,
  )
    .then(response => ({
      status: response.status,
      proposal: response.data.proposal,
    })).catch(e => handleError(e));
}

export async function getUsersOffersAPICall(payload) {
  const { token, myUserId, serviceUserId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const resultMyOffers = await axios.get(`${global.API_URL}/api/offers/user/${myUserId}`);
  const resultServiceUserOffers = await axios.get(`${global.API_URL}/api/offers/user/${serviceUserId}`);

  return {
    status: 200,
    usersOffers: {
      myOffers: resultMyOffers.data.offers,
      userOffers: resultServiceUserOffers.data.offers,
    },
  };
}

export function getProposalsAPICall(payload) {
  const { token } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/proposals/`,
  )
    .then(response => ({
      status: response.status,
      responseProposals: response.data,
    })).catch(e => handleError(e));
}

export async function acceptProposalAPICall(payload) {
  const { token, proposalId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.put(
    `${global.API_URL}/api/proposals/${proposalId}/accept`,
  )
    .then(response => ({
      status: response.status,
      proposal: response.data.proposal,
    })).catch(e => handleError(e));
}

export async function rejectProposalAPICall(payload) {
  const { token, proposalId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.put(
    `${global.API_URL}/api/proposals/${proposalId}/reject`,
  )
    .then(response => ({
      status: response.status,
      proposal: response.data.proposal,
    })).catch(e => handleError(e));
}

export async function cancelProposalAPICall(payload) {
  const { token, proposalId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.put(
    `${global.API_URL}/api/proposals/${proposalId}/cancel`,
  )
    .then(response => ({
      status: response.status,
      proposal: response.data.proposal,
    })).catch(e => handleError(e));
}

export function getConversationProposalAPICall(payload) {
  const { token, conversationId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/proposals/${conversationId}`,
  )
    .then(response => ({
      status: response.status,
      proposal: response.data.proposal,
    })).catch(e => handleError(e));
}

export function getGoalsAPICall() {
  return axios.get(
    `${global.API_URL}/api/goals/`,
  )
    .then(response => ({
      status: response.status,
      responseGoals: { goals: response.data.goals },
    })).catch(e => handleError(e));
}

export function getGoalsUserAPICall(payload) {
  const { token, userId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/goals/user/${userId}`,
  )
    .then(response => ({
      status: response.status,
      responseGoals: { goalsUser: response.data },
    })).catch(e => handleError(e));
}

export function syncFBApiCall(payload) {
  const { userToken, fbToken } = payload;

  const code = {
    code: fbToken,
  };

  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.post(
    `${global.API_URL}/api/users/facebook/sync`, code,
  )
    .then(response => ({
      status: response.status,
      user: response.data.user,
    })).catch(e => handleError(e));
}

export function getShareCount(payload) {
  const token = payload.userToken;
  const params = {
    params: {
      uri: payload.url,
    },
  };

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/offers/count`, params,
  )
    .then(response => ({
      status: response.status,
      count: response.data.count,
    })).catch(e => handleError(e));
}

export function sendRewardApiCall(payload) {
  const { userToken, userId, offerId } = payload;

  const offer = {
    offerId,
  };

  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.post(
    `${global.API_URL}/api/users/${userId}/share`, offer,
  )
    .then(response => ({
      status: response.status,
      data: response.status,
    })).catch(e => handleError(e));
}

export function getReviewsAPICall(payload) {
  const { userToken, offerId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.get(
    `${global.API_URL}/api/rates/?offerId=${offerId}`,
  )
    .then(response => ({
      status: response.status,
      reviews: response.data.rates,
    })).catch(e => handleError(e));
  }

export function sendReviewAPICall(payload) {
  const { token, offerRate, userRate, offerId, description } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  
  const data = {
    userRate,
    offerRate,
    description,
  };

  return axios.post(
    `${global.API_URL}/api/rates/${offerId}`, data,
  )
    .then(response => ({
      status: response.status,
      review: response.data.rate,
    })).catch(e => handleError(e));
}

export function checkReviewAPICall(payload) {
  const { userToken, offerId } = payload;

  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  
  return axios.get(
    `${global.API_URL}/api/rates/${offerId}/reviewable`,
  )
    .then(response => ({
      status: response.status,
      canRate: response.data.shouldReview,
    })).catch(e => handleError(e));
}

export function getUserReviewsApiCall(payload) {
  const { userId } = payload;

  return axios.get(
    `${global.API_URL}/api/rates/?reviewedUserId=${userId}`,
  )
    .then(response => ({
      status: response.status,
      reviews: response.data.rates,
    })).catch(e => handleError(e));
}

export function getUserApiCall(payload) {
  const { userId } = payload;

  return axios.get(
    `${global.API_URL}/api/users/${userId}`,
  )
    .then(response => ({
      status: response.status,
      user: response.data.user,
    })).catch(e => handleError(e));
}
