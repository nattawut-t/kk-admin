import Offline from 'offline-plugin/runtime';
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { store } from './store';
import App from './containers/App';

import './styles/site.scss';
import './styles/loader.scss';

injectTapEventPlugin();

if (process.env.NODE_ENV === 'prod') {
  Offline.install();
}

export const Root = () =>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>;

if (!module.hot) {
  render(<Root />, document.querySelector('react'));
}
