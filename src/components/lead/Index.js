import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';
import { Jumbotron } from 'reactstrap';

import ButtonBar from '../../containers/lead/ButtonBar';
import List from '../../containers/lead/List';
import Viewer from '../../containers/lead/Viewer';
import Criteria from '../../containers/search/Criteria';
// import New from '../../components/shared/New';

const Index = ({ id, loadNextPage, loading, message }) => (
  <div>
    <Jumbotron style={{ padding: '2rem 1rem' }}>
      <h5 className="display-4">Leads</h5>
      <hr className="my-2" />
      <p className="lead">Information for approval</p>
    </Jumbotron>

    <Criteria />

    <div className="col-12">
      <ButtonBar />
    </div>

    <div className={loading ? 'loader' : ''} />

    <div
      className="col-12"
      onScroll={e => {
        const target = e.nativeEvent.target;
        const scrollTop = target.scrollTop;
        const offsetHeight = target.offsetHeight;
        const scrollHeight = target.scrollHeight;

        if ((scrollTop + offsetHeight) >= scrollHeight) {
          loadNextPage();
        }
      }}
    >
      <List />
    </div>

    <Drawer width={800} openSecondary open={id !== ''} >
      <Viewer />
    </Drawer>
    {/* <Drawer width={800} openSecondary open={false} >
      <New />
    </Drawer> */}
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
