import { failureTickets, requestTicket, successTickets } from '../redux/tickets/ticketsSlice';
import { URL } from '../utils/constants';

// получаем searchId
export const getSearchId = async () => {
  const response = await fetch(`${URL}search`);
  const searchId = await response.json();
  return searchId.searchId;
};

// thunk получаем билеты
export const getTickets = (searchId) => (dispatch) => {
  dispatch(requestTicket());
  fetch(`${URL}tickets?searchId=${searchId}`)
    .then((response) => {
      if (!response.ok) throw new Error('Ошибка сервера');
      return response.json();
    })
    .then(({ tickets }) => dispatch(successTickets(tickets)))
    .catch((err) => dispatch(failureTickets(err)));
};
