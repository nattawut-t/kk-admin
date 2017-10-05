import { connect } from 'react-redux';
import Component from '../../components/shared/LoanInfo';
// import { isAdmin } from '../../libs/config';

const transform = (state, key) => {
  if (state && key) {
    const data = state.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

// const getState = state => isAdmin()
//   ? state.admin
//   : state.lead;

const mapStateToProps = ({ lead }) => ({
  id: lead.get('id') || '',
  data: transform(lead, 'data'),
});

export default connect(
  mapStateToProps,
)(Component);
