import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { adminUrl, getJson } from '../../libs/request';

class Location extends Component {

  constructor(props) {
    super(props);

    this.state = {
      provinceValue: '',
      amphurValue: '',
      tambolValue: '',
      provinceList: [],
      amphurList: [],
      tambolList: [],
    };
  }

  componentWillMount() {
    const url = adminUrl('/location/province');
    const { provinceValue, amphurValue, tambolValue } = this.props;
    this.setState({ provinceValue, amphurValue, tambolValue });

    getJson(url)
      .then(response => {
        const { data: { PROVINCE } } = response;
        const dataList = PROVINCE || [];

        this.setState({
          provinceDataList: dataList,
          provinceList: this.createItems(dataList, 'PROVINCE_ID', 'PROVINCE_NAME'),
        });
      })
      .then(() => {
        if (provinceValue) {
          this.loadAmphurs(provinceValue);

          // const {
          //   handleChange,
          //   provinceValueField,
          //   provinceNameField,
          // } = this.props;

          // const { provinceDataList } = this.state;

          // if (handleChange && provinceDataList && provinceDataList.length > 0) {
          //   const { PROVINCE_NAME } = provinceDataList
          //     .find(({ PROVINCE_ID }) => PROVINCE_ID === provinceValue);

          //   handleChange(provinceValueField, provinceNameField, provinceValue, PROVINCE_NAME);
          // }
        }
      })
      .then(() => {
        if (amphurValue) {
          this.loadTambols(provinceValue, amphurValue);
        }
      })
      .catch(error => console.log('>>>>> error: ', error));
  }

  componentDidMount() {
  }

  initialize() {
    this.setState({
      provinceValue: '',
      amphurValue: '',
      tambolValue: '',
    });
  }

  loadAmphurs = provinceCode => {
    const url = adminUrl(`/location/city/${provinceCode}`);

    getJson(url)
      .then(response => {
        const { data: { CITY } } = response;
        const dataList = CITY || [];

        this.setState({
          amphurDataList: dataList,
          amphurList: this.createItems(dataList, 'CITY_ID', 'CITY_NAME'),
        });
      })
      .catch(error => console.log('>>>>> error: ', error));
  };

  loadTambols = (provinceCode, amphurCode) => {
    console.log('loadTambols: ', provinceCode, amphurCode);
    const url = adminUrl(`/location/district/${provinceCode}/${amphurCode}`);

    getJson(url)
      .then(response => {
        const { data: { DISTRICT } } = response;
        const dataList = DISTRICT || [];

        this.setState({
          tambolDataList: dataList,
          tambolList: this.createItems(dataList, 'DISTRICT_ID', 'DISTRICT_NAME'),
        });
      })
      .catch(error => console.log('>>>>> error: ', error));
  };

  handleProvinceChange = (event, index, value) => {
    this.setState({ provinceValue: value });
    const {
      // name,
      handleChange,
      provinceValueField,
      provinceNameField,
    } = this.props;

    if (handleChange) {
      const { provinceDataList } = this.state;
      const { PROVINCE_NAME } = provinceDataList
        .find(({ PROVINCE_ID }) => PROVINCE_ID === value) || {};

      handleChange(provinceValueField, provinceNameField, value, PROVINCE_NAME);
    }

    this.loadAmphurs(value);
  };

  handleAmphurChange = (event, index, value) => {
    const { amphurDataList } = this.state;

    if (amphurDataList && amphurDataList.length > 0) {
      this.setState({ amphurValue: value });

      const { provinceValue } = this.state;
      const {
        handleChange,
        amphurValueField,
        amphurNameField,
      } = this.props;

      if (handleChange) {
        const { CITY_NAME } = amphurDataList
          .find(({ CITY_ID }) => CITY_ID === value);

        handleChange(amphurValueField, amphurNameField, value, CITY_NAME);
      }

      this.loadTambols(provinceValue, value);
    }
  };

  handleTambolChange = (event, index, value) => {
    const { tambolDataList } = this.state;

    if (tambolDataList && tambolDataList.length > 0) {
      this.setState({ tambolValue: value });

      const {
        handleChange,
        tambolValueField,
        tambolNameField,
      } = this.props;

      if (handleChange) {
        const { DISTRICT_NAME } = tambolDataList
          .find(({ DISTRICT_ID }) => DISTRICT_ID === value) || {};

        handleChange(tambolValueField, tambolNameField, value, DISTRICT_NAME);
      }
    }
  };

  createItems = (dataList, codeField, nameField) => {
    const items = [];

    if (dataList) {
      dataList.forEach(data => {
        if (data) {
          const code = data[codeField];
          const name = data[nameField];
          items.push(<MenuItem key={code} value={code} primaryText={name} />);
        }
      });
    }
    return items;
  }

  render() {
    const {
      provinceList,
      provinceValue,
      amphurList,
      amphurValue,
      tambolList,
      tambolValue,
    } = this.state;
    const {
      provinceLabel,
      amphurLabel,
      tambolLabel,
      disabled,
      required,
    } = this.props;
    const provinceErrorText = (required && !provinceValue) ? 'กรุณาเลือกจังหวัด' : '';
    const amphurErrorText = (required && !amphurValue) ? 'กรุณาเลือกอำเภอ / เขต' : '';
    const tambolErrorText = '';

    return (
      <div>
        <div className="row">
          <div className="col-4">
            <SelectField
              id="province"
              name="province"
              value={provinceValue}
              floatingLabelText={provinceLabel}
              errorText={provinceErrorText}
              onChange={this.handleProvinceChange}
              disabled={disabled}
              fullWidth
            >
              {provinceList}
            </SelectField>
          </div>
          <div className="col-4">
            <SelectField
              id="amphur"
              name="amphur"
              value={amphurValue}
              floatingLabelText={amphurLabel}
              errorText={amphurErrorText}
              onChange={this.handleAmphurChange}
              disabled={disabled}
              fullWidth
            >
              {amphurList}
            </SelectField>
          </div>
          <div className="col-4">
            <SelectField
              id="tambol"
              name="tambol"
              value={tambolValue}
              floatingLabelText={tambolLabel}
              errorText={tambolErrorText}
              onChange={this.handleTambolChange}
              disabled={disabled}
              fullWidth
            >
              {tambolList}
            </SelectField>
          </div>
        </div>
      </div>
    );
  }
}

Location.propTypes = {
  provinceValueField: PropTypes.string.isRequired,
  provinceNameField: PropTypes.string.isRequired,
  amphurValueField: PropTypes.string.isRequired,
  amphurNameField: PropTypes.string.isRequired,
  tambolValueField: PropTypes.string.isRequired,
  tambolNameField: PropTypes.string.isRequired,
  provinceLabel: PropTypes.string,
  amphurLabel: PropTypes.string,
  tambolLabel: PropTypes.string,
  provinceValue: PropTypes.string,
  amphurValue: PropTypes.string,
  tambolValue: PropTypes.string,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

Location.defaultProps = {
  provinceLabel: 'จังหวัด',
  amphurLabel: 'อำเภอ / เขต',
  tambolLabel: 'ตำบล / แขวง',
  provinceValue: '',
  amphurValue: '',
  tambolValue: '',
  handleChange: null,
  disabled: false,
  required: false,
};

export default Location;
