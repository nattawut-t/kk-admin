import { connect } from 'react-redux';
import Component from '../../components/shared/ContactInfo';

const transform = (state, key) => {
  if (state && key) {
    const data = state.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id') || '',
  data: transform(admin, 'data'),
});

export default connect(
  mapStateToProps,
)(Component);
