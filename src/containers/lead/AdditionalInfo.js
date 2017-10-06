import { connect } from 'react-redux';
import Component from '../../components/lead/AdditionalInfo';
import { uploadDocument } from '../../reducers/document';
import { get, save } from '../../reducers/draft';

const mapStateToProps = state => ({
  data: state.draft.data,
  loading: state.lead.get('loading') || false,
  editing: state.lead.get('editing') || false,
  message: state.lead.get('message') || '',
});

const mapDispatchToProps = dispatch => ({
  getDraft: callback => dispatch(get(callback)),
  saveDraft: (data, callback) => dispatch(save(data, callback)),
  uploadFile: (field, path, name, data, docType, callback) =>
    dispatch(uploadDocument(field, path, name, data, docType, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
