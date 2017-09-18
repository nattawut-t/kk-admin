import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AttachFile from 'material-ui/svg-icons/editor/attach-file';
import PlaylistAddCheck from 'material-ui/svg-icons/av/playlist-add-check';
import { grey500 } from 'material-ui/styles/colors';

const styles = {
  flatButton: {
    color: grey500,
  },
};

const handleSearchClick = (searchData, input) => {
  console.log('>>> handleSearchClick: ', searchData, input);
  if (searchData && input) {
    const value = input.value || '';
    searchData(value);
  }
};

const ButtonBar = ({ searchData, loading }) => {
  let input;
  return (
    <div>
      <div
        className="row"
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div className="col-4">
          <FlatButton
            label="ข้อมูลเอกสาร"
            style={styles.flatButton}
            icon={<AttachFile />}
            disabled
          />

          <FlatButton
            label="ข้อมูลการกู้"
            href="/"
            style={styles.flatButton}
            icon={<PlaylistAddCheck />}
            disabled
          />
        </div>
        <div
          className="col-8"
          style={{
            float: 'right',
            display: 'inline-flex',
            alignItems: 'flex-end',
          }}
        >
          <TextField
            id="keyword"
            name="keyword"
            floatingLabelText="ค้นหา"
            maxLength="100"
            fullWidth
            ref={node => {
              input = node;
            }}
          />
          <IconButton
            style={{ color: '#8B8C8D' }}
            onClick={() => handleSearchClick(searchData, input)}
            disabled={loading}
          >
            <i className="material-icons">refresh</i>
          </IconButton>
        </div>
      </div>
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
          <span>Created</span>
          <IconButton style={{ color: '#8B8C8D' }}>
            <i className="material-icons">check_circle</i>
          </IconButton>
          <span>Approved</span>
          <IconButton style={{ color: '#8B8C8D' }}>
            <i className="material-icons">block</i>
          </IconButton>
          <span>Rejected</span>
        </div>
      </div>
    </div >
  );
};

ButtonBar.propTypes = {
  // id: PropTypes.string,
  // notiMessage: PropTypes.string,
  // approve: PropTypes.func,
  searchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // cancelSelection: PropTypes.func,
};

ButtonBar.defaultProps = {
  // id: '',
  // notiMessage: '',
  // approve: null,
  // searchData: null,
  // cancelSelection: null,
};

export default ButtonBar;