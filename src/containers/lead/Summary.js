import { connect } from 'react-redux';
import Component from '../../components/lead/Summary';
import { save } from '../../reducers/lead';

const transform = (state, key) => {
  if (state && key) {
    const data = state.lead.get(key);
    return data ? data.toJS() : null;
  }
  return null;
};

const mapStateToProps = state => ({
  data: transform(state, 'data'),
  loading: state.lead.get('loading'),
});

const mapDispatchToProps = dispatch => ({
  save: () => dispatch(save()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
