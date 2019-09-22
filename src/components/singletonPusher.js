
// Bulma CSS for light weight CSS. One can any css framework
import Pusher from 'pusher-js';
import { attemptUpdateMessage, attemptDisplayToast } from '../actions/user';

let instance = null;
let pusher = null;
let initialized = false;

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

  pusherDisconnect = () => {
    pusher.disconnect();
    initialized = false;
  }
}
