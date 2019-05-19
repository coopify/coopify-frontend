import axios from 'axios';
import { stringify } from 'query-string';

export function resetAuthHeader(){
  axios.defaults.headers.common.Authorization = undefined;
}

export function logInAPICall(payload) {
    return axios.post(
        `${global.API_URL}/api/users/login`,
        payload).
        then((response) => {
          return {
            status: response.status,
            data: response.data,
          }
        }).catch((e) => ({
            status: e.response.status,
            data: e.response
        }));
}

export function socialLogInAPICall(payload) {
  return axios.post(
      `${global.API_URL}/api/users/${payload.provider}/login`,
      payload).
      then((response) => {
        return {
          status: response.status,
          data: response.data,
        }
      }).catch((e) => ({
          status: e.response.status,
          data: e.response
      }));
}

export function signUpAPICall(payload) {
  return axios.post(
      `${global.API_URL}/api/users/signup`,
      payload).
      then((response) => {
        return {       
          status: response.status,
          body: response.data
        }
      }).catch((e) => { 
        console.log("signUpAPICall Error: " + JSON.stringify(e) + "  " + e);
        return {
          status: e.response.status,
          data: e.response
      }});
}

export function getUrlSocialAPICall(payload) {
  return axios.get(
      `${global.API_URL}/api/users/${payload}URL`).
      then((response) => {
        return {       
          status: response.status,
          data: response.data.url
        }
      }).catch((e) => ({
        status: response.status,
        data: response.data.data.message
      }));
}


export function socialSignUpAPICall(payload) { //TODO ver el endpoint en el backend exchange...
  
  const code = payload;
  
  return axios.post(
      `${global.API_URL}/api/users/${payload.provider}/signup`,
    code).
      then((response) => {
        return {       
          status: response.status,
          body: response.data
        }
      }).catch((e) => {
        console.log("SocialSignUpAPICall Error" + JSON.stringify(e));
        return {
          status: e.response.status,
          data: e.response.data
        }
      });
}

