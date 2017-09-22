import { connect } from 'react-redux';
import Viewer from '../../components/admin/Viewer';
import { cancelSelection } from '../../actions/admin';
import { approve, reject } from '../../reducers/admin';
import { edit } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    const data = state.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const mapStateToProps = ({ admin }) => ({
  data: transform(admin, 'data'),
  loading: admin.get('loading') || false,
});

const mapDispatchToProps = dispatch => ({
  approve: id => dispatch(approve(id)),
  reject: (id, remark, callback) => dispatch(reject(id, remark, callback)),
  cancel: () => dispatch(cancelSelection()),
  edit: (id, callback) => dispatch(edit(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
