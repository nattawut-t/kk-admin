import { connect } from 'react-redux';
import Component from '../../components/lead/LoanInfo';
import { completeLoanInfo } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    const data = state.lead.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const mapStateToProps = state => ({
  data: transform(state, 'loanInfo'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  completeLoanInfo: (data, callback) => dispatch(completeLoanInfo(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
