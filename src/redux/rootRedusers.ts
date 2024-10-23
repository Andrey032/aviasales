import { combineReducers } from 'redux';
import reduserTab from './tab/tabsSlice';
import reduserCheckBox from './checkBox/checkBoxsSlice';
import reducerTickets from './tickets/ticketsSlice';

const rootRedusers = combineReducers({
  tab: reduserTab,
  checkBox: reduserCheckBox,
  tickets: reducerTickets,
});
export default rootRedusers;
