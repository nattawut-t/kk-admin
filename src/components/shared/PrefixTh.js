import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { url, request } from '../../libs/request';

const endpoint = '/prefix';
const fieldName = {
  key: 'KEY',
  value: 'VALUE',
};

class PrefixTh extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    onSelectItem: PropTypes.func,
    label: PropTypes.string,
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
    dataSource: [],
    itemList: [],
  };

  componentWillMount() {
    const _url = url(endpoint);

    request(_url)
      .then(response => {
        const { data: { LIST } } = response;
        const dataList = LIST || [];

        const { value } = this.props;
        const item = dataList.find(data => data[fieldName.value] === value) || {};
        const key = item ? item[fieldName.key] : '';
        const itemList = this.createItems(dataList);

        this.setState({
          dataSource: dataList,
          itemList,
          key,
        });
      })
      .catch(error => console.log('>>>>> error: ', error));
  }

  componentDidMount() {
  }

  handleChange = (event, index, key) => {
    const { id, onSelectItem } = this.props;

    if (onSelectItem) {
      const { dataSource } = this.state;
      const prefix = dataSource.find(({ KEY }) => KEY === key);
      let _key = '';
      let _value = '';

      if (prefix) {
        _key = prefix[fieldName.key];
        _value = prefix[fieldName.value];
      }

      this.setState({ key: _key });
      onSelectItem(_key, _value, id);
    }
  };

  createItems = dataList => {
    const items = [];

    if (dataList) {
      dataList.forEach(({ KEY, VALUE }) =>
        items.push(<MenuItem key={KEY} value={KEY} primaryText={VALUE} />,
        ));
    }
    return items;
  };

  render() {
    const { itemList, key } = this.state;
    const { id, label, required } = this.props;
    const errorText = (required && !key) ? `Please select ${label}` : '';

    return (
      <SelectField
        id={id}
        name={name}
        value={key}
        floatingLabelText={label}
        errorText={errorText}
        onChange={this.handleChange}
      >
        {itemList}
      </SelectField>
    );
  }
}

export default PrefixTh;
