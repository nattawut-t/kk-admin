import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import { blue300, indigo900 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
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
    id: 'personal',
    name: 'ข้อมูลทั่วไป',
    icon: 'perm_identity',
  },
  {
    id: 'working',
    name: 'ข้อมูลการทำงาน',
    icon: 'perm_identity',
  },
  {
    id: 'currentAddress',
    name: 'ที่อยู่ปัจจุบัน',
    icon: 'perm_identity',
  },
  {
    id: 'registeredAddress',
    name: 'ที่อยู่ตามทะเบียนบ้าน',
    icon: 'perm_identity',
  },
  {
    id: 'contact',
    name: 'ข้อมูลติดต่อ',
    icon: 'perm_identity',
  },
];

class Viewer extends Component {

  state = { activeId: 'personal' };

  handleChipClick = id => {
    this.setState({ activeId: id });
  };

  render() {
    const { activeId } = this.state;
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
              {infos.map(({ id, name, icon }) => (
                <Chip
                  key={id}
                  backgroundColor={(activeId === id) ? blue300 : ''}
                  style={styles.chip}
                  onClick={() => this.handleChipClick(id)}
                >
                  <Avatar
                    size={32}
                    color={(activeId === id) ? blue300 : ''}
                    backgroundColor={(activeId === id) ? indigo900 : ''}
                    icon={<FontIcon className="material-icons">{icon}</FontIcon>}
                  />
                  {name}
                </Chip>
              ))}
            </div>
          </div>
          <PersonalInfo />
        </CardText>
        <CardActions
          style={{
            padding: '8px',
            position: 'absolute',
            bottom: '0',
            right: '0',
          }}
        >
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
