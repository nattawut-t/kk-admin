import { connect } from 'react-redux';
import Component from '../../components/lead/AdditionalInfo';
import { completeLoanInfo, uploadDocument, save } from '../../reducers/lead';

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
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  uploadFile: (name, data, docType) => dispatch(uploadDocument(name, data, docType)),
  completeAdditionalInfo: data => dispatch(completeLoanInfo(data)),
  save: data => dispatch(save(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
