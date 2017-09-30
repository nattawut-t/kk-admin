import { connect } from 'react-redux';
import Component from '../../components/lead/LoanInfo';

import {
  get,
  save,
} from '../../reducers/draft';
// import { saveLoanInfo } from '../../reducers/lead';
// import { data } from '../../libs/loanInfo';

// const getData = state => {
//   if (state) {
//     const _data = state.lead.get('loanInfo');
//     return (_data && typeof _data.toJS === 'function')
//       ? _data.toJS()
//       : data();
//   }
//   return data();
// };

// const mapStateToProps = state => ({
//   data: getData(state, 'loanInfo'),
//   loading: state.lead.get('loading') || false,
//   editing: state.lead.get('editing') || false,
//   message: state.lead.get('message') || '',
// });

// const mapDispatchToProps = dispatch => ({
//   save: (data, callback) => dispatch(saveLoanInfo(data, callback)),
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
