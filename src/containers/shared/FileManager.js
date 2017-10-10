import { connect } from 'react-redux';
import Component from '../../components/shared/FileManager';
// import Component from '../../components/test/Test2';
import { loadDocuments } from '../../reducers/document';

const mapStateToProps = ({ draft }) => ({
  id: draft.id,
});

const mapDispatchToProps = dispatch => ({
  loadDocuments: (id, callback) => dispatch(loadDocuments(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
