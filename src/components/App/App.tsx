import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import Logo from '../Logo/index';
import Main from '../Main/index';

import { loadAllTickets, loadSearchId, searchIdSelect } from '../../features/tickets/ticketsSlice';

import styleApp from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
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
      <Main />
    </div>
  );
};
export default App;
