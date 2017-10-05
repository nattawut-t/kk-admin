import { connect } from 'react-redux';
import Component from '../../components/lead/Summary';
import { save } from '../../reducers/lead';

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
