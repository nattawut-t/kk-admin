import { connect } from 'react-redux';
import Component from '../../components/shared/FileManager';

const mapStateToProps = ({ document }) => ({
  documents: document.documents,
});

export default connect(
  mapStateToProps,
)(Component);
