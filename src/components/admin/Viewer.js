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
    component: <div>Under Construction</div>,
  },
  {
    id: 4,
    name: 'registeredAddress',
    label: 'ที่อยู่ตามทะเบียนบ้าน',
    icon: 'perm_identity',
    component: <div>Under Construction</div>,
  },
  {
    id: 5,
    name: 'contact',
    label: 'ข้อมูลติดต่อ',
    icon: 'perm_identity',
    component: <div>Under Construction</div>,
  },
];

class Viewer extends Component {

  state = {
    activeId: 1,
    Component: () => <PersonalInfo />,
    remark: '',
    reject: false,
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

  handleCloseDialog = () => {
    this.setState({ reject: false });
  };

  handleOpenRejectClick = () => {
    this.setState({ reject: true });
  };

  render() {
    const { data, loading } = this.props;

    if (!data || loading) {
      return <div className="loader" />;
    }

    const {
      activeId,
      Component,
      remark,
      reject,
    } = this.state;
    const { id, status } = data;

    console.log('>>> status: ', status);

    const actions = [
      <FlatButton
        label="ยกเลิก"
        primary
        onClick={this.handleCloseDialog}
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
                  onClick={this.handleOpenRejectClick}
                  disabled={status !== 'created'}
                />
                <RaisedButton
                  label="ส่งกู้รายอื่น"
                  style={styles.button}
                  icon={<Redo />}
                  disabled
                />
              </div>
            </div>
          </CardActions>
        </Card >
        <Dialog
          title="ปฏิเสธคำขอกู้"
          actions={actions}
          modal={false}
          open={reject}
          onRequestClose={this.handleCloseDialog}
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
                onChange={this.handleChange}
              />
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

Viewer.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  approve: PropTypes.func,
  reject: PropTypes.func,
};

Viewer.defaultProps = {
  data: null,
  loading: false,
  approve: null,
  reject: null,
};

export default withRouter(Viewer);
