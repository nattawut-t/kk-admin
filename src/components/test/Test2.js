import React from 'react';
import PropTypes from 'prop-types';

const Test2 = ({ id }) => <div>{id}</div>;
Test2.propTypes = ({ id: PropTypes.string.isRequired });
export default Test2;
