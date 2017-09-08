import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const errorMessage = (value = '', required = false) => {
  let msg = '';

  if (required && !value.trim()) {
    msg = 'กรุณากรอก';
  } else {
    msg = !value.trim() || /^\d{10}$/.test(value)
      ? ''
      : 'รูปแบบไม่ถูกต้อง กรุณาระบุตัวเลข 10 หลัก';
  }

  return msg;
};

class Mobile extends Component {
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
        maxLength="10"
      />
    );
  }
}

export default Mobile;
