import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const relationshipList = [
  'คู่สมรส',
  'บิดา/มารดา',
  'บุตร',
  'พี่น้อง',
  'ญาติ',
  'เพื่อน',
];

class Relationship extends Component {
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
    label: 'ความสัมพันธ์',
    required: true,
  };

  state = {
    key: '',
    value: '',
    itemList: [],
  };

  componentWillMount() {
    const itemList = relationshipList
      .map(value =>
        <MenuItem key={value} value={value} primaryText={value} />,
      );
    const { value } = this.props;
    this.setState({
      key: value,
      itemList,
    });
  }

  handleChange = (event, index, key) => {
    const { id, onSelectItem } = this.props;

    if (onSelectItem) {
      this.setState({ key });
      onSelectItem(key, key, id);
    }
  };

  render() {
    const { key, itemList } = this.state;
    const { id, label, required } = this.props;
    const errorText = (required && !key) ? 'กรุณาระบุ' : '';

    return (
      <SelectField
        id={id}
        name={name}
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

export default Relationship;
