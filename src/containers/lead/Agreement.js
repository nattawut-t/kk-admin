import { connect } from 'react-redux';
import Component from '../../components/lead/Agreement';
import { acceptAgreement } from '../../reducers/lead';

const mapStateToProps = state => ({
  isConsent: state.lead.get('isConsent'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  acceptAgreement: isConsent => dispatch(acceptAgreement(isConsent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
