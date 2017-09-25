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
  state = {
    key: '',
    value: '',
    itemList: [],
  };

  componentWillMount() {
    const { value, single } = this.props;
    const _relationshipList = relationshipList;

    if (single) {
      delete _relationshipList[0];
    }

    const itemList = _relationshipList
      .map(value =>
        <MenuItem key={value} value={value} primaryText={value} />,
    );

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

Relationship.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string,
  onSelectItem: PropTypes.func,
  required: PropTypes.bool,
  single: PropTypes.bool,
};

Relationship.defaultProps = {
  value: '',
  onSelectItem: null,
  label: 'ความสัมพันธ์',
  required: true,
  single: false,
};

export default Relationship;
