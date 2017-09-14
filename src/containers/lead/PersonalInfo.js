import { connect } from 'react-redux';
import Component from '../../components/lead/PersonalInfo';
import { completePersonalInfo } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    const data = state.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const mapStateToProps = ({ lead }) => ({
  // mobile: lead.get('mobile'),
  data: transform(lead, 'personalInfo'),
  loading: lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  completePersonalInfo: data => dispatch(completePersonalInfo(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
