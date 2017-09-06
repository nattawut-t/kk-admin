import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Home from './Home';

const App = () =>
  <Router>
    <MuiThemeProvider>
      <div>
        <AppBar
          title="Money Table Work"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <main>
          <div className="main-content">
            <Switch>
              <Route path="/" component={Home} />
            </Switch>
          </div>
        </main>
      </div>
    </MuiThemeProvider>
  </Router>;

export default App;
