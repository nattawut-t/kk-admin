import React from 'react';
import PropTypes from 'prop-types';

const Test = ({ save }) =>
  <form onSubmit={e => {
    e.preventDefault();
    save();
  }}
  >
    <div>Test</div>
    <button type="submit" value="submit" />
  </form>;

Test.propTypes = {
  save: PropTypes.func.isRequired,
};

export default Test;
