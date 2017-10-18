import { connect } from 'react-redux';
import Component from '../../presentations/search/Criteria';
import { searchData } from '../../reducers/lead';
import { handleSearchChange } from '../../reducers/search';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  search: criteria => dispatch(searchData(criteria)),
  handleChange: e => dispatch(handleSearchChange(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
