import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileManager extends Component {

  state = {
    done: false,
    // urls: [],
  };

  componentDidMount() {
    const { id, loadDocuments } = this.props;

    if (id && loadDocuments) {
      loadDocuments(id, documents => {
        const urls = documents.map(({ url }) => url);
        $('#file1').fileinput({
          theme: 'explorer-fa',
          uploadUrl: '#',
          overwriteInitial: false,
          initialPreviewAsData: true,
          initialPreview: urls || [],
          initialPreviewConfig: [
          ],
          language: 'en',
          showCaption: true,
          showPreview: true,
          showRemove: true,
          showUpload: false,
          showCancel: true,
          showUploadedThumbs: true,
        });
        // console.log('componentDidMount.urls: ', urls);
      });
    }

    this.setState({ done: true });
  }

  componentWillReceiveProps(nextProps) {
    const { id, loadDocuments } = nextProps;

    if (id && loadDocuments) {
      loadDocuments(id, documents => {
        const urls = documents.map(({ url }) => url);
        $('#file1').fileinput({
          theme: 'explorer-fa',
          uploadUrl: '#',
          overwriteInitial: false,
          initialPreviewAsData: true,
          initialPreview: urls || [],
          initialPreviewConfig: [
          ],
          language: 'en',
          showCaption: true,
          showPreview: true,
          showRemove: true,
          showUpload: false,
          showCancel: true,
          showUploadedThumbs: true,
        });
        // console.log('componentDidMount.urls: ', urls);
      });
    }
  }

  render() {
    const { done } = this.state;
    if (!done) {
      return <div className="loader" />;
    }

    return (
      <form encType="multipart/form-data">
        <div className="file-loading">
          <input
            id="file1"
            type="file"
            multiple
          />
        </div>
        <br />
        {/* <button type="submit" className="btn btn-primary">Submit</button>
        <button type="reset" className="btn btn-default">Reset</button> */}
      </form>
    );
  }
}

FileManager.propTypes = {
  id: PropTypes.string.isRequired,
  loadDocuments: PropTypes.func.isRequired,
};

// FileManager.defaultProps = {
//   id: '',
// };

export default FileManager;
