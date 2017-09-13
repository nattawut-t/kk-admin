import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const banks = [
  { code: 'BBL', name: 'ธนาคารกรุงเทพ จำกัด(มหาชน)' },
  { code: 'BBC', name: 'ธนาคารกรุงเทพพาณิชย์การ' },
  { code: 'KTB', name: 'ธนาคารกรุงไทย(มหาชน)' },
  { code: 'BAY', name: 'ธนาคารกรุงศรีอยุธยา(มหาชน)' },
  { code: 'KBANK', name: 'ธนาคารกสิกรไทย(มหาชน)' },
  { code: 'CITI', name: 'ธนาคารซิตี้แบงค์' },
  { code: 'TMB', name: 'ธนาคารทหารไทย(มหาชน)' },
  { code: 'SCB', name: 'ธนาคารไทยพาณิชย์(มหาชน)' },
  { code: 'NBANK', name: 'ธนาคารธนชาติ' },
  { code: 'SCIB', name: 'ธนาคารนครหลวงไทย' },
  { code: 'GSB', name: 'ธนาคารออมสิน' },
  { code: 'GHB', name: 'ธนาคารอาคารสงเคราะห์' },
];

class Bank extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    nameField: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    onSelectItem: PropTypes.func,
    required: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    onSelectItem: null,
    label: 'ธนาคาร',
    required: false,
  };

  state = {
    key: '',
    value: '',
    itemList: [],
  };

  componentWillMount() {
    const itemList = banks
      .map(({ code, name }) =>
        <MenuItem key={code} value={name} primaryText={name} />,
    );
    const { value } = this.props;
    this.setState({
      key: value,
      itemList,
    });
  }

  handleChange = (event, index, _name) => {
    const { nameField, valueField, onSelectItem } = this.props;
    const { code } = banks.find(({ name }) => name === _name);

    if (onSelectItem) {
      this.setState({ key: _name });
      onSelectItem(nameField, valueField, code, _name);
    }
  };

  render() {
    const { key, itemList } = this.state;
    const { id, label, required } = this.props;
    const errorText = (required && !key) ? 'กรุณาระบุ' : '';

    return (
      <SelectField
        id={id}
        name={id}
        value={key}
        floatingLabelText={label}
        errorText={errorText}
        onChange={this.handleChange}
        fullWidth
      >
        {itemList}
      </SelectField>
    );
  }
}

export default Bank;
