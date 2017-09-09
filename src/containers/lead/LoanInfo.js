import { connect } from 'react-redux';
import Component from '../../components/lead/LoanInfo';
import { completeLoanInfo } from '../../reducers/lead';

const mapStateToProps = state => ({
  data: state.lead.get('loanInfo'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  completeLoanInfo: data => dispatch(completeLoanInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
