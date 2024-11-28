import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import Logo from '../Logo/index';
import Main from '../Main/index';
import Error from '../Error/Error';

import {
  isErrorSelect,
  loadAllTickets,
  loadSearchId,
  searchIdSelect,
} from '../../features/tickets/ticketsSlice';

import styleApp from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchId = useAppSelector(searchIdSelect);
  const isError = useAppSelector(isErrorSelect);

  useEffect(() => {
    dispatch(loadSearchId());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      dispatch(loadAllTickets());
    }
  }, [dispatch, searchId]);
  console.log(searchId);

  return (
    <div className={styleApp.app}>
      <Logo />
      {isError && <Error />}
      {!isError && <Main />}
    </div>
  );
};
export default App;
