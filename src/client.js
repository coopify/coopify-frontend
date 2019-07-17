// Bulma CSS for light weight CSS. One can any css framework
import ReduxClient from '@pawjs/redux/client';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import { AppReducers } from './reducers';
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
import './resources/css/general-styles.css';
import 'react-id-swiper/src/styles/css/swiper.css';
import './resources/css/footer-with-button-logo.css';
import './resources/css/image-overlay-fade.css';
import './resources/css/components-styles.css';
import './resources/css/chat-list.css';
import './resources/css/cardCoopify.css';

const appInitialState = {};

global.API_URL = 'https://coopify-dev-backend.herokuapp.com';
global.URL = 'https://coopify-dev-frontend.herokuapp.com';
// global.API_URL = 'http://localhost:3001' //TODO: CHANGE WHEN DEPLOYING TO DEV OR STAGE MAYBE A SWITCH AND HAVING MULTIPLE CONFIGS?
// global.FB_APP_ID = '2028070477261180' //Local
global.FB_APP_ID = 323887408477346; // Production
global.GOOGLE_APP_ID = '157449480210-9sr3ar7e5q2lm7emifvegj0r9ohr3vm6.apps.googleusercontent.com';
// global.GOOGLE_APP_ID = '157449480210-dd88viejmm5ce2ia29j0cqpaul1ml5j4.apps.googleusercontent.com'
global.PUSHER_APP_KEY = '854192fae3c55354146c';
global.PUSHER_APP_CLUSTER = 'us2';

export default class Client {
  constructor({ addPlugin }) {
    const reduxClient = new ReduxClient({ addPlugin });
    reduxClient.setReducers(AppReducers);
    this.sagaMiddleware = createSagaMiddleware();
    reduxClient.addMiddleware(this.sagaMiddleware);
    addPlugin(reduxClient);
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
