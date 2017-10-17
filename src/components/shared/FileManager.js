import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { portalUrl } from '../../libs/request';
import '../../styles/loader.scss';

const uploadUrl = (postfix = '') => portalUrl(`/admin/leads/doc${postfix}`);
const deleteUrl = (postfix = '') => portalUrl(`/admin/media${postfix}`);
const docTypes = [
  <MenuItem key="identity" value="identity" primaryText="บัตรประชาชน" />,
  <MenuItem key="account" value="account" primaryText="สำเนาหน้าแรกสมุดบัญชีเงินฝากที่ใช้รับเงินเดือน" />,
  <MenuItem key="payslip" value="payslip" primaryText="สลิปเงินเดือน (เดือนล่าสุด)" />,
  <MenuItem key="household_registration" value="household_registration" primaryText="ทะเบียนบ้าน" />,
  <MenuItem key="statement_1" value="statement_1" primaryText="แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #1" />,
  <MenuItem key="statement_2" value="statement_2" primaryText="แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #2" />,
  <MenuItem key="statement_3" value="statement_3" primaryText="แบงค์ Statement บัญชีเงินเดือน (ย้อนหลัง 6 เดือน) #3" />,
];

class FileManager extends Component {
  state = {
    docType: 'identity',
  };

  componentDidMount() {
    const { id, loadDocuments } = this.props;
    this.loadDocuments(id, loadDocuments);
  }

  componentWillReceiveProps(nextProps) {
    const { id, loadDocuments } = nextProps;
    this.loadDocuments(id, loadDocuments);
  }

  loadDocuments = (id = this.props.id, handler = this.props.loadDocuments) => {
    if (id && handler) {
      handler(id, documents => {
        const urls = documents.map(({ url }) => url);
        const config = documents.map(({ ID, Filename, DocType, Size, url }) => {
          let _config = {
            key: ID,
            filename: Filename,
            caption: `${DocType} - ${Filename}`,
            width: '120px',
            size: Size,
            url: deleteUrl(`/${id}`),
            downloadUrl: url,
          };
          const ext = Filename.split('.').pop();

          if (['jpg', 'jpeg', 'png'].indexOf(ext) <= -1) {
            _config = Object.assign(_config, { type: ext });
          }

          return _config;
        });

        // console.log('urls: ', urls);
        // console.log('documents: ', documents);
        // console.log('config: ', config);

        $('#file1').fileinput('destroy');

        setTimeout(() => {
          $('#file1').fileinput({
            theme: 'explorer-fa',
            uploadUrl: uploadUrl(),
            uploadAsync: false,
            overwriteInitial: false,
            //
            previewFileIcon: '<i class="fa fa-file"></i>',
            preferIconicPreview: true,
            previewFileIconSettings: {
              doc: '<i class="fa fa-file-word-o text-primary"></i>',
              xls: '<i class="fa fa-file-excel-o text-success"></i>',
              ppt: '<i class="fa fa-file-powerpoint-o text-danger"></i>',
              pdf: '<i class="fa fa-file-pdf-o text-danger"></i>',
              zip: '<i class="fa fa-file-archive-o text-muted"></i>',
              htm: '<i class="fa fa-file-code-o text-info"></i>',
              txt: '<i class="fa fa-file-text-o text-info"></i>',
              mov: '<i class="fa fa-file-movie-o text-warning"></i>',
              mp3: '<i class="fa fa-file-audio-o text-warning"></i>',
            },
            previewFileExtSettings: {
              doc: ext => ext.match(/(doc|docx)$/i),
              xls: ext => ext.match(/(xls|xlsx)$/i),
              ppt: ext => ext.match(/(ppt|pptx)$/i),
              zip: ext => ext.match(/(zip|rar|tar|gzip|gz|7z)$/i),
              htm: ext => ext.match(/(htm|html)$/i),
              txt: ext => ext.match(/(txt|ini|csv|java|php|js|css)$/i),
              mov: ext => ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i),
              mp3: ext => ext.match(/(mp3|wav)$/i),
            },
            //
            initialPreviewAsData: true,
            // initialPreviewFileType: 'image',
            initialPreview: urls || [],
            initialPreviewConfig: config,
            ajaxSettings: {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            },
            uploadExtra: {
              leadId: id,
              docType: 'identity',
            },
            maxFileCount: 1,
            language: 'en',
            showCaption: true,
            showPreview: true,
            showRemove: false,
            showUpload: false,
            showCancel: false,
            showDownload: true,
            // downloadIcon: '<i class="glyphicon glyphicon-download"></i>',
            showUploadedThumbs: true,
          });

          $('#file1').on('filepreupload', (event, data) => {
            const { files } = data;
            const { docType } = this.state;

            data.form.append('file', files[0]);
            data.form.append('docType', docType);
            data.form.append('leadId', id);
          });

          $('#file1').on('filepredelete', (jqXHR, id) => {
            const { deleteDocument } = this.props;

            if (id && deleteDocument) {
              deleteDocument(id, success => {
                console.log('delete success');
                if (success) {
                  const { id, loadDocuments } = this.props;
                  this.loadDocuments(id, loadDocuments);
                }
              });
            }

            return false;
          });
        }
          , 100);
      });
    }
  };

  handleChange = (event, index, docType) => {
    this.setState({ docType });
  };

  render() {
    const { id } = this.props;
    const { docType } = this.state;

    return (
      <div className="row">
        <form encType="multipart/form-data" className="col-12">
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
        <div className="col-12">
          <SelectField
            id="docType"
            name="docType"
            value={docType}
            floatingLabelText="ประเภทเอกสาร"
            onChange={this.handleChange}
            fullWidth
          >
            {docTypes}
          </SelectField>
        </div>
      </div>
    );
  }
}

FileManager.propTypes = {
  id: PropTypes.string.isRequired,
  loadDocuments: PropTypes.func.isRequired,
  deleteDocument: PropTypes.func.isRequired,
};

export default FileManager;
