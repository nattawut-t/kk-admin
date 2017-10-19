import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Icon } from 'react-fa';

import DatePicker from 'material-ui/DatePicker';

import areIntlLocalesSupported from 'intl-locales-supported';
import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/th-TH';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['th', 'th-TH'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

const Criteria = ({ search, loading, handleChange, handleDateChange }) =>
  <div>
    <div className="col-6">
      <input
        id="firstName"
        name="firstName"
        className="form-control"
        min="0"
        maxLength="50"
        placeholder="First name"
        onChange={({ target: { name, value } }) => handleChange(name, value)}
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
        onChange={({ target: { name, value } }) => handleChange(name, value)}
      />
    </div>
    <div className="col-6">
      <DatePicker
        id="reqDateStart"
        name="reqDateStart"
        mode="landscape"
        floatingLabelText="From"
        onChange={(e, value) => handleDateChange('reqDateStart', value)}
        fullWidth
        autoOk
        DateTimeFormat={DateTimeFormat}
        locale="th-TH"
      />
    </div>
    <div className="col-6">
      <DatePicker
        id="reqDateStop"
        name="reqDateStop"
        mode="landscape"
        floatingLabelText="To"
        onChange={(e, value) => handleDateChange('reqDateStop', value)}
        fullWidth
        autoOk
        DateTimeFormat={DateTimeFormat}
        locale="th-TH"
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
  handleDateChange: PropTypes.func.isRequired,
};

Criteria.defaultProps = {
  loading: false,
};

export default Criteria;
