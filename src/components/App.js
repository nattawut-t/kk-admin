import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import PersonalInfo from './lead/PersonalInfo';
import LeadStep from './lead/LeadStep';

const App = () =>
  <Router>
    <MuiThemeProvider>
      <div>
        <AppBar
          title=""
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <main>
          <div className="main-content">
            <div className="row">
              <div className="col-4">
                <Drawer open>
                  <AppBar
                    title="MoneyTable"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                  />
                  <LeadStep />
                </Drawer>
              </div>
              <div className="col-8">
                Test
                <Switch>
                  <Route path="/" component={PersonalInfo} />
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MuiThemeProvider>
  </Router>;

export default App;
