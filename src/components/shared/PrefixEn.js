import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class PrefixEn extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    onSelectItem: PropTypes.func,
    required: PropTypes.bool,
  };

  static defaultProps = {
    value: '',
    onSelectItem: null,
    label: 'Prefix',
    required: false,
  };

  state = {
    key: '',
    value: '',
    itemList: [],
  };

  componentWillMount() {
    const { value } = this.props;
    this.setState({ key: value });
  }

  handleChange = (event, index, key) => {
    const { id, onSelectItem } = this.props;

    if (onSelectItem) {
      this.setState({ key });
      onSelectItem(key, key, id);
    }
  };

  render() {
    const { key } = this.state;
    const { id, label, required } = this.props;
    const errorText = (required && !key) ? 'กรุณากรอก' : '';

    return (
      <SelectField
        id={id}
        name={name}
        value={key}
        floatingLabelText={label}
        errorText={errorText}
        onChange={this.handleChange}
      >
        <MenuItem value="Mr." primaryText="Mr." />
        <MenuItem value="Ms." primaryText="Ms." />
        <MenuItem value="Mrs." primaryText="Mrs." />
      </SelectField>
    );
  }
}

export default PrefixEn;
