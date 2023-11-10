import React from 'react';
import Rollbar from 'rollbar';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import App from './App';

import './index.scss';

const rollbarConfig = {
  accessToken: 'c924523187754829a4d2eb0ba9b392d4',
  environment: process.env.NODE_ENV,
};
const rollbar = new Rollbar(rollbarConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RollbarProvider config={rollbar}>
      <ErrorBoundary>
    <Router>
      <App />
    </Router>
    </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);

