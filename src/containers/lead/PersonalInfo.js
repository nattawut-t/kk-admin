import { connect } from 'react-redux';
import Component from '../../components/lead/PersonalInfo';
import { savePersonalInfo } from '../../reducers/lead';
import { isAdmin } from '../../libs/config';

const merge = state => {
  if (state) {
    if (!isAdmin()) {
      const { lead } = state;
      const mobile = localStorage.getItem('username') || '';
      let data = lead.get('personalInfo') || {};

      if (data && typeof data.toJS === 'function') {
        data = data.toJS();
      }

      data = Object.assign(data, { workTel2: mobile });
      return data;
    }

    const data = state.lead.get('personalInfo') || {};
    return (data && typeof data.toJS === 'function')
      ? data.toJS()
      : data;
  }

  return null;
};

const mapStateToProps = state => ({
  data: merge(state),
  loading: state.lead.get('loading') || false,
  editing: state.lead.get('editing') || false,
  message: state.lead.get('message') || '',
});

const mapDispatchToProps = dispatch => ({
  save: (data, callback) => dispatch(savePersonalInfo(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
