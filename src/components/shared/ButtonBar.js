import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';

const handleSearchClick = searchData => {
  // console.log(searchData, input);
  if (searchData) {
    // const value = input.value || '';
    searchData();
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
        <button
          className={!loading ? 'btn btn-primary' : 'btn'}
          disabled={loading}
          onClick={() => handleSearchClick(searchData, input)}
        >
          <i className="fa fa-refresh" aria-hidden="true" />&nbsp;&nbsp;โหลดใหม่
        </button>
      </div>
      <div className="col-1" />
    </div >
  );
};

ButtonBar.propTypes = {
  searchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

// ButtonBar.defaultProps = {
//   loading: false,
// };

export default ButtonBar;
