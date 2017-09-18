import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { blue300, indigo900 } from 'material-ui/styles/colors';
// import FontIcon from 'material-ui/FontIcon';
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
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
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
    component: <WorkingInfo />,
  },
  {
    id: 4,
    name: 'registeredAddress',
    label: 'ที่อยู่ตามทะเบียนบ้าน',
    icon: 'perm_identity',
    component: <WorkingInfo />,
  },
  {
    id: 5,
    name: 'contact',
    label: 'ข้อมูลติดต่อ',
    icon: 'perm_identity',
    component: <WorkingInfo />,
  },
];

class Viewer extends Component {

  state = {
    activeId: 1,
    Component: () => <PersonalInfo />,
  };

  handleChipClick = (id, component) => {
    console.log('>>> component: ', component);
    this.setState({
      activeId: id,
      Component: () => component,
    });
  };

  render() {
    const { activeId, Component } = this.state;
    const { data, loading } = this.props;

    console.log('>>> Viewer.data: ', data);

    if (!data || loading) {
      return <div className="loader" />;
    }

    return (
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
              />
              <RaisedButton
                label="ปฏิเสธ"
                secondary
                style={styles.button}
                icon={<Clear />}
              />
              <RaisedButton
                label="ส่งกู้รายอื่น"
                style={styles.button}
                icon={<Redo />}
              />
            </div>
          </div>
        </CardActions>
      </Card >
    );
  }
}

Viewer.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
};

Viewer.defaultProps = {
  data: null,
  loading: false,
};

export default withRouter(Viewer);
