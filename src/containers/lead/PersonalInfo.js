import { connect } from 'react-redux';
import Component from '../../components/lead/PersonalInfo';
import { completePersonalInfo } from '../../reducers/lead';

const mapStateToProps = state => ({
  data: state.lead.get('personalInfo'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  completePersonalInfo: data => dispatch(completePersonalInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
