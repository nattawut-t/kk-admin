import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

const Landing = ({ history }) =>
  <div>
    <br /><br /><br />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <span>Landing Component</span>
    </div>
    <br />
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <input
        type="button"
        value="Go to Login"
        onClick={() => history.push('/login')}
      />
    </div>
  </div >;

Landing.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Landing);
