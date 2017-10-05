import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LeadStep from './lead/LeadStep';
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

const Main = ({ children }) =>
  <div className="main-contain">
    <StepContainer>
      <LeadStep />
    </StepContainer>
    <Containers>
      {children}
    </Containers>
  </div>;

Main.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Main;