export function profileAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const userId = payload.userId;
  
  const attributes =  payload.attributes;

  return axios.put(
    `${global.API_URL}/api/users/${userId}`, {
        attributes
    }).  
    then((response) => {
      return {       
        status: response.status,
        user: response.data.user
      }
    }).catch((e) => { 
      console.log("signUpAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});

}

export function checkBalanceAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const userId = payload.userId;

  return axios.get(
    `${global.API_URL}/api/users/${userId}/balance`, {

    }).  
    then((response) => {
      return {       
        status: response.status,
        balance: response.data.balance
      }
    }).catch((e) => { 
      console.log("checkBalance Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function checkTransactionsAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const userId = payload.userId;
  
  const attributes =  payload.attributes;

  return axios.get(
    `${global.API_URL}/api/users/${userId}/transactions`, {
        attributes
    }).  
    then((response) => {
      return {       
        status: response.status,
        transactions: response.data
      }
    }).catch((e) => { 
      console.log("checkTransactions Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

// export function checkOffersAPICall(){

//   return axios.get(
//     `${global.API_URL}/api/offers/`).  
//     then((response) => {
//       return {       
//         status: response.status,
//         offers: response.data.offers
//       }
//     }).catch((e) => { 
//       console.log("checkOffers Error: " + JSON.stringify(e) + "  " + e);
//       return {
//         status: e.response.status,
//         errorMessage: e.response.data.message
//     }});
// }

export function checkOffersPagedAPICall(payload){
  const limit = payload.limit;
  const skip = payload.page;
  const filters = payload.filters;
  const queryParams = stringify({...filters,limit,skip})

  return axios.get(
    `${global.API_URL}/api/offers?${queryParams}`)
    .then((response) => {
      return {       
        status: response.status,
        responseOffers: {offers: response.data.offers, countOffers: response.data.count},
      }
    }).catch((e) => { 
      console.log("checkOffers Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function createOfferAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const offer =  payload.offer;

  return axios.post(
    `${global.API_URL}/api/offers/`, offer).  
    then((response) => {
      return {       
        status: response.status,
        message: response.status
      }
    }).catch((e) => { 
      console.log("createOfficeAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function getOfferAPICall(payload){
  const token = payload.userToken;
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  
  const offerId =  payload.offerId;

  return axios.get(
    `${global.API_URL}/api/offers/${offerId}`).
    then((response) => {
      return {       
        status: response.status,
        offer: response.data.offer
      }
    }).catch((e) => { 
      console.log("getOfferAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function getCategoriesAPICall(){

  return axios.get(
    `${global.API_URL}/api/categories/`).
    then((response) => {
      return {       
        status: response.status,
        categories: response.data.categories
      }
    }).catch((e) => { 
      console.log("getCategoriesAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
  // return {
  //   status: 200,
  //   categories: [{name: 'Musica'},{name: 'Tecnologia'},{name:'Otros'}]
  // };
}

export function postQuestionAPICall(payload){
  const offerId =  payload.offerId;
  const text =  { text: payload.question };
  const userToken = payload.token;

  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.post(
    `${global.API_URL}/api/questions/${offerId}`, text).  
    then((response) => {
      return {       
        status: response.status,
        message: response.status
      }
    }).catch((e) => { 
      console.log("createOfficeAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function getQuestionAnswerAPICall(payload){
  const offerId =  payload.offerId;
  const token = payload.token;
  const limit = payload.limit;
  const skip = payload.page;

  const queryParams = stringify({limit,skip})

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/offers/questions/${offerId}?${queryParams}`).
    then((response) => {
      return {       
        status: response.status,
        responseQuestions: response.data,
      }
    }).catch((e) => { 
      console.log("getQuestionAnswerAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function sendReplyAPICall(payload){

  const questionId = payload.questionId;
  const reply = { attributes: { response: payload.reply } };
  const userToken = payload.token;

  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.put(
    `${global.API_URL}/api/questions/${questionId}`, reply).  
    then((response) => {
      return {       
        status: response.status,
        reply: response.data.response
      }
    }).catch((e) => { 
      console.log("createOfficeAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function getUrlConversation(payload) {

  const token = payload.token;
  const toId = { toId:  payload.toUser }; 

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.post(
      `${global.API_URL}/api/conversations/`, toId).
      then((response) => {
        return {       
          status: response.status,
          conversation: response.data.conversation
        }
      }).catch((e) => ({
        status: response.status,
        data: response.data.data.message
      }));
}

export function sendMessageAPICall(payload){
  const token = payload.token;
  const message = payload.message;
  const conversationId = payload.conversationId;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.post(
    `${global.API_URL}/api/messages/${conversationId}`, message).  
    then((response) => {
      return {       
        status: response.status,
        message: response.data.message
      }
    }).catch((e) => { 
      console.log("createOfficeAPICall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function getConversationsAPICall(payload) {

  const token = payload.token;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
      `${global.API_URL}/api/conversations/`).
      then((response) => {
        return {       
          status: response.status,
          conversations: response.data.conversations
        }
      }).catch((e) => ({
        status: response.status,
        data: response.data.data.message
      }));
}

export function getMessagesAPICall(payload) {

  const token = payload.token;
  const conversationId = payload.conversationId;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
      `${global.API_URL}/api/messages/${conversationId}/`).
      then((response) => {
        return {       
          status: response.status,
          messages: response.data.messages
        }
      }).catch((e) => ({
        status: response.status,
        data: response.data.data.message
      }));
}

export function getConversation(payload){
  const token = payload.token;
  const conversationId = payload.conversationId;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
      `${global.API_URL}/api/conversations/${conversationId}`).
      then((response) => {
        return response.data.conversation

      }).catch((e) => {
        return undefined});
}

export function makeProposalAPICall(payload){
  const token = payload.token;
  const conversationId = payload.conversationId;
  const proposal = payload.proposal;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.post(
      `${global.API_URL}/api/proposals/${conversationId}`, proposal).
        then((response) => {
        return {       
          status: response.status,
          proposal: response.data.proposal
        }
      }).catch((e) => ({
        status: response.status,
        data: response.data.data.message
      }));
}

export async function getUsersOffersAPICall(payload){
  const token = payload.token;
  const conversationId = payload.conversationId;
  const myUserId = payload.myUserId;
  const serviceUserId = payload.serviceUserId;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  const resultMyOffers = await axios.get(`${global.API_URL}/api/offers/user/${myUserId}`);
  console.log("MYoFFERS: " + JSON.stringify(resultMyOffers));
  const resultServiceUserOffers = await axios.get(`${global.API_URL}/api/offers/user/${serviceUserId}`);
  console.log("other user offers: " +JSON.stringify(resultServiceUserOffers));

      return {
        status: 200,
        usersOffers: {
          myOffers: resultMyOffers.data.offers,
          userOffers: resultServiceUserOffers.data.offers,
        }
      };
}

export function getProposalsAPICall(payload){
  //const offerId =  payload.offerId;
  const token = payload.token;
  //const limit = payload.limit;
  //const skip = payload.page;

  //const queryParams = stringify({limit,skip})

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/proposals/`).
    then((response) => {
      return {       
        status: response.status,
        responseProposals: response.data,
      }
    }).catch((e) => { 
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
} 

export async function acceptProposalAPICall(payload){
    const token = payload.token;
    const proposalId = payload.proposalId;  

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;

    return axios.put(
      `${global.API_URL}/api/proposals/${proposalId}/accept`).
        then((response) => {
        return {       
          status: response.status,
          proposal: response.data.proposal
        }
      }).catch((e) => ({
        status: response.status,
        data: response.data.data.message
      }));
} 

export async function rejectProposalAPICall(payload){
  const token = payload.token;
  const proposalId = payload.proposalId;  

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.put(
    `${global.API_URL}/api/proposals/${proposalId}/reject`).
      then((response) => {
      return {       
        status: response.status,
        proposal: response.data.proposal
      }
    }).catch((e) => ({
      status: response.status,
      data: response.data.data.message
    }));
} 

export async function cancelProposalAPICall(payload){
  const token = payload.token;
  const proposalId = payload.proposalId;  

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.put(
    `${global.API_URL}/api/proposals/${proposalId}/cancel`).
      then((response) => {
      return {       
        status: response.status,
        proposal: response.data.proposal
      }
    }).catch((e) => ({
      status: response.status,
      data: response.data.data.message
    }));
}

export function getConversationProposalAPICall(payload){
  const token = payload.token;
  const conversationId = payload.conversationId;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/proposals/${conversationId}`).
    then((response) => {
      return {       
        status: response.status,
        proposal: response.data.proposal,
      }
    }).catch((e) => { 
      return {
        status: e.response.status,
        proposal: {},
    }});
}

export function getGoalsAPICall(){

  return axios.get(
    `${global.API_URL}/api/goals/`).
    then((response) => {
      return {       
        status: response.status,
        responseGoals: {goals: response.data.goals},
      }
    }).catch((e) => { 
      return {
        status: e.response.status,
        goals: {},
    }});
  //   return {
  //   status: 200,
  //   responseGoals: {goals: [{name: 'Offer a service',description: 'Post your first service and offer your talents to the community.',amount: 10, quantity: 6},
  //   {name: 'Post your referral link',description: 'Publicly support us and post your referral link to your timeline on Facebook.',amount: 15, quantity: 9}],
  //   count: 2}
  // };
}

export function getGoalsUserAPICall(payload){
  const token = payload.token;
  const userId = payload.userId;

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/goals/user/${userId}`).
    then((response) => {
      return {       
        status: response.status,
        responseGoals: {goalsUser: response.data},
      }
    }).catch((e) => { 
      return {
        status: e.response.status,
        goals: {},
    }});
  //   return {
  //   status: 200,
  //   responseGoals: {goals: [{name: 'Offer a service',description: 'Post your first service and offer your talents to the community.',amount: 10, quantity: 6},
  //   {name: 'Post your referral link',description: 'Publicly support us and post your referral link to your timeline on Facebook.',amount: 15, quantity: 9}],
  //   count: 2}
  // };
}

export function syncFBApiCall(payload){
  const userToken = payload.userToken;
  const code = 
  {
    code: payload.fbToken
  };
 
  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.post(
    `${global.API_URL}/api/users/facebook/sync`, code).  
    then((response) => {
      return {       
        status: response.status,
        user: response.data.user
      }
    }).catch((e) => { 
      console.log("syncFBApiCall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}

export function getShareCount(payload){
  const token = payload.userToken;
  const params = {
    params: {
      uri: payload.url
    }
  };

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  return axios.get(
    `${global.API_URL}/api/offers/count`, params).
    then((response) => {
      return {       
        status: response.status,
        count: response.data.count,
      }
    }).catch((e) => { 
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
} 

export function sendRewardApiCall(payload){
  const userToken = payload.userToken;
  const userId = payload.userId;
  const offer =
  { 
    offerId: payload.offerId 
  };
 
  axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;

  return axios.post(
    `${global.API_URL}/api/users/${userId}/share`, offer).  
    then((response) => {
      return {       
        status: response.status,
        data: response.status
      }
    }).catch((e) => { 
      console.log("sendRewardApiCall Error: " + JSON.stringify(e) + "  " + e);
      return {
        status: e.response.status,
        errorMessage: e.response.data.message
    }});
}
