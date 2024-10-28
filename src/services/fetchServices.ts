import { URL } from '../utils/constants';

// получаем searchId
export const getSearchId = async () => {
  const response = await fetch(`${URL}search`);
  const searchId = await response.json();
  return searchId.searchId;
};
