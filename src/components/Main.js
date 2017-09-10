import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Agreement from '../containers/lead/Agreement';
import PersonalInfo from '../containers/lead/PersonalInfo';
import LoanInfo from '../containers/lead/LoanInfo';
import AdditionalInfo from '../containers/lead/AdditionalInfo';
import Summary from '../containers/lead/Summary';
import LeadStep from './lead/LeadStep';
import Test from './test/Test';

class Main extends React.Component {

  state = {
    open: false,
  };

  render() {
    return (
      <Router>
        <div className="col-12">
          <div style={{ float: 'none', margin: '0 auto' }}>
            <LeadStep />
          </div>
          <div className="container">
            <Switch>
              <Route path="/summary" component={Summary} />
              <Route path="/additional-info" component={AdditionalInfo} />
              <Route path="/test" component={Test} />
              <Route path="/loan-info" component={LoanInfo} />
              <Route path="/personal-info" component={PersonalInfo} />
              <Route path="/borrow-request" component={Agreement} />
            </Switch>
          </div>
        </div>
      </Router>);
  }
}

export default Main;
