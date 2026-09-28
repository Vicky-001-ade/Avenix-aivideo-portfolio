import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Guard against injected browser wallet extensions (e.g., MetaMask inpage.js) throwing inside sandboxed iframes
if (typeof window !== 'undefined') {
  const suppressExtensionNoise = (event: ErrorEvent | PromiseRejectionEvent) => {
    const raw =
      'reason' in event
        ? `${event.reason?.message || event.reason || ''} ${event.reason?.stack || ''}`
        : `${event.message || ''} ${event.filename || ''} ${event.error?.stack || ''}`;
    if (/metamask|inpage\.js|chrome-extension:\/\/|moz-extension:\/\//i.test(raw)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };
  window.addEventListener('error', suppressExtensionNoise, true);
  window.addEventListener('unhandledrejection', suppressExtensionNoise, true);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
