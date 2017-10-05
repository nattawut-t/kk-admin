import { connect } from 'react-redux';
import Viewer from '../../components/shared/Viewer';
import { cancelSelection } from '../../actions/admin';
import { approve, reject } from '../../reducers/admin';
import { loadDocuments, loadDocument } from '../../reducers/lead';
import { edit } from '../../reducers/draft';

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

const mapStateToProps = ({ lead }) => ({
  data: transform(lead, 'data'),
  loading: lead.get('loading') || false,
  documents: transform(lead, 'documents'),
});

const mapDispatchToProps = dispatch => ({
  approve: id => dispatch(approve(id)),
  reject: (id, remark, callback) => dispatch(reject(id, remark, callback)),
  cancel: () => dispatch(cancelSelection()),
  edit: (id, callback) => dispatch(edit(id, callback)),
  loadDocuments: (id, callback) => dispatch(loadDocuments(id, callback)),
  loadDocument: callback => dispatch(loadDocument(callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
