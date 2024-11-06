import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import Logo from '../Logo/index';
import Main from '../Main/index';

import {
  isError,
  errorMessage,
  loadAllTickets,
  stopStatus,
  loadSearchId,
  searchIdSelect,
} from '../../features/tickets/ticketsSlice';

import styleApp from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const errorVisible = useAppSelector(isError);
  const errorMassege = useAppSelector(errorMessage);
  const stopFetch = useAppSelector(stopStatus);
  const searchId = useAppSelector(searchIdSelect);

  useEffect(() => {
    dispatch(loadSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId && !stopFetch) {
      dispatch(loadAllTickets());
    }
  }, [dispatch, searchId, stopFetch]);

  return (
    <div className={styleApp.app}>
      <Logo />
      {errorVisible && errorMassege}
      <Main />
    </div>
  );
};
export default App;
