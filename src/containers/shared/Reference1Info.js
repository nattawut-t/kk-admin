import { connect } from 'react-redux';
import Component from '../../components/shared/ReferenceInfo';
import { isAdmin } from '../../libs/config';

const transform = (state, key) => {
  if (state && key) {
    let data = state.get(key);
    data = data ? data.toJS() : null;

    if (data) {
      const {
        ref1Prefix,
        ref1Firstname,
        ref1Lastname,
        ref1Relationship,
        ref1Mobile,
        ref1WorkTelephone,
        ref1HomeTelephone,
      } = data;

      return {
        prefix: ref1Prefix,
        firstName: ref1Firstname,
        lastName: ref1Lastname,
        relationship: ref1Relationship,
        mobile: ref1Mobile,
        workTel: ref1WorkTelephone,
        homeTel: ref1HomeTelephone,
      };
    }
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
