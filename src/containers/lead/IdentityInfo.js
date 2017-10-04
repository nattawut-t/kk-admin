import { connect } from 'react-redux';
import Component from '../../components/lead/IdentityInfo';
import { get, save } from '../../reducers/draft';
import { uploadDocument, getIdentityUrl } from '../../reducers/document';

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
  getIdentityUrl: (id, callback) => dispatch(getIdentityUrl(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
