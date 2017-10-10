import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/loader.scss';

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
          showCancel: false,
          showUploadedThumbs: true,
        });
        // console.log('componentDidMount.urls: ', urls);
      });
    }

    this.setState({ done: true });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dont: false });

    const { id, loadDocuments } = nextProps;

    if (id && loadDocuments) {
      loadDocuments(id, documents => {
        const urls = documents.map(({ url }) => url);

        $('#file1').fileinput('destroy');

        setTimeout(() => {
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
            showCancel: false,
            showUploadedThumbs: true,
          });
          this.setState({ dont: true });
        }
          , 100);
      });
    }
  }

  render() {
    const { done } = this.state;
    if (!done) {
      return <div className="loader" />;
    }

    const { id } = this.props;
    return (
      <form encType="multipart/form-data">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <span>Lead ID: {id}</span>
        </div>
        <br />
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
