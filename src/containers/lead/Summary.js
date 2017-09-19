import { connect } from 'react-redux';
import Component from '../../components/lead/Summary';
import { save } from '../../reducers/lead';

const getData = (state, key) => {
  if (state && key) {
    const data = state.lead.get(key);

    if (data) {
      if (typeof data.toJS === 'function') {
        return data.toJS();
      }
      return data;
    }
    return {};
  }
  return null;
};

const mapStateToProps = state => ({
  notify: state.lead.get('notify'),
  message: state.lead.get('message') || '',
  data: getData(state, 'data'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  save: () => dispatch(save()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
