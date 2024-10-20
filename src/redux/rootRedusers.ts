import { combineReducers } from 'redux';
import reduserTab from './tab/reduserTab';
import reduserCheckBox from './checkBox/reduserCheckBox';
import reducerTickets from './tickets/reducerTickets';

const rootRedusers = combineReducers({
  tab: reduserTab,
  checkBox: reduserCheckBox,
  tickets: reducerTickets,
});
export default rootRedusers;
