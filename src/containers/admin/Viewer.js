import { connect } from 'react-redux';
import Viewer from '../../components/shared/Viewer';
import { cancelSelection } from '../../actions/admin';
import { approve, reject } from '../../reducers/admin';
import { edit, loadDocuments } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    let data = state.get(key);
    data = (data && typeof data.toJS === 'function')
      ? data.toJS()
      : data;

    console.log(data);

    return data;
  }
  return null;
};

const mapStateToProps = state => ({
  data: transform(state.admin, 'data'),
  loading: state.admin.get('loading') || false,
  documents: transform(state.lead, 'documents'),
});

const mapDispatchToProps = dispatch => ({
  approve: id => dispatch(approve(id)),
  reject: (id, remark, callback) => dispatch(reject(id, remark, callback)),
  cancel: () => dispatch(cancelSelection()),
  edit: (id, callback) => dispatch(edit(id, callback)),
  loadDocuments: (id, callback) => dispatch(loadDocuments(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
