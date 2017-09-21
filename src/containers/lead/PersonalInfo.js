import { connect } from 'react-redux';
import Component from '../../components/lead/PersonalInfo';
import { completePersonalInfo } from '../../reducers/lead';
import { isAdmin } from '../../libs/config';

const merge = state => {
  if (state) {
    const { lead } = state;
    const mobile = !isAdmin()
      ? localStorage.getItem('username') || ''
      : '';
    let data = lead.get('personalInfo') || {};

    if (data && typeof data.toJS === 'function') {
      data = data.toJS();
    }

    data = Object.assign(data, { workTel2: mobile });
    return data;
  }

  return null;
};

const mapStateToProps = state => ({
  // mobile: lead.get('mobile'),
  data: merge(state),
  loading: state.lead.get('loading') || false,
  message: state.lead.get('message') || '',
});

const mapDispatchToProps = dispatch => ({
  completePersonalInfo: (data, callback) => dispatch(completePersonalInfo(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
