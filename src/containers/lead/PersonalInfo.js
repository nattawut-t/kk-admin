import { connect } from 'react-redux';
import Component from '../../components/lead/PersonalInfo';

// import { savePersonalInfo } from '../../reducers/lead';
import {
  get,
  save,
} from '../../reducers/draft';

// import { isAdmin } from '../../libs/config';
// import { data as parse } from '../../libs/personalInfo';

// const merge = state => {
//   if (state) {
//     if (isAdmin()) {
//       const _data = state.lead.get('personalInfo') || {};
//       return (_data && typeof _data.toJS === 'function')
//         ? _data.toJS()
//         : parse();
//     }

//     let { draft: { personalInfo } } = state;

//     console.log('pi.container: ', personalInfo);

//     const mobile = localStorage.getItem('username') || '';
//     personalInfo = personalInfo || {};

//     return Object.assign(personalInfo, { workTel2: mobile });
//   }

//   return parse();
// };

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
