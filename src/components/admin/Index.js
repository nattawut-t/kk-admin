import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import ButtonBar from '../../containers/admin/ButtonBar';
import List from '../../containers/admin/List';
import Viewer from '../../containers/admin/Viewer';
// import ContentBox from '../../common/ContentBox';

const Index = ({ id, loadNextPage, loading }) => (
  <div>
    <div className="row">
      <div className="col-12">
        <ButtonBar />
      </div>
    </div>
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
    <Drawer width={400} openSecondary open={id !== ''} >
      <Viewer />
    </Drawer>
  </div>
);

Index.propTypes = {
  id: PropTypes.string,
  loadNextPage: PropTypes.func,
  loading: PropTypes.bool,
};

Index.defaultProps = {
  id: '',
  loadNextPage: null,
  loading: false,
};

export default Index;
