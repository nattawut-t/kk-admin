import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Test1 extends Component {

  // constructor(props) {
  //   super(props);
  // }

  componentWillMount() {
    // window.location.reload();
    console.log('>>> Test1.componentWillMount: ', location);
    console.log('>>> Test1.componentWillMount: ', this.props.location);
  }

  render() {
    const { data } = this.props;
    console.log('>>> Test1.render: ', location);
    return (
      <form onSubmit={e => {
        e.preventDefault();
        console.log('>>> Test1.render: ');
      }}
      >
        <div>{data}</div>
        <button type="submit" value="submit">Test1</button>
      </form>
    );
  }
}

Test1.propTypes = {
  data: PropTypes.string,
  location: PropTypes.object.isRequired,
};

Test1.defaultProps = {
  data: '',
};

export default withRouter(Test1);
