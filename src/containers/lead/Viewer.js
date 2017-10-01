import { connect } from 'react-redux';
import Viewer from '../../components/shared/Viewer';
import { cancelSelection } from '../../actions/lead';
// import { approve, reject } from '../../reducers/admin';
import { edit, loadDocuments, loadDocument } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    let data = state.get(key);
    data = (data && typeof data.toJS === 'function')
      ? data.toJS()
      : data;

    console.log('ctn.data: ', data);

    return data;
  }
  return null;
};

const mapStateToProps = state => ({
  id: state.lead.get('id') || '',
  data: transform(state.lead, 'data'),
  loading: state.lead.get('loading') || false,
  documents: transform(state.lead, 'documents'),
});

const mapDispatchToProps = dispatch => ({
  // approve: id => dispatch(approve(id)),
  // reject: (id, remark, callback) => dispatch(reject(id, remark, callback)),
  cancel: () => dispatch(cancelSelection()),
  edit: (id, callback) => dispatch(edit(id, callback)),
  loadDocuments: (id, callback) => dispatch(loadDocuments(id, callback)),
  loadDocument: callback => dispatch(loadDocument(callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Viewer);
