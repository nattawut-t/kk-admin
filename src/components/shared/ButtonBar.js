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
    <div className="row">
      <div className="col-12" >&nbsp;</div>
      <div className="col-1" />
      <div
        className="col-7"
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
        <span>อยู่ระหว่างการพิจารณา</span>
        <IconButton style={{ color: '#8B8C8D' }}>
          <i className="material-icons">check_circle</i>
        </IconButton>
        <span>อนุมัติ</span>
        <IconButton style={{ color: '#8B8C8D' }}>
          <i className="material-icons">block</i>
        </IconButton>
        <span>ปฏิเสธ</span>
        <IconButton style={{ color: '#8B8C8D' }}>
          <i className="material-icons">priority_high</i>
        </IconButton>
        <span>เกิดข้อผิดพลาด</span>
      </div>
      <div
        className="col-3"
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
          disabled={loading}
          primary
        />
      </div>
      <div className="col-1" />
    </div >
  );
};

ButtonBar.propTypes = {
  searchData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ButtonBar.defaultProps = {
  loading: false,
};

export default ButtonBar;
