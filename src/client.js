// Bulma CSS for light weight CSS. One can any css framework
import ReduxClient from '@pawjs/redux/client';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import { user } from './reducers';
import 'bulma/css/bulma.min.css';
import './resources/css/util.scss';
import './resources/css/global.css';
import './resources/css/form-elements.css';
import './resources/css/material_icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import 'font-awesome/css/font-awesome.min.css';
import './resources/css/stepZilla.css';
import 'rc-slider/assets/index.css';
import 'react-chat-elements/dist/main.css';
import './resources/css/style.css';

const appInitialState = {};

global.API_URL = 'https://coopify-dev-backend.herokuapp.com'
//global.API_URL = 'http://localhost:3001' //TODO: CHANGE WHEN DEPLOYING TO DEV OR STAGE MAYBE A SWITCH AND HAVING MULTIPLE CONFIGS?
global.FB_APP_ID = '323887408477346'
global.GOOGLE_APP_ID = '157449480210-9sr3ar7e5q2lm7emifvegj0r9ohr3vm6.apps.googleusercontent.com'
//global.GOOGLE_APP_ID = '157449480210-dd88viejmm5ce2ia29j0cqpaul1ml5j4.apps.googleusercontent.com'
global.PUSHER_APP_KEY = '854192fae3c55354146c'
gloabal.PUSHER_APP_CLUSTER = 'us2'

export default class Client {
  constructor({ addPlugin }) {
    const reduxClient = new ReduxClient({ addPlugin });
    reduxClient.setReducers(user);
    this.sagaMiddleware = createSagaMiddleware();
    reduxClient.addMiddleware(this.sagaMiddleware);
    addPlugin(reduxClient);
  }

  trackPageView() {
    const { ga } = window;
    if (typeof ga !== 'undefined' && ga) {
      ga('send', {
        hitType: 'pageview',
        page: window.location.pathname,
      });
    }
  }

  apply(clientHandler) {
    clientHandler
      .hooks
      .reduxInitialState
      .tapPromise('ReduxInitialState', async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), appInitialState);
        setInitialState(initialState);
      });

    clientHandler
      .hooks
      .beforeRender
      .tapPromise('RunSagaMiddleware', async () => this.sagaMiddleware.run(mySaga));

    clientHandler
      .hooks
      .beforeRender
      .tapPromise('AddReduxProvider', async () => (console.log('Client')));
  }
}

