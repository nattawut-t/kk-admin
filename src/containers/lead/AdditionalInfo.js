import { connect } from 'react-redux';
import Component from '../../components/lead/AdditionalInfo';
import { saveAdditionalInfo, uploadDocument } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    const data = state.lead.get(key);
    return (data && typeof data.toJS === 'function')
      ? data.toJS()
      : data;
  }
  return null;
};

const mapStateToProps = state => ({
  data: transform(state, 'additionalInfo'),
  personalInfo: transform(state, 'personalInfo'),
  message: state.lead.get('message') || '',
  loading: state.lead.get('loading') || false,
  editing: state.lead.get('editing') || false,
});

const mapDispatchToProps = dispatch => ({
  uploadFile: (field, path, name, data, docType, callback) =>
    dispatch(uploadDocument(field, path, name, data, docType, callback)),
  save: (data, callback) => dispatch(saveAdditionalInfo(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
