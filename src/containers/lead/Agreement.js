import { connect } from 'react-redux';
import Component from '../../components/lead/Agreement';
import { acceptAgreement } from '../../reducers/lead';

const mapStateToProps = ({ lead }) => ({
  isConsent: lead.get('isConsent') || false,
  loading: lead.get('loading') || false,
  editing: lead.get('editing') || false,
});

const mapDispatchToProps = dispatch => ({
  acceptAgreement: isConsent => dispatch(acceptAgreement(isConsent)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
