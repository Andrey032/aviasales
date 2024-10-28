import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import Logo from '../Logo/index';
import Main from '../Main/index';

import { getSearchId } from '../../services/fetchServices';
import { isError, errorMessage, loadAllTickets } from '../../features/tickets/ticketsSlice';

import styleApp from './App.module.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const errorVisible = useAppSelector(isError);
  const errorMassege = useAppSelector(errorMessage);

  useEffect(() => {
    const searchId = localStorage.getItem('searchId');
    if (searchId === null) {
      getSearchId().then((id) => localStorage.setItem('searchId', id));
    } else {
      dispatch(loadAllTickets(searchId));
    }
  }, [dispatch]);

  return (
    <div className={styleApp.app}>
      <Logo />
      {errorVisible && <h4>{errorMassege}</h4>}
      {!errorVisible && <Main />}
    </div>
  );
};
export default App;
