import React from 'react';
import IconButton from 'material-ui/IconButton';


const ButtonBar = () =>
  <div
    className="col-12"
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    <span>Status:</span>
    <IconButton style={{ color: '#8B8C8D' }}>
      <i className="material-icons">account_circle</i>
    </IconButton>
    <span>Created</span>
    <IconButton style={{ color: '#8B8C8D' }}>
      <i className="material-icons">check_circle</i>
    </IconButton>
    <span>Aproved</span>
    <IconButton style={{ color: '#8B8C8D' }}>
      <i className="material-icons">block</i>
    </IconButton>
    <span>Rejected</span>
    <IconButton style={{ color: '#8B8C8D' }}>
      <i className="material-icons">priority_high</i>
    </IconButton>
    <span>Error</span>
  </div>;

export default ButtonBar;
