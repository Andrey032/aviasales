import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

import Logo from '../Logo/index';
import Main from '../Main/index';

import { getSearchId, getTickets } from '../../services/fetchServices';
import { isError, errorMessage } from '../../redux/tickets/ticketsSlice';

import styleApp from './App.module.scss';

function App() {
  const dispatch = useAppDispatch();
  const errorVisible = useAppSelector(isError);
  const errorMassege = useAppSelector(errorMessage);

  useEffect(() => {
    const searchId = localStorage.getItem('searchId');
    if (searchId === null) {
      getSearchId().then((id) => localStorage.setItem('searchId', id));
    }
    if (searchId) {
      dispatch(getTickets(searchId));
    }
  }, [dispatch]);

  return (
    <div className={styleApp.app}>
      <Logo />
      {errorVisible && <h4>{errorMassege}</h4>}
      {!errorVisible && <Main />}
    </div>
  );
}
export default App;
