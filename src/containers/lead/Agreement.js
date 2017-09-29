import { connect } from 'react-redux';
import Component from '../../components/lead/Agreement';
import { saveAgreement } from '../../reducers/lead';

const mapStateToProps = ({ lead }) => ({
  data: lead.get('agreement').toJS() || {},
  loading: lead.get('loading') || false,
  editing: lead.get('editing') || false,
  message: lead.get('message') || '',
});

const mapDispatchToProps = dispatch => ({
  save: (data, callback) => dispatch(saveAgreement(data, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
