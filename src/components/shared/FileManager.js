import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../styles/loader.scss';

class FileManager extends Component {

  componentDidMount() {
    const { id, loadDocuments } = this.props;
    this.loadDocuments(id, loadDocuments);
  }

  componentWillReceiveProps(nextProps) {
    const { id, loadDocuments } = nextProps;
    this.loadDocuments(id, loadDocuments);
  }

  loadDocuments = (id, handler) => {
    if (id && handler) {
      handler(id, documents => {
        const urls = documents.map(({ url }) => url);
        let i = 1;
        const config = documents.map(({ Filename, DocType, url }) => ({
          caption: `${DocType} - ${Filename}`,
          width: '120px',
          url,
          key: i++,
        }));

        $('#file1').fileinput('destroy');

        setTimeout(() => {
          $('#file1').fileinput({
            theme: 'explorer-fa',
            uploadUrl: '#',
            overwriteInitial: false,
            initialPreviewAsData: true,
            initialPreview: urls || [],
            initialPreviewConfig: config,
            language: 'en',
            showCaption: true,
            showPreview: true,
            showRemove: true,
            showUpload: false,
            showCancel: false,
            showUploadedThumbs: true,
          });
        }
          , 100);
      });
    }
  };

  render() {
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
      </form>
    );
  }
}

FileManager.propTypes = {
  id: PropTypes.string.isRequired,
  loadDocuments: PropTypes.func.isRequired,
};

export default FileManager;
