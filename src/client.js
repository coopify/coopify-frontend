// Bulma CSS for light weight CSS. One can any css framework
import ReduxClient from '@pawjs/redux/client';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import { user } from './reducers';
import 'bulma/css/bulma.min.css';
import './resources/css/util.scss';
import './resources/css/global.css'; 

const appInitialState = {};

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

