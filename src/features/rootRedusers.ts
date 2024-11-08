import { combineReducers } from 'redux';
// import reduserCheckBox from './checkBox/checkBoxsSlice';
import reducerTickets from './tickets/ticketsSlice';

const rootRedusers = combineReducers({
  // checkBox: reduserCheckBox,
  tickets: reducerTickets,
});
export default rootRedusers;
