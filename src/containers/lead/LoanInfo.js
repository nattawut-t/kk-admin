import { connect } from 'react-redux';
import Component from '../../components/lead/LoanInfo';
import { saveLoanInfo } from '../../reducers/lead';

const getData = state => {
  if (state) {
    const data = state.lead.get('loanInfo');
    return (data && typeof data.toJS === 'function')
      ? data.toJS()
      : data;
  }
  return null;
};

const mapStateToProps = state => ({
  data: getData(state, 'loanInfo'),
  loading: state.lead.get('loading') || false,
  editing: state.lead.get('editing') || false,
  message: state.lead.get('message') || '',
});

const mapDispatchToProps = dispatch => ({
  save: (data, callback) => dispatch(saveLoanInfo(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
