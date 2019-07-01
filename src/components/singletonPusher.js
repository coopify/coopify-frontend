
// Bulma CSS for light weight CSS. One can any css framework
import Pusher from 'pusher-js';
import { attemptUpdateMessage, attemptDisplayToast } from '../actions/user';

let instance = null;
let pusher = null;
let initialized = false;
let authorizationChannel;

export default class SingletonPusher {
  constructor() {
    this.initializePusher = this.initializePusher.bind(this);
    this.pusherDisconnect = this.pusherDisconnect.bind(this);

    this.initializePusher();
  }

  static getInstance() {
    if (!instance) {
      instance = new SingletonPusher();
    }

    return instance;
  }

  initializePusher = () => {
    const pusherAppKey = global.PUSHER_APP_KEY;
    const pusherCluster = global.PUSHER_APP_CLUSTER;

    pusher = new Pusher(pusherAppKey, {
      cluster: pusherCluster,
    });

    authorizationChannel = pusher.subscribe('TransactionAuthorization')
  }

  createPusherChannel = (loggedUser, dispatch) => {
    if (loggedUser && loggedUser.id && !initialized) {
      const channel = pusher.subscribe(loggedUser.id);
      initialized = true;

      channel.bind('message', (data) => {
        const payload = {
          text: data.text,
          authorId: data.authorId,
          conversationId: data.conversationId,
          date: new Date(Date.now()),
        };
        dispatch(attemptUpdateMessage(payload));
      });

      channel.bind('notifyStatus', (data) => {
        const payload = {
          status: data.status,
        };
        dispatch(attemptDisplayToast(payload));
      });
    }
  }

  authorizePayment = (loggedUserId, offeredUserId, offerId) => {
    if (loggedUserId && authorizationChannel && offeredUserId) {
      authorizationChannel.trigger('authorize', {
        fromId: loggedUserId,
        toId: offeredUserId,
        offerId,
      })
    }
  }

  cancelPaymentAuthorization = (loggedUserId, offeredUserId, offerId) => {
    if (loggedUserId && authorizationChannel && offeredUserId) {
      authorizationChannel.trigger('cancel', {
        fromId: loggedUserId,
        toId: offeredUserId,
        offerId,
      })
    }
  }

  pusherDisconnect = () => {
    pusher.disconnect();
  }
}
