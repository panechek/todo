import React from 'react';
import Rollbar from 'rollbar';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import { Provider } from 'react-redux';
import App from './App';

import { store } from './redux/store';

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
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>
);

