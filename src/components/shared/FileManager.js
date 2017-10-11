import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { portalUrl } from '../../libs/request';
import '../../styles/loader.scss';

const url = portalUrl('/admin/leads/doc');
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
        // const boundary = Math.random().toString().substr(2);

        setTimeout(() => {
          $('#file1').fileinput({
            theme: 'explorer-fa',
            uploadUrl: url,
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
            showRemove: true,
            showUpload: false,
            showCancel: false,
            showUploadedThumbs: true,
          });

          $('#file1').on('filepreupload', (event, data) => {
            const { files } = data;
            const { docType } = this.state;

            console.log('docType: ', docType);

            data.form.append('file', files[0]);
            data.form.append('docType', docType);
            data.form.append('leadId', id);
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
};

export default FileManager;
