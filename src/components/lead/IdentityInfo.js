import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import { Lightbox } from 'react-lightbox-component';

const styles = {
  button: {
    margin: 12,
  },
  marginBottom: {
    marginBottom: '20px',
  },
  sectionTitle: {
    backgroundColor: '#019ac9',
  },
  TitleText: {
    color: 'white',
  },
};

// const images = [
//   { src: 'https://unsplash.it/800/300?image=1', title: 'title', content: 'content' },
//   { src: 'https://unsplash.it/300/800?image=2', title: 'title', content: 'content' },
//   { src: 'https://unsplash.it/1800/300?image=3', title: 'title', content: 'content' },
//   { src: 'https://unsplash.it/800/1800?image=4', title: 'title', content: 'content' },
// ];

class IdentityInfo extends Component {

  componentWillMount() {
    window.scrollTo(0, 0);
    const { getDraft } = this.props;
    getDraft();
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState(Object.assign(data, {
      back: false,
      images: [],
    }), () => {
      const { files } = this.state;

      if (files && files.length > 0) {
        const doc = files.find(({ docType }) => docType === 'identity');

        if (doc) {
          const { id } = doc;
          this.getImageUrl(id);
        }
      }
    });
  }

  getImageUrl = id => {
    const { getIdentityUrl } = this.props;

    getIdentityUrl(id, url =>
      this.setState({
        images: [
          {
            src: url,
            title: 'บัตรประชาชน',
            description: 'บัตรประชาชน',
          },
        ],
      }));
  };

  save = callback => {
    const {
      fileName0,
      //
      identity,
      account,
      household_registration,
      payslip,
      statement_1,
      statement_2,
      statement_3,
    } = this.state;

    console.log('identity: ', identity);

    let files = [];
    files.push(identity);
    files.push(account);
    files.push(household_registration);
    files.push(payslip);
    files.push(statement_1);
    files.push(statement_2);
    files.push(statement_3);
    files = files.filter(file => file);

    const { saveDraft, data } = this.props;
    const _data = Object.assign(data, {
      files,
      fileName0,
      //
      identity,
      account,
      household_registration,
      payslip,
      statement_1,
      statement_2,
      statement_3,
    });

    console.log('data: ', _data);

    saveDraft(_data, callback);
  };

  handleChange = (e, required = false, docType = 'identity', fileName = 'fileName0') => {
    const { target: { files, name, value } } = e;

    if (files && files.length > 0) {
      const { uploadFile } = this.props;

      const file = files[0];
      const _fileName = value.split('\\').pop().split('/').pop();
      const formData = new FormData();

      formData.append('filename', _fileName);
      formData.append('file', file);
      formData.append('docType', docType);

      // console.log('file: ', fileName, docType, name, file, uploadFile);

      uploadFile(name, value, _fileName, formData, docType, doc => {
        const { id } = doc;

        this.setState({
          [docType]: doc,
          [fileName]: _fileName,
        });

        this.getImageUrl(id);
      });
    }
  };

  handleDialogClick = () => {
    const { history } = this.props;
    this.setState({ back: false },
      () => history.push('/product-info'));
  };

  handleBackClick = e => {
    e.preventDefault();
    const { history } = this.props;
    this.save(() => history.push('/borrow-request'));
  };

  handleLaterClick = e => {
    e.preventDefault();
    this.save(() => this.setState({ back: true }));
  };

  handleNextClick = e => {
    e.preventDefault();
    const { history } = this.props;
    this.save(() => history.push('/personal-info'));
  };

  render() {
    if (!this.state) {
      return <div className="loader" />;
    }

    const { fileName0, back, images } = this.state;
    const { message, loading } = this.props;

    const actions = [
      <FlatButton
        label="กลับหน้าแรก"
        primary
        keyboardFocused
        onClick={this.handleDialogClick}
      />,
    ];

    return (
      <div>
        <form onSubmit={this.handleNextClick}>
          <Card style={styles.marginBottom}>
            <div style={styles.sectionTitle}>
              <CardHeader
                title="Upload บัตรประชาชน"
                titleStyle={styles.TitleText}
              />
            </div>
            <CardText>
              <div className="row">
                <div
                  className="col-12"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '30px',
                    marginBottom: '50px',
                  }}
                >
                  {loading
                    ? <div className="loader" />
                    : <Lightbox
                      images={images}
                      thumbnailWidth="350px"
                      thumbnailHeight="350px"
                      onClick={e => e.preventDefault()}
                    />
                  }
                </div>
                <div className="col-10">
                  <TextField
                    id="fileName0"
                    name="fileName0"
                    value={fileName0}
                    errorText={!fileName0 ? 'กรุณาเลือกรูปเพื่ออัพโหลด' : ''}
                    fullWidth
                    readOnly
                  />
                </div>
                <div className="col-2">
                  <TextField
                    type="file"
                    id="fileName0"
                    name="fileName0"
                    onChange={e => this.handleChange(e, true, 'identity', 'fileName0')}
                    style={{ width: '105px' }}
                  />
                </div>
              </div>
            </CardText>
          </Card>
          <div className="row">
            <div className="col-12" style={{ textAlign: 'right' }}>
              <RaisedButton
                label="ก่อนหน้า"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                onClick={e => this.handleBackClick(e)}
              />
              <RaisedButton
                label="กู้ภายหลัง"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
                disabled={!fileName0}
                onClick={e => this.handleLaterClick(e)}
              />
              <RaisedButton
                type="submit"
                label="กู้ทันที"
                labelPosition="before"
                primary
                style={styles.button}
                disabled={!fileName0}
                icon={<FontIcon className="muidocs-icon-custom-github" />}
              />
            </div>
          </div>
        </form>
        <Dialog
          title="ขอบคุณสำหรับการลงทะเบียน"
          actions={actions}
          modal={false}
          open={back}
          onRequestClose={this.handleDialogClick}
        >
          <span>รูปบัตรประชาชนของคุณถูกบันทึกลงฐานข้อมูลแล้ว</span><br />
          <span>คุณสามารถกลับเข้ามากรอกข้อมูลการกู้ได้ในภายหลัง</span>
        </Dialog>
        <Snackbar
          open={message !== ''}
          message={message}
          autoHideDuration={4000}
        />
      </div>
    );
  }
}

IdentityInfo.propTypes = {
  message: PropTypes.string,
  loading: PropTypes.bool,
  history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  getDraft: PropTypes.func.isRequired,
  saveDraft: PropTypes.func.isRequired,
  uploadFile: PropTypes.func.isRequired,
  getIdentityUrl: PropTypes.func.isRequired,
};

IdentityInfo.defaultProps = {
  message: '',
  loading: false,
  url: '',
};

export default withRouter(IdentityInfo);
