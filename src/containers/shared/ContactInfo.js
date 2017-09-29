import { connect } from 'react-redux';
import Component from '../../components/shared/ContactInfo';
import { isAdmin } from '../../libs/config';

const transform = (state, key) => {
  if (state && key) {
    const data = state.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const getState = state => isAdmin()
  ? state.admin
  : state.lead;

const mapStateToProps = state => ({
  id: getState(state).get('id') || '',
  data: transform(getState(state), 'data'),
});

export default connect(
  mapStateToProps,
)(Component);