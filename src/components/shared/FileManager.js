import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FileManager extends Component {

  componentDidMount() {
    const { documents } = this.props;
    console.log('FileManager.componentDidMount: ', documents);
    const urls = documents.map(({ url }) => url);


    $('#file1').fileinput({
      theme: 'explorer-fa',
      uploadUrl: '#',
      overwriteInitial: false,
      initialPreviewAsData: true,
      initialPreview: urls,
      initialPreviewConfig: [
      ],
      language: 'en',
      // showCaption: false,
      // showRemove: false,
      // showUpload: false,

      showCaption: true,
      showPreview: true,
      showRemove: true,
      showUpload: false, // <------ just set this from true to false
      showCancel: true,
      showUploadedThumbs: true,
    });
  }

  render() {
    const { documents } = this.props;
    console.log('FileManager.render: ', documents);
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
  documents: PropTypes.array,
};

FileManager.defaultProps = {
  documents: [],
};

export default FileManager;
