import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class PersonalInfo extends Component {
  state = {
    dateReq: '',
    dateReqValid: true,
    dateReqRequired: true,
  };

  validate = () => {
    const invalid = Object.keys(this.state)
      .map(key => this.state[key])
      .find(value => !value);

    return !invalid;
  }

  handleChange = e => {
    const { name, value } = e.target;
    const required = this.state[`${name}Required`];

    this.setState({
      [name]: value,
      [`${name}Valid`]: !required || (required && value),
    },
      this.setState({ valid: this.validate() }),
    );

    // console.log('>>> entry: ', entry[name]);
  };
  render() {
    const {
      dateReq,
    } = this.state;
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <TextField
              id="dateReq"
              name="dateReq"
              value={dateReq}
              floatingLabelText="Request Date"
              errorText=""
              onChange={this.handleChange}
              fullWidth
              maxLength="50"
            />
          </div>
        </div>
      </div>
    );
  }
}

// PersonalInfo.propTypes = {
//   loading: PropTypes.bool,
// };

// PersonalInfo.defaultProps = {
//   loading: false,
// };

export default PersonalInfo;
