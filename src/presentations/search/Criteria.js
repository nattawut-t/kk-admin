import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Icon } from 'react-fa';

const Criteria = ({ search, loading, handleChange }) =>
  <div>
    <div className="col-6">
      <input
        id="firstName"
        name="firstName"
        className="form-control"
        min="0"
        maxLength="50"
        placeholder="First name"
        onChange={handleChange}
      />
    </div>
    <div className="col-6">
      <input
        id="idcard"
        name="idcard"
        className="form-control"
        min="0"
        maxLength="50"
        placeholder="Identity"
        onChange={handleChange}
      />
    </div>
    <div className="col-12">&nbsp;</div>
    <div className="col-12 text-right">
      <Button
        color="primary"
        disabled={loading}
        onClick={() => search()}
      >
        <Icon name="refresh" />&nbsp;&nbsp;Search
      </Button>
      &nbsp;
      <Button
        color="secondary"
      >
        <Icon name="close" />&nbsp;&nbsp;Cancel
      </Button>
    </div>
  </div>;

Criteria.propTypes = {
  loading: PropTypes.bool,
  search: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

Criteria.defaultProps = {
  loading: false,
};

export default Criteria;
