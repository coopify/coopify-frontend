import ReduxServer from '@pawjs/redux/server';
import createSagaMiddleware from 'redux-saga';
import { user, InitialState } from './reducers';
import rootSaga from './sagas';


export default class Server {
  constructor({ addPlugin }) {
    this.sagaMiddleware = createSagaMiddleware();
    const reduxServer = new ReduxServer({ addPlugin });
    reduxServer.setReducers(user);
    reduxServer.addMiddleware(this.sagaMiddleware);
    addPlugin(reduxServer);
  }

  apply(serverHandler) {
    serverHandler
      .hooks
      .reduxInitialState
      .tapPromise('AppInitialState', async ({ getInitialState, setInitialState }) => {
        const initialState = Object.assign({}, getInitialState(), InitialState);
        setInitialState(initialState);
      });

    serverHandler
      .hooks
      .beforeAppRender
      .tapPromise('RunSagaMiddleware', async () => this.sagaMiddleware.run(rootSaga));
    serverHandler
      .hooks
      .beforeAppRender
      .tapPromise('AddReduxProvider', async () => (console.log('Server')));
  }
}
