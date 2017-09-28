import React from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import Agreement from '../containers/lead/Agreement';
import PersonalInfo from '../containers/lead/PersonalInfo';
import LoanInfo from '../containers/lead/LoanInfo';
import AdditionalInfo from '../containers/lead/AdditionalInfo';
import Summary from '../containers/lead/Summary';
import LeadStep from './lead/LeadStep';
import Test from './test/Test';
import Containers from './shared/Containers';

const StepContainer = styled.div`
  float: none; 
  margin: 0 auto;
  background-color: #f0f0f0;
  padding: 0 64px;
  @media screen and (max-width: 1170px){
      padding: 0 15px;
  }
`;

class Main extends React.Component {

  state = {
    open: false,
  };

  render() {
    return (
      <Router>
        <div className="main-contain">
          <StepContainer>
            <LeadStep />
          </StepContainer>
          <Containers>
            <Switch>
              <Route path="/summary" component={Summary} />
              <Route path="/additional-info" component={AdditionalInfo} />
              <Route path="/test" component={Test} />
              <Route path="/loan-info" component={LoanInfo} />
              <Route path="/personal-info" component={PersonalInfo} />
              <Route path="/borrow-request" component={Agreement} />
            </Switch>
          </Containers>
        </div>
      </Router>);
  }
}

export default Main;
