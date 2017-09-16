import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';
import { Button, Intent } from '@blueprintjs/core';

const ButtonBar = ({ id, notiMessage, approve, searchData, cancelSelection }) => {
  let input;
  const handleSearchClick = () => {
    // console.log('>>>>> handleSearchClick', searchData);
    if (searchData && input) {
      const value = input.value || '';
      searchData(value);
    }
  };
  const disabled = id === '';

  return (
    <div className="crud-actions">
      <div className="row">
        <div className="col-4 pt-button-group pt-minimal">
          <Button
            intent={Intent.PRIMARY}
            iconName="tick"
            text="Approve"
            onClick={() => {
              if (approve) {
                approve(id);
              }
            }}
            disabled={disabled}
          />
          <Button
            intent={Intent.PRIMARY}
            iconName="cross"
            text="Reject"
            disabled
          />
          <Button
            intent={Intent.PRIMARY}
            iconName="undo"
            text="Cancel"
            onClick={() => {
              if (cancelSelection) {
                cancelSelection();
              }
            }}
            disabled={disabled}
          />
        </div>
        <div className="col-8 pt-button-group pt-minimal right">
          <input
            type="text"
            placeholder="search"
            style={{ width: '100%' }}
            onKeyPress={e => {
              if (e.charCode === 13) {
                handleSearchClick();
              }
            }}
            ref={node => {
              if (node) {
                input = node;
              }
            }}
          />
          <Button
            intent={Intent.PRIMARY}
            iconName="refresh"
            text="Refresh"
            onClick={handleSearchClick}
          />
        </div>
      </div>
      <Snackbar
        open={notiMessage !== ''}
        message={notiMessage}
        autoHideDuration={4000}
      />
    </div>
  );
};

ButtonBar.propTypes = {
  id: PropTypes.string,
  notiMessage: PropTypes.string,
  approve: PropTypes.func,
  searchData: PropTypes.func,
  cancelSelection: PropTypes.func,
};

ButtonBar.defaultProps = {
  id: '',
  notiMessage: '',
  approve: null,
  searchData: null,
  cancelSelection: null,
};

export default ButtonBar;
