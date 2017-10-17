import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import { Button } from 'reactstrap';
import { Icon } from 'react-fa';

const handleSearchClick = searchData => {
  // console.log(searchData, input);
  if (searchData) {
    // const value = input.value || '';
    searchData();
  }
};

// const handleNewClick = switchMode => {
//   if (switchMode) {
//     switchMode('new');
//   }
// };

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
        <Button
          color="primary"
          disabled={loading}
          onClick={() => handleSearchClick(searchData, input)}
        >
          <Icon name="refresh" />&nbsp;&nbsp;โหลดใหม่
        </Button>
        &nbsp;
        {/* <Button
          disabled={loading}
          color="primary"
          onClick={() => handleNewClick(switchMode)}
        >
          <Icon name="pencil-square-o" />&nbsp;&nbsp;เพิ่ม
        </Button> */}
      </div>
      <div className="col-1" />
    </div >
  );
};

ButtonBar.propTypes = {
  searchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ButtonBar;
