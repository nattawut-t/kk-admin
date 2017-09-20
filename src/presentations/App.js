import React from 'react';
import { withRouter } from 'react-router';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  // Link,
  // Redirect,
} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Login from './Login';

const App = () =>
  <Router>
    <MuiThemeProvider>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="*" exact component={Login} />
      </Switch>
    </MuiThemeProvider>
  </Router>;


export default withRouter(App);
