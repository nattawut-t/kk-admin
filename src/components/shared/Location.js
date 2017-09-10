import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { adminUrl, request } from '../../libs/request';

class Location extends Component {
  static propTypes = {
    // name: PropTypes.string.isRequired,
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
  };

  static defaultProps = {
    provinceLabel: 'จังหวัด',
    amphurLabel: 'อำเภอ / เขต',
    tambolLabel: 'ตำบล / แขวง',
    provinceValue: '',
    amphurValue: '',
    tambolValue: '',
    handleChange: null,
    disabled: false,
  };

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
    const _url = adminUrl('/location/province');
    const { provinceValue, amphurValue, tambolValue } = this.props;
    console.log('>>> geo: ', provinceValue, amphurValue, tambolValue);
    this.setState({ provinceValue, amphurValue, tambolValue });

    request(_url)
      .then(response => {
        const { data: { PROVINCE } } = response;
        const dataList = PROVINCE || [];

        this.setState({
          provinceDataList: dataList,
          provinceList: this.createItems(dataList, 'PROVINCE_ID', 'PROVINCE_NAME'),
        });
      })
      .then(() => provinceValue
        ? this.handleProvinceChange(null, 0, provinceValue)
        : null,
    )
      .then(() => amphurValue
        ? this.handleAmphurChange(null, 0, amphurValue)
        : null,
    )
      .catch(error => console.log('>>>>> error: ', error));
  }

  componentDidMount() {
  }

  handleProvinceChange = (event, index, value) => {
    console.log('>>> handleProvinceChange: ', event);
    this.setState({ provinceValue: value });
    const {
      // name,
      handleChange,
      provinceValueField,
      provinceNameField,
    } = this.props;
    const _url = adminUrl(`/location/city/${value}`);

    if (handleChange) {
      const { provinceDataList } = this.state;
      const { PROVINCE_NAME } = provinceDataList
        .find(({ PROVINCE_ID }) => PROVINCE_ID === value) || {};

      console.log('>>> provinceDataList: ', provinceDataList, PROVINCE_NAME);

      handleChange(provinceValueField, provinceNameField, value, PROVINCE_NAME);
    }

    request(_url)
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

  handleAmphurChange = (event, index, value) => {
    this.setState({ amphurValue: value });
    const { provinceValue } = this.state;
    const {
      // name,
      handleChange,
      amphurValueField,
      amphurNameField,
    } = this.props;
    const _url = adminUrl(`/location/district/${provinceValue}/${value}`);

    if (handleChange) {
      const { amphurDataList } = this.state;
      const { CITY_NAME } = amphurDataList
        .find(({ CITY_ID }) => CITY_ID === value) || {};

      handleChange(amphurValueField, amphurNameField, value, CITY_NAME);
    }

    request(_url)
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

  handleTambolChange = (event, index, value) => {
    const {
      // name,
      handleChange,
      tambolValueField,
      tambolNameField,
    } = this.props;

    if (handleChange) {
      const { tambolDataList } = this.state;
      const { DISTRICT_NAME } = tambolDataList
        .find(({ DISTRICT_ID }) => DISTRICT_ID === value) || {};

      handleChange(tambolValueField, tambolNameField, value, DISTRICT_NAME);
    }
    this.setState({ tambolValue: value });
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
    } = this.props;
    const provinceErrorText = '';
    const amphurErrorText = '';
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

export default Location;
