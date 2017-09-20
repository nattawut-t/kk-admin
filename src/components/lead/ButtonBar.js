import React from 'react';
import IconButton from 'material-ui/IconButton';

const ButtonBar = () => (
  <div>
    <br />
    <div className="row">
      <div
        className="col-12"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <span>สถาน:</span>
        <IconButton style={{ color: '#8B8C8D' }}>
          <i className="material-icons">account_circle</i>
        </IconButton>
        <span>สร้าง</span>
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
    </div>
  </div>
);

ButtonBar.propTypes = {
};

ButtonBar.defaultProps = {
};

export default ButtonBar;
