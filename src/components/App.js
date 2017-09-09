import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

import Agreement from '../containers/lead/Agreement';
import PersonalInfo from '../containers/lead/PersonalInfo';
import LoanInfo from '../containers/lead/LoanInfo';
import AdditionalInfo from '../containers/lead/AdditionalInfo';
import LeadStep from './lead/LeadStep';
import Test from './test/Test';

const App = () =>
  <Router>
    <MuiThemeProvider>
      <div>
        <AppBar
          title=""
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <main>
          <div className="row">
            <div className="col-3">
              <Drawer open width={250}>
                <AppBar
                  title="MoneyTable"
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
              </Drawer>
            </div>
            <div className="col-9" style={{ paddingTop: '25px' }}>
              <div style={{ float: 'none', margin: '0 auto' }}>
                <LeadStep />
              </div>
              <div className="container">
                <Switch>
                  <Route path="/additional-info" component={AdditionalInfo} />
                  <Route path="/test" component={Test} />
                  <Route path="/loan-info" component={LoanInfo} />
                  <Route path="/personal-info" component={PersonalInfo} />
                  <Route path="/" component={Agreement} />
                </Switch>
              </div>
            </div>
          </div>
        </main>
      </div>
    </MuiThemeProvider>
  </Router>;

export default App;
