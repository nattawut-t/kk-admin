import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

const Test1 = ({ data }) =>
  <form onSubmit={e => {
    e.preventDefault();
  }}
  >
    <div>{data}</div>
    <button type="submit" value="submit">Test1</button>
  </form>;

Test1.propTypes = {
  data: PropTypes.string,
  // location: PropTypes.object.isRequired,
};

Test1.defaultProps = {
  data: '',
};

export default withRouter(Test1);
