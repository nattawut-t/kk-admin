import { connect } from 'react-redux';
import Component from '../../components/lead/Summary';
import { save } from '../../reducers/lead';

// const getData = (state, key) => {
//   if (state && key) {
//     const data = state.lead.get(key);

//     if (data) {
//       if (typeof data.toJS === 'function') {
//         return data.toJS();
//       }
//       return data;
//     }
//     return {};
//   }
//   return null;
// };

// const mapStateToProps = state => ({
//   message: state.lead.get('message') || '',
//   data: getData(state, 'data'),
//   loading: state.lead.get('loading') || false,
//   editing: state.lead.get('editing') || false,
// });

const mapStateToProps = state => ({
  data: state.draft.data,
  loading: state.lead.get('loading') || false,
  // editing: state.lead.get('editing') || false,
  message: state.lead.get('message') || '',
});

const mapDispatchToProps = dispatch => ({
  save: callback => dispatch(save(callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
