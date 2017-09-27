import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { blue300, indigo900 } from 'material-ui/styles/colors';
// import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import Redo from 'material-ui/svg-icons/content/redo';
import Undo from 'material-ui/svg-icons/content/undo';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import {
  Card,
  CardActions,
  // CardHeader,
  // CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';

import PersonalInfo from '../../containers/shared/PersonalInfo';
import WorkingInfo from '../../containers/shared/WorkingInfo';
import CurrentAddress from '../../containers/shared/CurrentAddress';
import RegisterAddress from '../../containers/shared/RegisterAddress';
import ContactInfo from '../../containers/shared/ContactInfo';
import LoanInfo from '../../containers/shared/LoanInfo';
import Reference1Info from '../../containers/shared/Reference1Info';
import Reference2Info from '../../containers/shared/Reference2Info';
import ShippingAddress from '../../containers/shared/ShippingAddress';

const styles = {
  button: {
    margin: 12,
  },
  chip: {
    margin: 2,
  },
};

const infos = [
  {
    id: 1,
    name: 'personal',
    label: 'ข้อมูลทั่วไป',
    icon: 'perm_identity',
    component: <PersonalInfo />,
  },
  {
    id: 2,
    name: 'working',
    label: 'ข้อมูลการทำงาน',
    icon: 'perm_identity',
    component: <WorkingInfo />,
  },
  {
    id: 3,
    name: 'currentAddress',
    label: 'ที่อยู่ปัจจุบัน',
    icon: 'perm_identity',
    component: <CurrentAddress />,
  },
  {
    id: 4,
    name: 'registeredAddress',
    label: 'ที่อยู่ตามทะเบียนบ้าน',
    icon: 'perm_identity',
    component: <RegisterAddress />,
  },
  {
    id: 5,
    name: 'contact',
    label: 'ข้อมูลติดต่อ',
    icon: 'perm_identity',
    component: <ContactInfo />,
  },
  {
    id: 6,
    name: 'loan',
    label: 'ข้อมูลการกู้',
    // icon: 'perm_identity',
    component: <LoanInfo />,
  },
  {
    id: 7,
    name: 'ref1',
    label: 'บุคคลอ้างอิง 1',
    // icon: 'perm_identity',
    component: <Reference1Info />,
  },
  {
    id: 8,
    name: 'ref2',
    label: 'บุคคลอ้างอิง 2',
    // icon: 'perm_identity',
    component: <Reference2Info />,
  },
  {
    id: 9,
    name: 'shipping',
    label: 'ที่อยู่จัดส่งเอกสาร',
    // icon: 'perm_identity',
    component: <ShippingAddress />,
  },
];

class Viewer extends Component {

  state = {
    activeId: 1,
    Component: () => <PersonalInfo />,
    remark: '',
    reject: false,
    doc: false,
  };

  handleChipClick = (id, component) => {
    this.setState({
      activeId: id,
      Component: () => component,
    });
  };

  handleApproveClick = id => {
    const { approve } = this.props;
    if (approve) {
      approve(id);
    }
  };

  handleRejectClick = id => {
    const { reject } = this.props;
    const { remark } = this.state;
    console.log('>>> ', reject, remark);
    if (reject) {
      reject(id, remark, () => {
        this.setState({ reject: false });
      });
    }
  };

  handleChange = e => {
    const { target: { value } } = e;
    this.setState({ remark: value });
  };

  handleCloseDialog = key => {
    this.setState({ [key]: false });
  };

  handleRejectClick = () => {
    this.setState({ reject: true });
  };

  handleCancelClick = () => {
    const { cancel } = this.props;
    if (cancel) {
      cancel();
    }
  };

  handleEditClick = id => {
    const { edit } = this.props;
    if (edit) {
      const { history } = this.props;
      edit(id, () => history.push('/personal-info'));
    }
  };

  handleDocumentClick = () => {
    const { data, loadDocuments } = this.props;
    if (loadDocuments) {
      const { id } = data;
      console.log(id);
      loadDocuments(id, () => this.setState({ doc: true }));
    }
  };

  render() {
    const { data, loading, documents } = this.props;

    console.log('render.documents: ', documents);

    if (!data || loading) {
      return <div className="loader" />;
    }

    const {
      activeId,
      Component,
      remark,
      reject,
      doc,
    } = this.state;
    const { id, status } = data;

    console.log('>>> status: ', status);

    const rejectActions = [
      <FlatButton
        label="ยกเลิก"
        primary
        onClick={() => this.handleCloseDialog('reject')}
      />,
      <FlatButton
        label="ปฏิเสธ"
        primary
        keyboardFocused
        disabled={!remark}
        onClick={() => this.handleRejectClick(id)}
      />,
    ];

    const documentActions = [
      <FlatButton
        label="ยกเลิก"
        primary
        onClick={() => this.handleCloseDialog('doc')}
      />,
      <FlatButton
        label="ปฏิเสธ"
        primary
        keyboardFocused
        disabled={!remark}
        onClick={() => this.handleRejectClick(id)}
      />,
    ];

    return (
      <div>
        <Card>
          <CardTitle
            title="ข้อมูลคำขอกู้"
            subtitle=""
          />
          <CardText>
            <div className="row">
              <div
                className="col-12"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {infos.map(({ id, label, component }) => (
                  <Chip
                    key={id}
                    backgroundColor={(activeId === id) ? blue300 : ''}
                    style={styles.chip}
                    onClick={() => this.handleChipClick(id, component)}
                  >
                    <Avatar
                      size={32}
                      color={(activeId === id) ? blue300 : ''}
                      backgroundColor={(activeId === id) ? indigo900 : ''}
                    >
                      {id}
                    </Avatar>
                    {label}
                  </Chip>
                ))}
              </div>
            </div>
            <Component />
          </CardText>
          <CardActions>
            <div className="row">
              <div
                className="col-12"
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <RaisedButton
                  label="อนุมัติ"
                  primary
                  style={styles.button}
                  icon={<Done />}
                  onClick={() => this.handleApproveClick(id)}
                  disabled={status !== 'created'}
                />
                <RaisedButton
                  label="ปฏิเสธ"
                  secondary
                  style={styles.button}
                  icon={<Clear />}
                  onClick={this.handleRejectClick}
                  disabled={status !== 'created'}
                />
                <RaisedButton
                  label="ส่งกู้รายอื่น"
                  style={styles.button}
                  icon={<Redo />}
                  disabled
                />
                <RaisedButton
                  label="เอกสาร"
                  style={styles.button}
                  icon={<ModeEdit />}
                  onClick={this.handleDocumentClick}
                />
                <RaisedButton
                  label="แก้ไข"
                  style={styles.button}
                  icon={<ModeEdit />}
                  onClick={() => this.handleEditClick(id)}
                  disabled={status !== 'created'}
                />
                <RaisedButton
                  label="ยกเลิก"
                  style={styles.button}
                  icon={<Undo />}
                  onClick={this.handleCancelClick}
                />
              </div>
            </div>
          </CardActions>
        </Card >
        <Dialog
          title="ปฏิเสธคำขอกู้"
          actions={rejectActions}
          modal={false}
          open={reject}
          onRequestClose={() => this.handleCloseDialog('')}
        >
          <div className="row">
            <div className="col-12">
              <TextField
                id="remark"
                name="remark"
                floatingLabelText="เหตุผลสำหรับการปฏิเสธคำขอกู้นี้"
                multiLine
                fullWidth
                rows={3}
                value={remark}
                onChange={() => this.handleChange('reject')}
              />
            </div>
          </div>
        </Dialog>
        <Dialog
          title="เอกสาร"
          actions={documentActions}
          modal={false}
          open={doc}
          onRequestClose={() => this.handleCloseDialog('doc')}
        >
          {documents.map(({ ID, Filename, DocType }) =>
            <div key={ID} className="row">
              <div className="col-4" >{ID}</div>
              <div className="col-4" >{Filename}</div>
              <div className="col-4" >{DocType}</div>
            </div>,
          )}
        </Dialog>
      </div>
    );
  }
}

Viewer.propTypes = {
  history: PropTypes.object.isRequired,
  data: PropTypes.object,
  loading: PropTypes.bool,
  approve: PropTypes.func,
  reject: PropTypes.func,
  edit: PropTypes.func,
  cancel: PropTypes.func,
  loadDocuments: PropTypes.func,
  documents: PropTypes.array,
};

Viewer.defaultProps = {
  data: null,
  loading: false,
  approve: null,
  reject: null,
  edit: null,
  cancel: null,
  loadDocuments: null,
  documents: [],
};

export default withRouter(Viewer);
