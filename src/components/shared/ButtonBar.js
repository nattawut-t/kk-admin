import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Refresh from 'material-ui/svg-icons/navigation/refresh';

const styles = {
  button: {
    margin: 12,
  },
  chip: {
    margin: 2,
  },
};

const handleSearchClick = (searchData, input) => {
  console.log(searchData, input);
  if (searchData && input) {
    const value = input.value || '';
    searchData(value);
  }
};

const ButtonBar = ({ searchData, loading }) => {
  let input;
  return (
    <div>
      <div className="row" >
        <div className="col-12" >&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-1" />
        <div
          className="col-5"
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <span>สถาน:</span>
          <IconButton style={{ color: '#8B8C8D' }}>
            <i className="material-icons">account_circle</i>
          </IconButton>
          <span>Created</span>
          <IconButton style={{ color: '#8B8C8D' }}>
            <i className="material-icons">check_circle</i>
          </IconButton>
          <span>Approved</span>
          <IconButton style={{ color: '#8B8C8D' }}>
            <i className="material-icons">block</i>
          </IconButton>
          <span>Rejected</span>
          <IconButton style={{ color: '#8B8C8D' }}>
            <i className="material-icons">priority_high</i>
          </IconButton>
          <span>Error</span>
        </div>
        <div
          className="col-5"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <RaisedButton
            label="โหลดใหม่"
            style={styles.button}
            icon={<Refresh />}
            onClick={() => handleSearchClick(searchData, input)}
            display={loading}
            primary
          />
        </div>
        <div className="col-1" />
      </div>
    </div>
  );
};

ButtonBar.propTypes = {
  searchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

ButtonBar.defaultProps = {
};

export default ButtonBar;
