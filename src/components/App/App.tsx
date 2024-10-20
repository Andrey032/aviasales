import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../Logo/index';
import Main from '../Main/index';

import { getSearchId, getTickets } from '../../services/fetchServices';

import styleApp from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const errorVisible = useSelector((state) => state.tickets.isError);
  const errorMassege = useSelector((state) => state.tickets.error.message);

  useEffect(() => {
    console.log('effect');
    const searchId = localStorage.getItem('searchId');
    if (searchId === null) {
      console.log('searchId');
      getSearchId().then((id) => localStorage.setItem('searchId', id));
    }
    if (searchId) {
      console.log('tickets');
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
