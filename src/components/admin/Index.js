import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';

import ButtonBar from '../../containers/admin/ButtonBar';
import List from '../../containers/admin/List';
import Viewer from '../../containers/admin/Viewer';

const Index = ({ id, loadNextPage, loading, message }) => (
  <div>
    <ButtonBar />
    {loading
      ? <div className="loader" />
      : <div />
    }
    <div
      onScroll={e => {
        const target = e.nativeEvent.target;
        const scrollTop = target.scrollTop;
        const offsetHeight = target.offsetHeight;
        const scrollHeight = target.scrollHeight;

        if ((scrollTop + offsetHeight) >= scrollHeight) {
          loadNextPage();
        }
      }}
      className="row"
    >
      <div className="col-12">
        <List />
      </div>
    </div>
    <Drawer width={800} openSecondary open={id !== ''} >
      <Viewer />
    </Drawer>
    <Snackbar
      open={message !== ''}
      message={message}
      autoHideDuration={4000}
    />
  </div >
);

Index.propTypes = {
  id: PropTypes.string,
  loadNextPage: PropTypes.func,
  loading: PropTypes.bool,
  message: PropTypes.string,
};

Index.defaultProps = {
  id: '',
  loadNextPage: null,
  loading: false,
  message: '',
};

export default Index;
