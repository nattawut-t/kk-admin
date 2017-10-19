import { connect } from 'react-redux';
import Component from '../../presentations/search/Criteria';
import { searchData } from '../../reducers/lead';
import { handleChange, handleDateChange } from '../../reducers/search';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  search: criteria => dispatch(searchData(criteria)),
  handleChange: (name, value) => dispatch(handleChange(name, value)),
  handleDateChange: (name, value) => dispatch(handleDateChange(name, value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
