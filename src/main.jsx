import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';
import { ModeProvider } from './contexts/modecontext';
import { HashRouter } from 'react-router-dom';
import { ProfileProvider } from './contexts/profilecontext';
import './css/index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider>
      <ProfileProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ProfileProvider>
    </ModeProvider>
  </StrictMode>
);

