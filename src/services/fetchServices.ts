/* eslint-disable no-undef */
import requestTicketAction from '../redux/tickets/requestTicketAction';
import successTicketsAction from '../redux/tickets/successTicketsAction';
import failureTicketsAction from '../redux/tickets/failureTicketsAction';
import { URL } from '../utils/constants';

// получаем searchId
export const getSearchId = async () => {
  const response = await fetch(`${URL}search`);
  const searchId = await response.json();
  return searchId.searchId;
};

// thunk получаем билеты
export const getTickets = (searchId) => (dispatch) => {
  dispatch(requestTicketAction());
  fetch(`${URL}tickets?searchId=${searchId}`)
    .then((response) => {
      if (!response.ok) throw new Error('Ошибка сервера');
      return response.json();
    })
    .then(({ tickets }) => dispatch(successTicketsAction(tickets)))
    .catch((err) => dispatch(failureTicketsAction(err)));
};
