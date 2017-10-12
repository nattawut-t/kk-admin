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
  <MenuItem key="account" value="account" primaryText="สลิปเงินเดือน (เดือนล่าสุด)" />,
  <MenuItem key="payslip" value="payslip" primaryText="สำเนาหน้าแรกสมุดบัญชีเงินฝากที่ใช้รับเงินเดือน" />,
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
        const config = documents.map(({ ID, Filename, DocType, Size }) => ({
          key: ID,
          caption: `${DocType} - ${Filename}`,
          width: '120px',
          size: Size,
          url: deleteUrl(`/${id}`),
        }));

        $('#file1').fileinput('destroy');

        setTimeout(() => {
          $('#file1').fileinput({
            theme: 'explorer-fa',
            uploadUrl: uploadUrl(),
            overwriteInitial: false,
            initialPreviewAsData: true,
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
