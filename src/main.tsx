import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'normalize.css';
import App from './components/App/App';
import './index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
