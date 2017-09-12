import { connect } from 'react-redux';
import Component from '../../components/lead/AdditionalInfo';
import { completeAdditionalInfo, uploadDocument } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    const data = state.lead.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const mapStateToProps = state => ({
  data: transform(state, 'additionalInfo'),
  personalInfo: transform(state, 'personalInfo'),
  message: state.lead.get('message') || '',
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  uploadFile: (field, path, name, data, docType) =>
    dispatch(uploadDocument(field, path, name, data, docType)),
  completeAdditionalInfo: data => dispatch(completeAdditionalInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
