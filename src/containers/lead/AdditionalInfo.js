import { connect } from 'react-redux';
import Component from '../../components/lead/AdditionalInfo';
import { uploadDocument } from '../../reducers/lead';

import {
  get,
  save,
} from '../../reducers/draft';
// import { data } from '../../libs/additionalInfo';

// const getData = (state, key) => {
//   if (state && key) {
//     const _data = state.lead.get(key);
//     return (_data && typeof _data.toJS === 'function')
//       ? _data.toJS()
//       : data();
//   }
//   return data();
// };

// const mapStateToProps = state => ({
//   data: getData(state, 'additionalInfo'),
//   personalInfo: state.lead.get('personalInfo').toJS(),
//   message: state.lead.get('message') || '',
//   loading: state.lead.get('loading') || false,
//   editing: state.lead.get('editing') || false,
// });

// const mapDispatchToProps = dispatch => ({
//   uploadFile: (field, path, name, data, docType, callback) =>
//     dispatch(uploadDocument(field, path, name, data, docType, callback)),
//   save: (data, callback) => dispatch(saveAdditionalInfo(data, callback)),
// });

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
