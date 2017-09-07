import React, { Component } from 'react';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import PrefixTh from '../shared/PrefixTh';
// import PrefixEn from '../shared/PrefixEn';

const styles = {
  button: {
    margin: 12,
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
};

class PersonalInfo extends Component {
  state = {
    dateReq: moment().format('YYYY-MM-DD'),
    prefixTH: '',
    firstNameTH: '',
    lastNameTH: '',
    prefixEn: '',
    firstNameEN: '',
    lastNameEN: '',
    valid: false,
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
      prefixTH,
      firstNameTH,
      lastNameTH,
      prefixEn,
      firstNameEN,
      lastNameEN,
      valid,
    } = this.state;

    return (
      <div>
        <form className="crud-form" onSubmit={e => this.handleAction(e, 'submit')}>
          <div className="row">
            <div className="col-12">
              <TextField
                id="dateReq"
                name="dateReq"
                value={dateReq}
                floatingLabelText="Request Date"
                onChange={this.handleChange}
                fullWidth
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <PrefixTh
                id="prefixTH"
                name="prefixTH"
                value={prefixTH}
                required
                onSelectItem={this.handleLookupChange}
              />
            </div>
            <div className="col">
              <TextField
                id="firstNameTH"
                name="firstNameTH"
                value={firstNameTH}
                floatingLabelText="First Name (TH)"
                onChange={this.handleChange}
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="lastNameTH"
                name="lastNameTH"
                value={lastNameTH}
                floatingLabelText="Last Name (TH)"
                onChange={this.handleChange}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <PrefixTh
                id="prefixEn"
                name="prefixEn"
                value={prefixEn}
                required
                onSelectItem={this.handleLookupChange}
              />
            </div>
            <div className="col">
              <TextField
                id="firstNameEN"
                name="firstNameEN"
                value={firstNameEN}
                floatingLabelText="First Name (TH)"
                onChange={this.handleChange}
                fullWidth
              />
            </div>
            <div className="col">
              <TextField
                id="lastNameEN"
                name="lastNameEN"
                value={lastNameEN}
                floatingLabelText="Last Name (TH)"
                onChange={this.handleChange}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12" style={{ textAlign: 'right' }}>
              <RaisedButton
                label="Cancel"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
              >
                <input type="file" style={styles.exampleImageInput} />
              </RaisedButton>
              <RaisedButton
                label="Next"
                labelPosition="before"
                primary
                style={styles.button}
                disabled={!valid}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
            </div>
          </div>
        </form>
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
