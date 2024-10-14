import { combineReducers } from 'redux';
import reduserTab from './reduserTab';
import reduserCheckBox from './reduserCheckBox';

const rootRedusers = combineReducers({
  tab: reduserTab,
  checkBox: reduserCheckBox,
});
export default rootRedusers;
