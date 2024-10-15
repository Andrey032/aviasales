import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import 'normalize.css';
import './index.scss';
import { Provider } from 'react-redux';
import store from './redux';

const root = createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
