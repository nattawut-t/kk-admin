import { connect } from 'react-redux';
import Component from '../../components/shared/ReferenceInfo';

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

const mapStateToProps = ({ admin }) => ({
  id: admin.get('id') || '',
  data: transform(admin, 'data'),
});

export default connect(
  mapStateToProps,
)(Component);
