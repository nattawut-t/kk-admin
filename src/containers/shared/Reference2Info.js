import { connect } from 'react-redux';
import Component from '../../components/shared/ReferenceInfo';
// import { isAdmin } from '../../libs/config';

const transform = (state, key) => {
  if (state && key) {
    let data = state.get(key);
    data = data ? data.toJS() : null;

    if (data) {
      const {
        ref2Prefix,
        ref2Firstname,
        ref2Lastname,
        ref2Relationship,
        ref2Mobile,
        ref2WorkTelephone,
        ref2HomeTelephone,
      } = data;

      return {
        prefix: ref2Prefix,
        firstName: ref2Firstname,
        lastName: ref2Lastname,
        relationship: ref2Relationship,
        mobile: ref2Mobile,
        workTel: ref2WorkTelephone,
        homeTel: ref2HomeTelephone,
      };
    }
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
