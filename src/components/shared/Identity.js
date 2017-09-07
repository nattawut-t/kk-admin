import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const errorMessage = (value = '', required = false, label = '') => {
  let msg = '';

  if (required && !value.trim()) {
    msg = `กรุณากรอก ${label}`;
  } else {
    msg = !value.trim() || /^\d{13}$/.test(value)
      ? ''
      : `กรุณากรอก ${label} ให้ถูกฟอแมท เช่น 1234567890123`;
  }

  return msg;
};

class Identity extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    handleChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    required: false,
    handleChange: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errorMessage: '',
    };
  }

  componentWillMount() {
    const { value } = this.props;
    this.setState({ value });
    this.initialValue(value);
  }

  initialValue = (value = '') => {
    const {
      name,
      required,
      label,
      handleChange,
    } = this.props;
    const _errorMessage = errorMessage(value, required, label);

    console.log('>>> errorMessage: ', value, required, _errorMessage);

    this.setState({
      value,
      errorMessage: _errorMessage,
    });

    if (handleChange) {
      handleChange({ target: { name, value } });
    }
  };

  _handleChange = e => {
    const {
      name,
      required,
      label,
      handleChange,
    } = this.props;
    let { value } = e ? e.target : this.state;
    value = value || '';

    const _errorMessage = errorMessage(value, required, label);

    this.setState({
      value,
      errorMessage: _errorMessage,
    }, () => {
      if (handleChange) {
        handleChange(name, value, this.state.errorMessage);
      }
    });
  };

  render() {
    const { name, label } = this.props;
    const { value, errorMessage } = this.state;

    return (
      <TextField
        id={name}
        name={name}
        value={value}
        floatingLabelText={label}
        errorText={errorMessage}
        onChange={this._handleChange}
        fullWidth
        maxLength="13"
      />
    );
  }
}

export default Identity;
