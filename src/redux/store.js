import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootRedusers from './rootRedusers';
// import { loadState, saveState } from '../utils/local-storage';
import { thunk } from 'redux-thunk';
// const persistedState = loadState();

const store = createStore(
  rootRedusers,
  // persistedState,
  composeWithDevTools(applyMiddleware(thunk))
);

// store.subscribe(() => saveState(store.getState()));

export default store;
