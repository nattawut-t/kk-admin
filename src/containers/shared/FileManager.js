import { connect } from 'react-redux';
import Component from '../../components/shared/FileManager';
import { loadDocuments, deleteDocument } from '../../reducers/document';

const mapStateToProps = ({ draft }) => ({
  id: draft.id,
});

const mapDispatchToProps = dispatch => ({
  loadDocuments: (id, callback) => dispatch(loadDocuments(id, callback)),
  deleteDocument: (id, callback) => dispatch(deleteDocument(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
