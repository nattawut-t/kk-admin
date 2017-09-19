import { connect } from 'react-redux';
import Viewer from '../../components/admin/Viewer';
import { approve } from '../../reducers/admin';

const transform = (state, key) => {
  if (state && key) {
    const data = state.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id') || '',
  data: transform(admin, 'data'),
  loading: admin.get('loading') || false,
});

const mapDispatchToProps = dispatch => ({
  approve: id => dispatch(approve(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
