import { connect } from 'react-redux';
import Component from '../../components/lead/LoanInfo';
import { completeLoanInfo } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    const data = state.lead.get(key);
    return (data && typeof data.toJS === 'function')
      ? data.toJS()
      : null;
  }
  return null;
};

const mapStateToProps = state => ({
  data: transform(state, 'loanInfo'),
  loading: state.lead.get('loading') || false,
  editing: state.lead.get('editing') || false,
  message: state.lead.get('message') || '',
});

const mapDispatchToProps = dispatch => ({
  completeLoanInfo: (data, callback) => dispatch(completeLoanInfo(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
