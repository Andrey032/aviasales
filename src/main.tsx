import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import App from './components/App/App';
import './index.scss';
import { Provider } from 'react-redux';
import store from './redux';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
