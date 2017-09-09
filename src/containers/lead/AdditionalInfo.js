import { connect } from 'react-redux';
import Component from '../../components/lead/AdditionalInfo';
import { completeLoanInfo } from '../../reducers/lead';

const mapStateToProps = state => ({
  data: state.lead.get('additionalInfo'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  completeAdditionalInfo: data => dispatch(completeLoanInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
