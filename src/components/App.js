import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import PersonalInfo from './lead/PersonalInfo';
import LeadStep from './lead/LeadStep';
import LoanInfo from './lead/LoanInfo';

const App = () =>
  <Router>
    <MuiThemeProvider>
      <div>
        <AppBar
          title=""
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <main>
          <div className="container">
            <div className="row">
              <div className="col-3">
                <Drawer open width={250}>
                  <AppBar
                    title="MoneyTable"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                  />
                  <LeadStep />
                </Drawer>
              </div>
              <div className="col-9">
                <Switch>
                  <Route path="/loan-info" component={LoanInfo} />
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
