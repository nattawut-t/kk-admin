import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Test extends Component {
  state = {
    authenticated: false,
  };

  handleClick = e => {
    e.preventDefault();

    this.setState({ authenticated: true });
    const { setState } = this.props;
    setState('test 001');
  };

  render() {
    const { authenticated } = this.state;
    if (authenticated) {
      return <Redirect to="/test1" />;
    }
    return (
      <form onSubmit={e => this.handleClick(e)}>
        <div>Test</div>
        <button
          type="submit"
          value="submit"
        >
          redirect
        </button>
      </form>
    );
  }
}

Test.propTypes = {
  setState: PropTypes.func.isRequired,
};

export default withRouter(Test);
