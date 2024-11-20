import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import Logo from '../Logo/index';
import Main from '../Main/index';

import {
  isErrorSelect,
  loadAllTickets,
  loadSearchId,
  searchIdSelect,
} from '../../features/tickets/ticketsSlice';

import styleApp from './App.module.scss';
import Error from '../Error/Error';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isError = useAppSelector(isErrorSelect);
  const searchId = useAppSelector(searchIdSelect);

  useEffect(() => {
    dispatch(loadSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      dispatch(loadAllTickets());
    }
  }, [dispatch, searchId]);

  return (
    <div className={styleApp.app}>
      <Logo />
      {isError && <Error />}
      {!isError && <Main />}
    </div>
  );
};
export default App;
