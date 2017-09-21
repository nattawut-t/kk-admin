import { connect } from 'react-redux';
import Component from '../../components/lead/PersonalInfo';
import { completePersonalInfo } from '../../reducers/lead';

const merge = state => {
  if (state) {
    const { lead } = state;
    const mobile = localStorage.getItem('username') || '';
    let data = lead.get('personalInfo') || {};

    if (data && typeof data.toJS === 'function') {
      data = data.toJS();
    }

    data = Object.assign(data, { workTel2: mobile });
    console.log(data);
    return data;
  }

  return null;
};

const mapStateToProps = state => ({
  // mobile: lead.get('mobile'),
  data: merge(state),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  completePersonalInfo: (data, callback) => dispatch(completePersonalInfo(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
