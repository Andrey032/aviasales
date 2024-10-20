import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import 'normalize.css';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
