import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Agreement from '../containers/lead/Agreement';
import PersonalInfo from '../containers/lead/PersonalInfo';
import LoanInfo from '../containers/lead/LoanInfo';
import AdditionalInfo from '../containers/lead/AdditionalInfo';
import LeadStep from './lead/LeadStep';
import Test from './test/Test';
import ProductInfo from './ProductInfo';
import BorrowStatus from './BorrowStatus';
import Login from './Login';

class Main extends React.Component {
  // static propTypes = {
  //   width: PropTypes.number,
  // };

  // static defaultProps = {
  //   width: 1000,
  // };

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
              <Route path="/additional-info" component={AdditionalInfo} />
              <Route path="/test" component={Test} />
              <Route path="/loan-info" component={LoanInfo} />
              <Route path="/personal-info" component={PersonalInfo} />
              <Route path="/borrow-request" component={Agreement} />

              <Route path="/product-info" component={ProductInfo} />
              <Route path="/borrow-status" component={BorrowStatus} />
              <Route path="/" component={Login} />
            </Switch>
          </div>
        </div>
      </Router>);
  }
}

export default Main;
