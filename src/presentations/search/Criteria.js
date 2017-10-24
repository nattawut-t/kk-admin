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

const Criteria = ({ search, loading, handleChange, handleDateChange }) => {
  let fromInput;
  let toInput;
  return (
    <div>
      <div className="col-6">
        <input
          id="firstName"
          name="firstName"
          className="form-control"
          min="0"
          maxLength="50"
          placeholder="ชื่อ (TH)"
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
          placeholder="หมายเลขบัตรประชาชน"
          onChange={({ target: { name, value } }) => handleChange(name, value)}
        />
      </div>
      <div className="col-6" style={{ display: 'flex' }}>
        <DatePicker
          id="reqDateStart"
          name="reqDateStart"
          mode="landscape"
          floatingLabelText="ขอกู้ตั้งแต่วันที่"
          onChange={(e, value) => handleDateChange('reqDateStart', value)}
          autoOk
          DateTimeFormat={DateTimeFormat}
          locale="th-TH"
          ref={node => {
            if (node) {
              fromInput = node.refs.input.input;
            }
          }}
        />
        <i
          className="fa fa-times"
          aria-hidden="true"
          style={{
            position: 'relative',
            top: '40px',
            cursor: 'pointer',
          }}
          onClick={() => {
            handleDateChange('reqDateStart', null);
            if (fromInput) {
              fromInput.value = null;
            }
          }}
        />
      </div>
      <div className="col-6" style={{ display: 'flex' }}>
        <DatePicker
          id="reqDateStop"
          name="reqDateStop"
          mode="landscape"
          floatingLabelText="ขอกู้ถึงวันที่"
          onChange={(e, value) => handleDateChange('reqDateStop', value)}
          autoOk
          DateTimeFormat={DateTimeFormat}
          locale="th-TH"
          ref={node => {
            if (node) {
              toInput = node.refs.input.input;
            }
          }}
        />
        <i
          className="fa fa-times"
          aria-hidden="true"
          style={{
            position: 'relative',
            top: '40px',
            cursor: 'pointer',
          }}
          onClick={() => {
            handleDateChange('reqDateStop', null);
            if (toInput) {
              toInput.value = '';
            }
          }}
        />
      </div>
      <div className="col-12">&nbsp;</div>
      <div className="col-12 text-right">
        <Button
          color="primary"
          disabled={loading}
          onClick={() => search()}
        >
          <Icon name="refresh" />&nbsp;&nbsp;ค้นหา
        </Button>
        {/* &nbsp;
        <Button color="secondary">
          <Icon name="close" />&nbsp;&nbsp;Cancel
        </Button> */}
      </div>
    </div>
  );
};

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