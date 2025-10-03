import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { ModeProvider } from './contexts/ModeContext';
import { HashRouter } from 'react-router-dom';
import { ProfilesProvider } from './contexts/ProfilesContext';
import './css/index.css';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModeProvider>
      <ProfilesProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ProfilesProvider>
    </ModeProvider>
  </StrictMode>
);

