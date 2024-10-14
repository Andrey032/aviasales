import { legacy_createStore as createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';
import rootRedusers from './redusers/index';
const store = createStore(rootRedusers, devToolsEnhancer());

export default store;
