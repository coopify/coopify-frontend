
// Bulma CSS for light weight CSS. One can any css framework
import ReduxClient from '@pawjs/redux/client';
import createSagaMiddleware from 'redux-saga';
import mySaga from '../sagas';
import Pusher from 'pusher-js';
import {attemptUpdateMessage} from '../actions/user';

let instance =  null;
let pusher = null;

export default class SingletonPusher {

    constructor()
    {
        this.initializePusher = this.initializePusher.bind(this);

        this.initializePusher();
    }

   static getInstance() {
        if (!instance) {
            instance = new SingletonPusher();
        }

        return instance;
    }


    initializePusher(){
    const pusherAppKey = global.PUSHER_APP_KEY;
    const pusherCluster = global.PUSHER_APP_CLUSTER;

    pusher = new Pusher(pusherAppKey, {
      cluster: pusherCluster
    });
  }

  createPusherChannel(loggedUser, dispatch) {

    if(loggedUser && loggedUser.id){
      console.log("CreatePusherCHANNEL");
    let channel = pusher.subscribe(loggedUser.id);
  
    channel.bind('message', function(data) {   
        const payload =
        {
          text: data.text,
          authorId: data.authorId,
          conversationId: data.conversationId,    
        };
        dispatch(attemptUpdateMessage(payload));
    });
  }
  }
}

