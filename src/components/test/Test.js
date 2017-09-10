import React from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';

const Test = () =>
  <form onSubmit={e => {
    e.preventDefault();
    const url = 'http://dev-portal.moneytable.com/api/work/leads';
    return axios({
      url,
      method: 'POST',
      data: {},
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }}
  >
    <div>Test</div>
    <button type="submit" value="submit" />
  </form>;

// Test.propTypes = {
//   save: PropTypes.func.isRequired,
// };

export default Test;
