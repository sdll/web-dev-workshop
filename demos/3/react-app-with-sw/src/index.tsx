import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withTracker } from './components/withTracker';
import config from './config';
import Moodie from './containers/Moodie';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from './services/Auth';
import NotFound from './pages/NotFound';
import { FavoritesContextProvider } from './services/Favorites';

const storageType = config.constants.STORAGE_TYPE;

if (storageType === 'local') {
  const localforage = require('localforage');
  localforage.config(config.defaults.defaultLocalforageConfig);
}

Sentry.init({ dsn: config.constants.SENTRY_DOMAIN });

const auth0Domain = config.constants.AUTH0_DOMAIN;
const auth0ClientId = config.constants.AUTH0_CLIENT_ID;
const auth0Audience = config.constants.AUTH0_AUDIENCE;
const auth0RedirectUri = window.location.origin;

if (
  auth0Domain === undefined ||
  auth0ClientId === undefined ||
  auth0Audience === undefined
) {
  throw new Error('missing env vars');
}

const TrackedMoodie = withTracker(Moodie);
const App: React.FC = () => (
  <Router>
    <Auth0Provider
      domain={auth0Domain}
      client_id={auth0ClientId}
      redirect_uri={auth0RedirectUri}
      audience={auth0Audience}
    >
      <FavoritesContextProvider>
        <Switch>
          <Route path="/:searchQuery" exact component={TrackedMoodie} />
          <Route path="/" exact component={TrackedMoodie} />
          <Route component={NotFound} />
        </Switch>
      </FavoritesContextProvider>
    </Auth0Provider>
  </Router>
);

const rootElement = document.getElementById('root');

if (rootElement!.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
  serviceWorker.register();
} else {
  ReactDOM.render(<App />, rootElement);
}
