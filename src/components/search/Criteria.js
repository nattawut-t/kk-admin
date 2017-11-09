import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Icon } from 'react-fa';

import DatePicker from 'material-ui/DatePicker';

import areIntlLocalesSupported from 'intl-locales-supported';
import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/th-TH';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['th', 'th-TH'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
}

const channelConfig = [
  { key: 'ittp', value: 'ITTP' },
  { key: 'kiatnakin', value: 'Kiatnakin' },
];

class Criteria extends Component {

  state = {
    reqDateStart: null,
    reqDateStop: null,
    submitTo: [],
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      const { handleChange } = this.props;
      handleChange(name, value);
    });
  };

  handleDateChange = (name, value) => {
    this.setState({ [name]: value }, () => {
      const { handleDateChange } = this.props;
      handleDateChange(name, value);
    });
  };

  // handleChannelChange = (event, index, values) => {
  //   console.log(values);
  //   this.setState({ channels: values }, () => {
  //     const { handleChange } = this.props;
  //     handleChange(name, values);
  //   });
  // };

  render() {
    const { reqDateStart, reqDateStop, submitTo } = this.state;
    const { search, loading } = this.props;

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
            onChange={({ target: { name, value } }) => this.handleChange(name, value)}
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
            onChange={({ target: { name, value } }) => this.handleChange(name, value)}
          />
        </div>
        <div className="col-3" style={{ display: 'flex' }}>
          <DatePicker
            id="reqDateStart"
            name="reqDateStart"
            mode="landscape"
            floatingLabelText="ขอกู้ตั้งแต่วันที่"
            value={reqDateStart}
            onChange={(e, value) => this.handleDateChange('reqDateStart', value)}
            autoOk
            DateTimeFormat={DateTimeFormat}
            locale="th-TH"
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
              this.handleDateChange('reqDateStart', null);
            }}
          />
        </div>
        <div className="col-3" style={{ display: 'flex' }}>
          <DatePicker
            id="reqDateStop"
            name="reqDateStop"
            mode="landscape"
            floatingLabelText="ขอกู้ถึงวันที่"
            value={reqDateStop}
            onChange={(e, value) => this.handleDateChange('reqDateStop', value)}
            autoOk
            DateTimeFormat={DateTimeFormat}
            locale="th-TH"
          />
          <i
            className="fa fa-times"
            aria-hidden="true"
            style={{
              position: 'relative',
              top: '40px',
              cursor: 'pointer',
            }}
            onClick={() => this.handleDateChange('reqDateStop', null)}
          />
        </div>
        <div className="col-6" style={{ display: 'flex' }}>
          <div style={{ width: '100%', paddingTop: '23px' }}>
            <SelectField
              multiple
              hintText="ช่องทางการกู้"
              fullWidth
              value={submitTo}
              onChange={(event, index, values) => this.handleChange('submitTo', values)}
            >
              {channelConfig.map(({ key, value }) => (
                <MenuItem
                  key={key}
                  insetChildren
                  value={key}
                  primaryText={value}
                  checked={submitTo && submitTo.indexOf(key) > -1}
                  style={{
                    height: '50px',
                  }}
                />
              ))}
            </SelectField>
          </div>
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
  }
}

// ({ search, loading, handleChange, handleDateChange }) => {
//   let fromInput;
//   let toInput;

// };

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
