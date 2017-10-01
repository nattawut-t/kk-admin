import { connect } from 'react-redux';
import Component from '../../components/shared/Document';
import { loadDocuments } from '../../reducers/lead';

const documents = d => d && d.toJS ? d.toJS() : d;

const mapStateToProps = ({ lead }) => ({
  id: `${lead.get('id') || ''}`,
  documents: documents(lead.get('documents')) || [],
  // documents: [],
});

const mapDispatchToProps = dispatch => ({
  load: (id, callback) => dispatch(loadDocuments(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
