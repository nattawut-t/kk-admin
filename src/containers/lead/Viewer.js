import { connect } from 'react-redux';
import Component from '../../components/shared/Viewer';
import { approve, reject } from '../../reducers/admin';
import { cancelSelection } from '../../reducers/lead';
import { edit } from '../../reducers/draft';

const transform = (state, key) => {
  if (state && key) {
    let data = state.get(key);
    data = (data && typeof data.toJS === 'function')
      ? data.toJS()
      : data;

    return data;
  }
  return null;
};

const mapStateToProps = ({ lead, notification }) => ({
  id: lead.get('id') || '',
  data: transform(lead, 'data'),
  loading: notification.loading,
});

const mapDispatchToProps = dispatch => ({
  approve: id => dispatch(approve(id)),
  reject: (id, remark, callback) => dispatch(reject(id, remark, callback)),
  cancel: () => dispatch(cancelSelection()),
  edit: (id, callback) => dispatch(edit(id, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
