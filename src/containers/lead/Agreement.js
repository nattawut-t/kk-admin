import { connect } from 'react-redux';
import Component from '../../components/lead/Agreement';
// import { saveAgreement } from '../../reducers/lead';
// import { data } from '../../libs/agreement';

import {
  get,
  save,
} from '../../reducers/draft';

// const getData = _data =>
//   (_data && typeof _data.toJS === 'function')
//     ? _data.toJS()
//     : data();

// const mapStateToProps = ({ lead }) => ({
//   data: getData(lead.get('agreement')),
//   loading: lead.get('loading') || false,
//   editing: lead.get('editing') || false,
//   message: lead.get('message') || '',
// });

// const mapDispatchToProps = dispatch => ({
//   save: (data, callback) => dispatch(saveAgreement(data, callback)),
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
