import { connect } from 'react-redux';
import Component from '../../components/lead/IdentityInfo';
import { get, save } from '../../reducers/draft';
import { uploadDocument, getUrl } from '../../reducers/document';

const mapStateToProps = ({ draft, notification }) => ({
  data: draft.data,
  loading: notification.loading,
  message: notification.message,
});

const mapDispatchToProps = dispatch => ({
  getDraft: callback => dispatch(get(callback)),
  saveDraft: (data, callback) => dispatch(save(data, callback)),
  uploadFile: (field, path, name, data, docType, callback) =>
    dispatch(uploadDocument(field, path, name, data, docType, callback)),
  getIdentityUrl: (id, callback) => dispatch(getUrl(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
